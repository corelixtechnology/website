/**
 * compress-logos.mjs — converts the Navbar & Preloader logos to WebP
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function compress() {
  const jobs = [
    {
      input:  'src/assets/Corelix Technology - Logo.png',
      output: 'src/assets/corelix-logo-navbar.webp',
    },
    {
      input:  'src/assets/Corelix Technology - Logo 1.png',
      output: 'src/assets/corelix-logo-footer.webp',
    },
    {
      input:  'src/assets/founder.png',
      output: 'src/assets/founder.webp',
    },
  ];

  console.log('\n🔧 Compressing logos...\n');

  for (const job of jobs) {
    const inputPath  = path.join(__dirname, job.input);
    const outputPath = path.join(__dirname, job.output);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${job.input} — not found`);
      continue;
    }

    const beforeSize = fs.statSync(inputPath).size;
    await sharp(inputPath).webp({ quality: 88, lossless: false }).toFile(outputPath);
    const afterSize = fs.statSync(outputPath).size;
    const saving = Math.round((1 - afterSize / beforeSize) * 100);

    console.log(`✅  ${path.basename(job.input)}`);
    console.log(`    ${Math.round(beforeSize/1024)}KB → ${Math.round(afterSize/1024)}KB  (${saving}% smaller)\n`);
  }

  console.log('✨ Done!\n');
}

compress().catch(console.error);
