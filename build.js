// Re-empaqueta template.html dentro de index.html (bloque __bundler/template).
// Uso: node build.js
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
const templatePath = path.join(__dirname, 'template.html');

const html = fs.readFileSync(indexPath, 'utf8');
const template = fs.readFileSync(templatePath, 'utf8');

const re = /(<script type="__bundler\/template">\s*)([\s\S]*?)(\s*<\/script>)/;
if (!re.test(html)) throw new Error('No se encontró el bloque __bundler/template en index.html');

// Escapa "<" para que ningún </script> o <!-- dentro de la plantilla rompa el bloque
const json = JSON.stringify(template).replace(/</g, '\\u003c');
const out = html.replace(re, (_, a, __, c) => a + json + c);

fs.writeFileSync(indexPath, out);
console.log('index.html actualizado (' + out.length + ' bytes)');
