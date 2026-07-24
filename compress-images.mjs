/**
 * compress-images.mjs
 * Converts PNG hero images to WebP and optimizes logo PNG
 * Run: node compress-images.mjs
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function compress() {
  const jobs = [
    // Hero images → WebP (major LCP improvement)
    {
      input: 'src/assets/hero-man.png',
      output: 'src/assets/hero-man.webp',
      options: { quality: 82 },
      format: 'webp',
    },
    {
      input: 'src/assets/hero-woman.png',
      output: 'src/assets/hero-woman.webp',
      options: { quality: 82 },
      format: 'webp',
    },
    // Logo → WebP
    {
      input: 'public/logo.png',
      output: 'public/logo.webp',
      options: { quality: 90, lossless: false },
      format: 'webp',
    },
    // Favicon → optimized PNG (keep PNG for favicon compatibility)
    {
      input: 'public/favicon.png',
      output: 'public/favicon-opt.png',
      options: { compressionLevel: 9 },
      format: 'png',
    },
  ];

  console.log('\n🔧 Compressing images...\n');

  for (const job of jobs) {
    const inputPath  = path.join(__dirname, job.input);
    const outputPath = path.join(__dirname, job.output);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${job.input} — file not found`);
      continue;
    }

    const beforeSize = fs.statSync(inputPath).size;
    const img = sharp(inputPath);

    if (job.format === 'webp') {
      await img.webp(job.options).toFile(outputPath);
    } else if (job.format === 'png') {
      await img.png(job.options).toFile(outputPath);
    }

    const afterSize = fs.statSync(outputPath).size;
    const saving = Math.round((1 - afterSize / beforeSize) * 100);

    console.log(`✅  ${job.input}`);
    console.log(`    ${Math.round(beforeSize/1024)}KB → ${Math.round(afterSize/1024)}KB  (${saving}% smaller)\n`);
  }

  console.log('✨ Done! Update Hero.jsx imports to use .webp files.\n');
}

compress().catch(console.error);
