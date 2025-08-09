#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🏋️ FitAI Setup Script - GitHub Models');
console.log('=====================================');

const envLocalPath = path.join(__dirname, '.env.local');
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

function parseEnv(content) {
  const map = {};
  if (!content) return map;
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const idx = trimmed.indexOf('=');
    if (idx === -1) return;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    map[key] = value;
  });
  return map;
}

function upsertEnvVar(content, key, value) {
  const hasKey = new RegExp(`^${key}=`, 'm').test(content);
  if (hasKey) {
    return content.replace(new RegExp(`^${key}=.*`, 'm'), `${key}=${value}`);
  }
  const prefix = content.endsWith('\n') ? '' : '\n';
  return `${content}${prefix}${key}=${value}\n`;
}

// 1) Ensure .env.local exists
if (!fs.existsSync(envLocalPath)) {
  console.log('📝 Creating .env.local file...');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envLocalPath);
    console.log('✅ .env.local created from .env.example');
  } else {
    const base = `# GitHub Models Configuration\nGITHUB_TOKEN=\n\n# App Configuration\nNEXT_PUBLIC_APP_URL=http://localhost:3000\nNODE_ENV=development\n`;
    fs.writeFileSync(envLocalPath, base);
    console.log('✅ .env.local created with defaults');
  }
}

// 2) Read tokens from .env and .env.local
const dotEnvContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
const dotEnv = parseEnv(dotEnvContent);
const tokenFromDotEnv = dotEnv.GITHUB_TOKEN;

const dotEnvLocalContent = fs.readFileSync(envLocalPath, 'utf8');
const dotEnvLocal = parseEnv(dotEnvLocalContent);
const tokenFromDotEnvLocal = dotEnvLocal.GITHUB_TOKEN;

// 3) Decide final token preference: .env overrides .env.local
const finalToken = tokenFromDotEnv && tokenFromDotEnv.trim() !== ''
  ? tokenFromDotEnv.trim()
  : (tokenFromDotEnvLocal || '').trim();

// 4) Write back to .env.local
let newEnvLocalContent = dotEnvLocalContent;
if (finalToken) {
  newEnvLocalContent = upsertEnvVar(newEnvLocalContent, 'GITHUB_TOKEN', finalToken);
  if (newEnvLocalContent !== dotEnvLocalContent) {
    fs.writeFileSync(envLocalPath, newEnvLocalContent);
    console.log('✅ Synchronized GITHUB_TOKEN from .env into .env.local');
  } else {
    console.log('ℹ️  GITHUB_TOKEN already up-to-date in .env.local');
  }
  const masked = `${finalToken.substring(0, 10)}...${finalToken.substring(finalToken.length - 4)}`;
  console.log(`🔒 Using token: ${masked}`);
} else {
  console.log('⚠️  No GITHUB_TOKEN found in .env or .env.local');
  console.log('   Add to .env: GITHUB_TOKEN=ghp_your_token_here');
}

console.log('\n🚀 Setup Complete!');
console.log('Run "npm run dev" to start the development server');
console.log('Visit http://localhost:3000');
