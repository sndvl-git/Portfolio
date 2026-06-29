const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, 'dist');
const targetDir = repoRoot;

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (!fs.existsSync(distDir)) {
  console.error('dist directory not found. Run the build first.');
  process.exit(1);
}

copyDir(distDir, targetDir);
console.log('Prepared GitHub Pages build output at repository root.');
