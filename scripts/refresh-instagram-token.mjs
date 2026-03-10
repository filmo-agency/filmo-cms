#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();
const envPath = path.join(cwd, '.env');

function getEnvToken() {
  const fromProcess = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (fromProcess) return fromProcess;

  if (!fs.existsSync(envPath)) return null;
  const envFile = fs.readFileSync(envPath, 'utf8');
  const line = envFile
    .split(/\r?\n/)
    .find((entry) => entry.startsWith('INSTAGRAM_ACCESS_TOKEN='));

  return line ? line.slice('INSTAGRAM_ACCESS_TOKEN='.length).trim() : null;
}

const token = getEnvToken();

if (!token) {
  console.error('Missing INSTAGRAM_ACCESS_TOKEN (.env or environment variable).');
  process.exit(1);
}

const refreshUrl = new URL('https://graph.instagram.com/refresh_access_token');
refreshUrl.searchParams.set('grant_type', 'ig_refresh_token');
refreshUrl.searchParams.set('access_token', token);

const response = await fetch(refreshUrl, { method: 'GET' });
const body = await response.json();

if (!response.ok || body.error) {
  console.error('Instagram token refresh failed:');
  console.error(JSON.stringify(body, null, 2));
  process.exit(1);
}

const expiresIn = body.expires_in;
const newToken = body.access_token;

console.log('Token refreshed successfully.');
console.log(`expires_in: ${expiresIn} seconds`);
console.log('\nSet this in filmo-cms/.env:');
console.log(`INSTAGRAM_ACCESS_TOKEN=${newToken}`);
