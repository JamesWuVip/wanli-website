#!/usr/bin/env node
/**
 * 使用Puppeteer自动生成OG图片
 * 包含微信二维码,移除电话号码
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateOGImage() {
  console.log('🎨 启动OG图片生成...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // 设置视口为OG图片标准尺寸
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 2 // 2倍清晰度
    });

    // 加载HTML页面
    const htmlPath = `file://${join(__dirname, 'public-site/generate-og-image.html')}`;
    console.log(`📄 加载页面: ${htmlPath}`);

    await page.goto(htmlPath, {
      waitUntil: 'networkidle0'
    });

    // 等待Canvas绘制完成
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 截图保存
    const outputPath = join(__dirname, 'public-site/og-image.jpg');
    await page.screenshot({
      path: outputPath,
      type: 'jpeg',
      quality: 95,
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 630
      }
    });

    console.log(`✅ OG图片已生成: ${outputPath}`);
    console.log(`📊 尺寸: 1200x630px`);
    console.log(`📦 格式: JPEG (质量: 95%)`);

  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// 执行生成
generateOGImage()
  .then(() => {
    console.log('\n🎉 完成! OG图片已保存到 public-site/og-image.jpg');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 错误:', error);
    process.exit(1);
  });
