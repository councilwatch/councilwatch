// @ts-check

/**
 * react-static-prerender does not preserve nested paths properly so we need to clean it up manually. The
 * actual library is only a single JavaScript file so we could potentially just include it in our repo and
 * then modify it to handle the nested paths properly.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = 'build';
const routes = ['/', '/about', '/resources', '/resources/flock', '/resources/right-to-repair', '/contact'];

/**
 * @param {string} p path to file or directory
 */
async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

for (const route of routes) {
  if (route === '/') continue;

  const rel = route.replace(/^\//, ''); // e.g. resources/flock
  const desiredDir = path.join(outDir, rel); // build/resources/flock
  const hyphenDir = path.join(outDir, rel.replaceAll('/', '-')); // build/resources-flock

  // when the tool already produced nested (e.g. /about), nothing to do
  if (await exists(path.join(desiredDir, 'index.html'))) continue;

  // when the tool produced hyphen-flattened output, move it
  if (await exists(path.join(hyphenDir, 'index.html'))) {
    await fs.mkdir(desiredDir, { recursive: true });
    await fs.rename(path.join(hyphenDir, 'index.html'), path.join(desiredDir, 'index.html'));
    // try to clean up the old directory (ignore errors if not empty)
    try {
      await fs.rmdir(hyphenDir);
    } catch {}
  }
}
