// @ts-check

import { execSync } from 'node:child_process';
import { join } from 'node:path';

const path = process.argv[2];
const name = process.argv[3];

if (!path || !name) {
  console.error('Usage: npm run migrate <path> <name>');
  process.exit(1);
}

const fullPath = join(path, name);

const result = execSync(`typeorm-ts-node-commonjs migration:create ${fullPath}`);

console.log(result.toString());
