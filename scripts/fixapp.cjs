const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'App.jsx');
let text = fs.readFileSync(file, 'utf8');

// Keep the valid top-level import, remove any stray duplicate imports inside JSX
text = text.replace(/(^import '\.\/styles\.css';\n)/m, "import './styles.css';\n");
text = text.replace(/\n\s*import '\.\/styles\.css';\n/g, '\n');
text = text.replace(/\n\s*import "\.\/styles\.css";\n/g, '\n');

fs.writeFileSync(file, text, 'utf8');
console.log('Cleaned App.jsx');
