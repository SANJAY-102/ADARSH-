import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const folders = ['achievements', 'BACKGROUND VIDEO AT START', 'Brother', 'EXpressions', 'FATHER', 'FRIENDS', 'ROLE MODEL', 'SEcond LOve', 'first love', 'gallery', 'soothu adi'];

const assets = {};

folders.forEach(folder => {
  const dirPath = path.join(publicDir, folder);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    assets[folder] = files.filter(f => f.match(/\.(png|jpe?g|mp4)$/i)).map(f => `/${folder}/${f}`);
  } else {
    assets[folder] = [];
  }
});

fs.writeFileSync(path.join(__dirname, 'src', 'assets.json'), JSON.stringify(assets, null, 2));
console.log('Assets generated successfully!');
