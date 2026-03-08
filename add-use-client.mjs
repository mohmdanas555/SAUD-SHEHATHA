import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src/pages');
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('"use client"')) {
      fs.writeFileSync(filePath, '"use client";\n' + content);
    }
  }
}
console.log('Added use client directives.');
