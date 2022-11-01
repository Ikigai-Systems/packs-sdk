import * as fs from 'fs';
import glob from 'glob';
import path from 'path';
import {print} from '../testing/helpers';

const BaseDir = path.join(__dirname, '..');
const TypeDocsRoot = path.join(BaseDir, 'docs/reference/sdk');
const MarkdownPattern = path.join(TypeDocsRoot, '**/*.md');
// Extracts the name from "# Name", "# Type: Name", and
// "# Type: Name<Template Stuff>".
const TitleRegex = /^# (?:.+?\:\s*)?(.*?)(?:<.+>)?$/m;
const NoteText = [
  'This file is autogenerated from TypeScript definitions.',
  'Make edits to the comments in the TypeScript file and then',
  'run `make docs` to regenerate this file.',
].join(' ');

async function main(): Promise<void> {
  const files = glob.sync(MarkdownPattern, {});
  const promises = [];
  for (const file of files) {
    promises.push(process(file));
  }
  await Promise.all(promises);
}

async function process(file: string) {
  const buf = await fs.promises.readFile(file);
  let content = buf.toString();

  content = addFrontmatter(file, content);

  return fs.promises.writeFile(file, content);
}

/**
 * Adds frontmatter to generated markdown files, setting a simplified title to
 * use in the navigation. The frontmatter nav title is used in the nav.
 */
function addFrontmatter(file: string, content: string): string {
  if (content.startsWith('---\n')) {
    print(`Already has frontmatter: ${file}`);
    return content;
  }
  const match = content.match(TitleRegex);
  if (!match) {
    print(`Title not found: ${file}`);
    return content;
  }
  const title = match![1];
  const frontmatter = [
    '---',
    `nav: "${title}"`,
    `note: "${NoteText}"`,
    `search:`,
    `  boost: 0.1`,
    '---',
  ].join('\n');

  return [frontmatter, content].join('\n');
}

main().catch(print);
