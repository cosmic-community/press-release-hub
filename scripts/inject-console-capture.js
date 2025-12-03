const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture.js')) {
    console.log(`✓ Script already exists in ${filePath}`);
    return;
  }
  
  if (content.includes('</head>')) {
    content = content.replace('</head>', `  ${scriptTag}\n</head>`);
    fs.writeFileSync(filePath, content);
    console.log(`✓ Injected console capture script into ${filePath}`);
  }
}

const buildDir = path.join(process.cwd(), '.next/server/app');
const htmlFiles = [];

function findHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findHtmlFiles(filePath);
    } else if (file.endsWith('.html')) {
      htmlFiles.push(filePath);
    }
  });
}

findHtmlFiles(buildDir);
htmlFiles.forEach(injectScript);

console.log(`\n✓ Console capture script injection complete (${htmlFiles.length} files processed)`);