// Runs after `react-scripts build`. Renders public/llms.txt to HTML and places it
// inside <div id="root"> in build/index.html, so scrapers and AI fetchers that
// don't run JavaScript still get the full portfolio. React replaces it on load.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const markdown = fs.readFileSync(path.join(root, 'public', 'llms.txt'), 'utf8');
const indexPath = path.join(root, 'build', 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inline markdown used in llms.txt: links and bold
const inline = (text) =>
  escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

const out = [];
let inList = false;
const closeList = () => {
  if (inList) {
    out.push('</ul>');
    inList = false;
  }
};

for (const line of markdown.split('\n')) {
  const heading = line.match(/^(#{1,3}) (.*)/);
  if (heading) {
    closeList();
    const level = heading[1].length;
    out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
  } else if (line.startsWith('- ')) {
    if (!inList) {
      out.push('<ul>');
      inList = true;
    }
    out.push(`<li>${inline(line.slice(2))}</li>`);
  } else if (line.startsWith('> ')) {
    closeList();
    out.push(`<p>${inline(line.slice(2))}</p>`);
  } else if (line.trim()) {
    closeList();
    out.push(`<p>${inline(line)}</p>`);
  } else {
    closeList();
  }
}
closeList();

const placeholder = '<div id="root"></div>';
if (!html.includes(placeholder)) {
  throw new Error(`inject-static-content: ${placeholder} not found in build/index.html`);
}

const staticContent = `<div id="root"><main id="static-content">${out.join('')}</main></div>`;
fs.writeFileSync(indexPath, html.replace(placeholder, staticContent));
console.log('Injected static content from public/llms.txt into build/index.html');
