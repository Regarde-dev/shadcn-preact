const fs = require('node:fs');
const path = require('node:path');

const REGISTRY_URL = 'https://shadcn-preact.regarde.dev';
const PUBLIC_DIR = path.join(__dirname, '../apps/v4/public');

// Get all JSON files
const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const filePath = path.join(PUBLIC_DIR, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (content.registryDependencies && Array.isArray(content.registryDependencies)) {
    // Convert each dependency to full URL
    content.registryDependencies = content.registryDependencies.map(dep => {
      // If already a URL, keep it
      if (dep.startsWith('http://') || dep.startsWith('https://')) {
        return dep;
      }
      // Otherwise, convert to full URL
      return `${REGISTRY_URL}/${dep}.json`;
    });
    
    // Write back
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
    console.log(`✓ Updated ${file}`);
  }
});

console.log('\n✅ All registry dependencies updated to full URLs!');

