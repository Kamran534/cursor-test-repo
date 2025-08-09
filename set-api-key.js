#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log('🔑 FitAI GitHub Token Setup');
console.log('============================');

const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found. Please run "npm run setup" first.');
  process.exit(1);
}

async function setApiKey() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    console.log('\n📝 GitHub Models Setup:');
    console.log('🆓 FREE access to OpenAI GPT-4o via GitHub Models');
    console.log('🔗 Get your token from: https://github.com/settings/tokens');
    console.log('💡 Should start with "ghp_" or "github_pat_"');
    console.log('⚙️  Required scope: "Public Repositories" (minimum)');
    console.log('');
    
    rl.question('Enter your GitHub token: ', (apiKey) => {
      rl.close();
      
      if (!apiKey.trim()) {
        console.log('❌ No API key provided. Exiting.');
        resolve(false);
        return;
      }
      
      const isValidGitHub = apiKey.startsWith('github_pat_') || apiKey.startsWith('ghp_');
      
      if (!isValidGitHub) {
        console.log('⚠️  Warning: GitHub token format not recognized');
        console.log('Expected: ghp_... or github_pat_...');
        console.log('Proceeding anyway...');
      }
      
      // Read current .env.local content
      const envContent = fs.readFileSync(envPath, 'utf8');
      
      // Add/update GitHub token
      let updatedContent = envContent;
      
      if (updatedContent.includes('GITHUB_TOKEN=')) {
        updatedContent = updatedContent.replace(
          /GITHUB_TOKEN=.*/,
          `GITHUB_TOKEN=${apiKey.trim()}`
        );
      } else {
        updatedContent = `# GitHub Models Configuration\nGITHUB_TOKEN=${apiKey.trim()}\n\n` + updatedContent;
      }
      
      // Write back to file
      fs.writeFileSync(envPath, updatedContent);
      
      console.log('✅ GitHub token has been saved successfully!');
      console.log(`   Token: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}`);
      console.log('\n🚀 You can now use the AI chat feature!');
      console.log('🆓 Using GitHub Models for FREE access to OpenAI GPT-4o');
      console.log('   Restart your dev server: npm run dev');
      console.log('   Visit: http://localhost:3000/chat');
      
      resolve(true);
    });
  });
}

setApiKey().catch(console.error);
