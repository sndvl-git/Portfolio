const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'App.jsx');
let text = fs.readFileSync(file, 'utf8');

text = text.replace(
  /\n\s*import ['"]\.\/styles\.css['"];\s*\n(?=\s*<div id="preloader")/,
  '\n'
);

fs.writeFileSync(file, text, 'utf8');
console.log('Removed stray JSX import line');
