const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.jsx');
const appPath = path.join(root, 'App.jsx');
const stylesPath = path.join(root, 'styles.css');

const text = fs.readFileSync(indexPath, 'utf8');
const styleRegex = /<style>\{`([\s\S]*?)`\}<\/style>/;
const match = text.match(styleRegex);

if (!match) {
  throw new Error('Could not find the CSS block in index.jsx');
}

const css = match[1];
fs.writeFileSync(stylesPath, css, 'utf8');

const updated = text.replace(styleRegex, "import './styles.css';\n\n");
fs.writeFileSync(appPath, updated, 'utf8');
fs.writeFileSync(indexPath, "import App from './App.jsx';\nexport default App;\n", 'utf8');

console.log('Created App.jsx and styles.css');
