#!/usr/bin/env node
/**
 * 图片优化脚本 - 转换为 WebP 格式
 * 支持 PNG, JPG, JPEG 转换
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const CONFIG = {
  inputDir: './public-site',
  quality: 85,
  extensions: ['.png', '.jpg', '.jpeg']
};

async function optimizeImage(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  const fileName = basename(inputPath, ext);
  const outputPath = join(CONFIG.inputDir, `${fileName}.webp`);

  try {
    const info = await sharp(inputPath)
      .webp({ quality: CONFIG.quality })
      .toFile(outputPath);

    const originalSize = (await stat(inputPath)).size;
    const optimizedSize = info.size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    console.log(`✓ ${basename(inputPath)}`);
    console.log(`  → ${basename(outputPath)}`);
    console.log(`  原始: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`  优化: ${(optimizedSize / 1024).toFixed(2)} KB`);
    console.log(`  节省: ${savings}%\n`);

    return { original: originalSize, optimized: optimizedSize };
  } catch (error) {
    console.error(`✗ 处理失败 ${basename(inputPath)}:`, error.message);
    return null;
  }
}

async function optimizeAllImages() {
  console.log('🎨 开始图片优化...\n');

  const files = await readdir(CONFIG.inputDir);
  const imageFiles = files.filter(file => 
    CONFIG.extensions.includes(extname(file).toLowerCase())
  );

  if (imageFiles.length === 0) {
    console.log('⚠️  未找到需要优化的图片文件');
    return;
  }

  console.log(`📁 发现 ${imageFiles.length} 个图片文件\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let successCount = 0;

  for (const file of imageFiles) {
    const filePath = join(CONFIG.inputDir, file);
    const result = await optimizeImage(filePath);
    
    if (result) {
      totalOriginal += result.original;
      totalOptimized += result.optimized;
      successCount++;
    }
  }

  if (successCount > 0) {
    const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
    
    console.log('═'.repeat(50));
    console.log('📊 优化统计:');
    console.log(`  成功处理: ${successCount}/${imageFiles.length} 个文件`);
    console.log(`  原始总大小: ${(totalOriginal / 1024).toFixed(2)} KB`);
    console.log(`  优化后大小: ${(totalOptimized / 1024).toFixed(2)} KB`);
    console.log(`  总节省: ${totalSavings}%`);
    console.log('═'.repeat(50));
  }

  console.log('\n✅ 图片优化完成!');
  console.log('\n💡 下一步:');
  console.log('  1. 在 HTML 中使用 <picture> 标签支持 WebP');
  console.log('  2. 保留原图作为降级方案');
  console.log('  3. 测试不同浏览器的兼容性\n');
}

// 执行优化
optimizeAllImages()
  .catch(error => {
    console.error('\n❌ 错误:', error);
    process.exit(1);
  });
