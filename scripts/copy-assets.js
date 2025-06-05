// This script copies the assets from the assets folder to the public/assets folder
import { promises as fs } from 'fs';
import path from 'path';

async function copyDir(src, dest) {
  try {
    // Create destination directory if it doesn't exist
    await fs.mkdir(dest, { recursive: true });
    
    // Read source directory
    const entries = await fs.readdir(src, { withFileTypes: true });
    
    // Process each entry
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively copy subdirectories
        await copyDir(srcPath, destPath);
      } else {
        // Copy files
        await fs.copyFile(srcPath, destPath);
        console.log(`Copied: ${srcPath} → ${destPath}`);
      }
    }
  } catch (error) {
    console.error(`Error copying directory ${src} to ${dest}:`, error);
  }
}

async function main() {
  try {
    const assetsDir = path.resolve('assets');
    const publicAssetsDir = path.resolve('public/assets');
    
    console.log('Copying assets to public directory...');
    console.log(`Source: ${assetsDir}`);
    console.log(`Destination: ${publicAssetsDir}`);
    
    await copyDir(assetsDir, publicAssetsDir);
    
    console.log('Asset copying complete!');
  } catch (error) {
    console.error('Failed to copy assets:', error);
    process.exit(1);
  }
}

main();