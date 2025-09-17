import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const excludeDirs = ['node_modules', '.git', '.next'];

const compressionSettings = {
  '.jpg': { quality: 80, progressive: true },
  '.jpeg': { quality: 80, progressive: true },
  '.png': { compressionLevel: 8, progressive: true },
  '.webp': { quality: 85 }
};

const maxSizes = {
  'banners': { width: 1200, height: 600 },
  'covers': { width: 800, height: 400 },
  'services': { width: 600, height: 400 },
  'vendors': { width: 400, height: 300 },
  'products': { width: 400, height: 400 },
  'transformations': { width: 500, height: 400 },
  'portraits': { width: 300, height: 400 },
  'backgrounds': { width: 1920, height: 1080 }
};

function getMaxSize(filePath) {
  for (const [folder, size] of Object.entries(maxSizes)) {
    if (filePath.includes(folder)) {
      return size;
    }
  }
  return { width: 800, height: 600 };
}

async function optimizeImage(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const maxSize = getMaxSize(inputPath);
    const tempPath = inputPath + '.temp';

    let pipeline = sharp(inputPath)
      .resize(maxSize.width, maxSize.height, {
        fit: 'inside',
        withoutEnlargement: true
      });

    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg(compressionSettings[ext]);
    } else if (ext === '.png') {
      pipeline = pipeline.png(compressionSettings[ext]);
    }

    await pipeline.toFile(tempPath);

    const originalStats = fs.statSync(inputPath);
    const optimizedStats = fs.statSync(tempPath);
    const reduction = ((originalStats.size - optimizedStats.size) / originalStats.size * 100).toFixed(1);

    // Replace original with optimized version
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, inputPath);

    console.log(`✓ ${path.relative(publicDir, inputPath)}: ${(originalStats.size/1024/1024).toFixed(2)}MB → ${(optimizedStats.size/1024/1024).toFixed(2)}MB (-${reduction}%)`);

    return {
      original: originalStats.size,
      optimized: optimizedStats.size,
      reduction: parseFloat(reduction)
    };
  } catch (error) {
    console.error(`✗ Failed to optimize ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  const results = [];

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !excludeDirs.some(excluded => file.includes(excluded))) {
      const subResults = await processDirectory(fullPath);
      results.push(...subResults);
    } else if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
      const backupPath = fullPath + '.backup';

      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(fullPath, backupPath);
      }

      const result = await optimizeImage(fullPath);
      if (result) {
        results.push(result);
      }
    }
  }

  return results;
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  const startTime = Date.now();
  const results = await processDirectory(publicDir);
  const endTime = Date.now();

  const totalOriginal = results.reduce((sum, r) => sum + r.original, 0);
  const totalOptimized = results.reduce((sum, r) => sum + r.optimized, 0);
  const totalReduction = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);

  console.log('\n📊 Optimization Summary:');
  console.log(`Files processed: ${results.length}`);
  console.log(`Total size reduction: ${(totalOriginal/1024/1024).toFixed(2)}MB → ${(totalOptimized/1024/1024).toFixed(2)}MB (-${totalReduction}%)`);
  console.log(`Time taken: ${((endTime - startTime) / 1000).toFixed(1)}s`);
  console.log('\n✅ Image optimization complete!');
}

main().catch(console.error);