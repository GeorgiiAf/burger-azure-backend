import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function setupRoutes(app) {
  const routeFolders = fs.readdirSync(__dirname, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const folder of routeFolders) {
    const routePath = `/${folder}`;
    const folderPath = path.join(__dirname, folder);
    
    try {
      const routeFiles = fs.readdirSync(folderPath)
        .filter(file => file.endsWith('.js') && !file.startsWith('_'));
      
      for (const file of routeFiles) {
        try {
          const modulePath = `./${folder}/${file}`;
          const { default: setupRoute } = await import(modulePath);
          
          if (typeof setupRoute === 'function') {
            setupRoute(app, routePath);
            console.log(`Registered routes from ${modulePath} for path ${routePath}`);
          }
        } catch (err) {
          console.error(`Failed to load route file ${file} in ${folder}:`, err);
        }
      }
    } catch (err) {
      console.error(`Failed to process route folder ${folder}:`, err);
    }
  }
}