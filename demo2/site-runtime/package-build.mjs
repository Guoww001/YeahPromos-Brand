import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const clientDist = resolve(root, 'dist', 'client');
const serverDist = resolve(root, 'dist', 'server');

if (!existsSync(clientDist)) {
  throw new Error('Expected Vite output at demo2/dist/client before packaging.');
}

mkdirSync(serverDist, { recursive: true });
cpSync(resolve(root, 'site-runtime', 'index.mjs'), resolve(serverDist, 'index.js'));
cpSync(resolve(root, '.openai'), resolve(serverDist, '.openai'), { recursive: true });

console.log(`Packaged ${clientDist} with Worker runtime into ${serverDist}`);
