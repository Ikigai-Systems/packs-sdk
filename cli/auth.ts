import type {Arguments} from 'yargs';
import {build} from './build';
import {importManifest} from './helpers';
import {makeManifestFullPath} from './helpers';
import {setupAuthFromModule} from '../testing/auth';

interface AuthArgs {
  manifestPath: string;
  oauthServerPort?: number;
}

export async function handleAuth({manifestPath, oauthServerPort}: Arguments<AuthArgs>) {
  const fullManifestPath = makeManifestFullPath(manifestPath);
  const bundleFilename = await build(fullManifestPath);
  const manifest = await importManifest(bundleFilename);
  await setupAuthFromModule(fullManifestPath, manifest, {oauthServerPort});
}
