const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '..', 'docs-build');
const oldIndex = path.join(buildDir, 'docs', 'index.html');
const newIndex = path.join(buildDir, 'index.html');

if (!fs.existsSync(oldIndex)) {
  console.error(`Expected built index not found: ${oldIndex}`);
  process.exit(1);
}

fs.mkdirSync(buildDir, { recursive: true });
let html = fs.readFileSync(oldIndex, 'utf8');
html = html.replace(/\.\.\/assets\//g, './assets/');
fs.writeFileSync(newIndex, html, 'utf8');
fs.rmSync(path.join(buildDir, 'docs'), { recursive: true, force: true });
console.log('Moved built docs index to root:', newIndex);
