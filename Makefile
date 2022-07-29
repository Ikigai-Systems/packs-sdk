MAKEFLAGS = -s ${MAX_PARALLEL_MAKEFLAG}
SHELL = /bin/bash
ROOTDIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

### YARN
# CircleCI yarn cache directory may also need to be updated in sync with this
YARN_CACHE_DIR=~/.yarncache

ISOLATED_VM_VERSION_COMMAND="require('./node_modules/isolated-vm/package.json').version"
ISOLATED_VM_VERSION=$(shell node -p -e $(ISOLATED_VM_VERSION_COMMAND))

PIPENV := PYTHONPATH=${ROOTDIR} PIPENV_IGNORE_VIRTUALENVS=1 pipenv

DOC_GIT_REVISION ?= main


# Aliases
bs: bootstrap

###############################################################################
# Bootstrapping - get the local machine ready

.PHONY: _bootstrap-node
_bootstrap-node:
	mkdir -p ${YARN_CACHE_DIR}
	yarn config set cache-folder ${YARN_CACHE_DIR}
	yarn install
	# Install a symlink of the working directory as @codahq/packs-sdk, so that the sample code compiles.
	yarn unlink || true # Remove any existing links providing @codahq/packs-sdk
	yarn link  # Provide @codahq/packs-sdk from this directory
	yarn link "@codahq/packs-sdk"  # Consume the link whenever @codahq/packs-sdk is imported

.PHONY: _bootstrap-python
_bootstrap-python:
	${PIPENV} sync

.PHONY: _bootstrap-python-requirements
_bootstrap-python-requirements:
	# Ensure requirements.txt (used by Read the Docs) is in sync.
	# Keep this separate from _bootstrap-python since the output changes based
	# on the version of pipenv installed.
	echo "# Autogenerated by 'make bs'" > requirements.txt
	${PIPENV} requirements >> requirements.txt

.PHONY: _bootstrap-githooks
_bootstrap-githooks: clean-githooks
	-(cd ${ROOTDIR}; scripts/dev/git-hooks.sh --install)

.PHONY: bootstrap
bootstrap:
	$(MAKE) MAKEFLAGS= _bootstrap-node
	$(MAKE) MAKEFLAGS= _bootstrap-python
	$(MAKE) MAKEFLAGS= _bootstrap-python-requirements
	$(MAKE) MAKEFLAGS= _bootstrap-githooks
	echo
	echo '  make bootstrap complete!'
	echo

###############################################################################
# Lint / tests

.PHONY: lint
lint:
	find . -name "*.ts" | grep -v /dist/ | grep -v /node_modules/ | grep -v .d.ts | xargs ${ROOTDIR}/node_modules/.bin/eslint

	# Markdown lint.
	npx remark docs --quiet --frail --ignore-pattern 'docs/reference/*'

.PHONY: lint-fix
lint-fix:
	find . -name "*.ts" | grep -v /dist/ | grep -v /node_modules/ | grep -v .d.ts | xargs ${ROOTDIR}/node_modules/.bin/eslint --fix

.PHONY: do-compile-isolated-vm
do-compile-isolated-vm:
	rm -rf build-isolated-vm

	mkdir build-isolated-vm && \
		cd build-isolated-vm && \
		npm init -y && \
		docker run --rm -v `pwd`:/var/task amazon/aws-sam-cli-build-image-nodejs14.x:latest npm install isolated-vm@${ISOLATED_VM_VERSION}
	cp build-isolated-vm/node_modules/isolated-vm/package.json runtime/isolated-vm/
	cp build-isolated-vm/node_modules/isolated-vm/isolated-vm.js runtime/isolated-vm/
	cp build-isolated-vm/node_modules/isolated-vm/out/isolated_vm.node runtime/isolated-vm/out/

	rm -rf build-isolated-vm

.PHONY: compile-isolated-vm
compile-isolated-vm:
	if [ `node -p -e "require('./runtime/isolated-vm/package.json').version"` != $(ISOLATED_VM_VERSION) ]; \
		then $(MAKE) do-compile-isolated-vm; \
		else echo "isolated-vm version matches, skipping."; \
	fi

.PHONY: compile-thunk
compile-thunk:
	# this bundle is loaded into ivm, better to use iife to avoid local symbols leak to global.
	${ROOTDIR}/node_modules/.bin/esbuild ${ROOTDIR}/runtime/thunk/thunk.ts \
		--bundle \
		--outfile=${ROOTDIR}/bundles/thunk_bundle.js \
		--inject:${ROOTDIR}/testing/injections/buffer_shim.js \
		--format=iife \
		--define:process.env.IN_ISOLATED_VM_OR_BROWSER=true \
		--global-name=module.exports \
		--target=es2020;

.PHONY: compile-ts
compile-ts:	
	${ROOTDIR}/node_modules/.bin/tsc

	$(MAKE) compile-thunk
	$(MAKE) compile-documentation-scripts

	# copy it to dist/ to make it available after packaging.
	mkdir -p ${ROOTDIR}/dist/bundles/ && cp ${ROOTDIR}/bundles/thunk_bundle.js ${ROOTDIR}/dist/bundles/thunk_bundle.js

	# copy buffer.d.ts to be used by monaco browser.
	cp ${ROOTDIR}/node_modules/buffer/index.d.ts ${ROOTDIR}/dist/buffer.d.ts

	# This bundle is used by the Pack studio to compile the pack bundle in the browser. It will be loaded in both 
	# browser and isolated-vm. In the browser, the pack bundle is loaded in an iframe to extract pack metadata.
	# In lambda, the pack bundle actually runs formulas.
	#
	# isolated-vm environment is approximately es2020. It's known that es2021 will break because of Logical assignment
	${ROOTDIR}/node_modules/.bin/esbuild ${ROOTDIR}/index.ts \
		--bundle \
		--outfile=${ROOTDIR}/dist/bundle.js \
		--format=cjs \
		--define:process.env.IN_ISOLATED_VM_OR_BROWSER=true \
		--minify \
		--target=es2020;

.PHONY: compile
compile:
	$(MAKE) compile-ts

	# Generate a typescript file for use in /experimental so the web editor
	# can resolve packs-sdk imports
	${ROOTDIR}/node_modules/.bin/dts-bundle-generator ${ROOTDIR}/index.ts \
  	-o ${ROOTDIR}/dist/bundle.d.ts \
		--no-banner
	# Generate isolated-vm binaries that's compatible to Amazon Linux 2.
	$(MAKE) compile-isolated-vm
	# copy these esm format js files to dist directly.
	cp -r ${ROOTDIR}/testing/injections ${ROOTDIR}/dist/testing/

.PHONY: compile-documentation-scripts
compile-documentation-scripts:
	${ROOTDIR}/node_modules/.bin/tsc --project tsconfig.scripts.json

.PHONY: compile-samples
compile-samples:
	${ROOTDIR}/node_modules/.bin/tsc --project tsconfig.samples.json

.PHONY: generated-documentation
generated-documentation: compile-samples
	node -r ts-node/register documentation/scripts/documentation_compiler.ts

.PHONY: typedoc
typedoc:
	if [ -z "${shell git config --get remote.origin.url | grep coda/packs-sdk}" ]; then \
		echo "Please config your git origin to git@github.com:coda/packs-sdk.git"; \
		exit 1; \
	fi
	# Most options loaded from typedoc.js.
	# If you changes this, also update the similar command in typedoc_coverage_test.ts.
	${ROOTDIR}/node_modules/.bin/typedoc index.ts development.ts --options typedoc.js --gitRevision "${DOC_GIT_REVISION}" --out ${ROOTDIR}/docs/reference/sdk
	node -r ts-node/register documentation/typedoc_post_process.ts

.PHONY: docs
docs: typedoc generated-documentation build-mkdocs

.PHONY: view-docs
view-docs:
	if command -v expect &> /dev/null; then \
		PYTHONPATH=${ROOTDIR} PIPENV_IGNORE_VIRTUALENVS=1 MK_DOCS_SITE_URL=http://localhost:8000/packs-sdk expect -c 'set timeout 60; spawn pipenv run mkdocs serve; expect "Serving on"; exec open "http://localhost:8000"; interact'; \
	else \
		PYTHONPATH=${ROOTDIR} PIPENV_IGNORE_VIRTUALENVS=1 MK_DOCS_SITE_URL=http://localhost:8000/packs-sdk pipenv run mkdocs serve; \
	fi

###############################################################################
### Deployment of documentation ###

# This step generates all the documentation for the SDK using mkdocs and dumps the contents in /site
.PHONY: build-mkdocs
build-mkdocs:
	${PIPENV} run mkdocs build --strict

# This step uploads the documentation for the current package version.
# TODO(spencer): probably need some user handling to make sure there is an update in package.json if the documentation has been updated.
# TODO(spencer): add post-push verify step to probe that it is acutally serving for the different environments?
# These steps assume that the docs have been built

# pass in `FLAGS` to control optional arguments into the documentation push script
# For example, if you wanted to force upload (to skip the existing directory check), you can run
# make publish-docs-<env> FLAGS=--forceUpload
.PHONY: publish-docs-adhoc
publish-docs-adhoc:
	(cd ${ROOTDIR}; ./node_modules/.bin/ts-node documentation/scripts/documentation_publisher.ts push adhoc ${FLAGS})

.PHONY: publish-docs-head
publish-docs-head:
	(cd ${ROOTDIR}; ./node_modules/.bin/ts-node documentation/scripts/documentation_publisher.ts push head ${FLAGS})

.PHONY: publish-docs-staging
publish-docs-staging:
	(cd ${ROOTDIR}; ./node_modules/.bin/ts-node documentation/scripts/documentation_publisher.ts push staging ${FLAGS})

.PHONY: publish-docs-prod
publish-docs-prod:
	(cd ${ROOTDIR}; ./node_modules/.bin/ts-node documentation/scripts/documentation_publisher.ts push prod ${FLAGS})

.PHONY: publish-docs-gh-pages
publish-docs-gh-pages:
	if [ -z ${shell git status -uno | grep "Your branch is up to date with 'origin/main'"} ]; then \
		echo "The documentation can only be published from main at head."; \
		exit 1; \
	fi
	# Build the docs and push them to the gh-pages branch.
	# See: https://www.mkdocs.org/user-guide/deploying-your-docs/#github-pages
	# Including the tag "[ci skip]" in the commit message to prevent CircleCI from building the branch.
	MK_DOCS_SITE_URL=https://coda.github.io/packs-sdk/ ${PIPENV} run mkdocs gh-deploy --message "Deployed {sha} with MkDocs version: {version} [ci skip]"

###############################################################################

.PHONY: test
test:
	TS_NODE_TRANSPILE_ONLY=1 ${ROOTDIR}/node_modules/.bin/mocha test/*_test.ts

.PHONY: test-file
test-file:
	TS_NODE_TRANSPILE_ONLY=1 ${ROOTDIR}/node_modules/.bin/mocha ${FILE}

.PHONY: clean-githooks
clean-githooks:
	-rm -rf ${ROOTDIR}/.git/hooks/* ${ROOTDIR}/.git/hooks.old

.PHONY: clean
clean:
	rm -rf ${ROOTDIR}/dist

.PHONY: build
build: clean lint compile docs

# allow debugging packs sdk with local packs repo.
.PHONY: publish-local
publish-local: build
	cp -r dist/* ../packs/node_modules/@codahq/packs-sdk/dist/

.PHONY: validate-no-changes
validate-no-changes: clean compile docs
	$(eval UNTRACKED_FILES := $(shell git status --short))
	$(eval CHANGED_FILES := $(shell git diff --name-only))
	if [[ -n "${UNTRACKED_FILES}" || -n "${CHANGED_FILES}" ]]; then \
		echo "directory is not clean. run 'make build' and commit all files untracked: ${UNTRACKED_FILES} changed: ${CHANGED_FILES}"; \
		exit 1; \
	fi

.PHONY: release
release:
	# this set is taken from esbuild's process https://github.com/evanw/esbuild/blob/master/Makefile#L330
	@npm --version > /dev/null || (echo "The 'npm' command must be in your path to publish" && false)
	@echo "Checking for uncommitted/untracked changes..." && test -z "`git status --porcelain | grep -vE ''`" || \
		(echo "Refusing to publish with these uncommitted/untracked changes:" && \
		git status --porcelain | grep -vE '' && false)
	@echo "Checking for main branch..." && test main = "`git rev-parse --abbrev-ref HEAD`" || \
		(echo "Refusing to publish from non-main branch `git rev-parse --abbrev-ref HEAD`" && false)
	@echo "Checking for unpushed commits..." && git fetch
	@test "" = "`git cherry`" || (echo "Refusing to publish with unpushed commits" && false)

	npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN
	npx release-it --npm.tag=latest --ci ${FLAGS}

.PHONY: release-manual
release-manual:
	# this set is taken from esbuild's process https://github.com/evanw/esbuild/blob/master/Makefile#L330
	@npm --version > /dev/null || (echo "The 'npm' command must be in your path to-*///// publish" && false)
	@echo "Checking for uncommitted/untracked changes..." && test -z "`git status --porcelain | grep -vE ''`" || \
		(echo "Refusing to publish with these uncommitted/untracked changes:" && \
		git status --porcelain | grep -vE '' && false)
	@echo "Checking for unpushed commits..." && git fetch
	@test "" = "`git cherry`" || (echo "Refusing to publish with unpushed commits" && false)

	npx release-it --npm.tag=latest
