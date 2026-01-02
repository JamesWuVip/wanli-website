/**
 * 博客封面图生成脚本
 * 使用方法: node generate-cover.js [article-key]
 * 
 * article-key 可选值: rag, microservices, prompt, cost, gpt4
 * 不传参数则生成所有封面
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COVER_DIR = path.join(__dirname, 'public-site/blog/covers');
const GENERATOR_PATH = path.join(__dirname, 'public-site/blog/cover-generator.html');

const ARTICLES = ['rag', 'microservices', 'prompt', 'cost', 'gpt4'];

async function generateCover(articleKey) {
  console.log(`🎨 生成封面: ${articleKey}...`);
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1000, height: 600 }
  });
  
  const page = await browser.newPage();
  
  // 打开封面生成器
  await page.goto(`file://${GENERATOR_PATH}`, { waitUntil: 'networkidle2' });
  
  // 选择文章
  await page.select('#articleSelect', articleKey);
  
  // 等待渲染
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 获取 canvas 数据
  const dataUrl = await page.evaluate(() => {
    const canvas = document.getElementById('canvas');
    return canvas.toDataURL('image/jpeg', 0.95);
  });
  
  // 保存图片
  const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
  const outputPath = path.join(COVER_DIR, `${articleKey}-cover.jpg`);
  
  fs.writeFileSync(outputPath, base64Data, 'base64');
  console.log(`✅ 已保存: ${outputPath}`);
  
  await browser.close();
  return outputPath;
}

async function main() {
  // 确保目录存在
  if (!fs.existsSync(COVER_DIR)) {
    fs.mkdirSync(COVER_DIR, { recursive: true });
  }
  
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // 生成指定封面
    const key = args[0];
    if (ARTICLES.includes(key)) {
      await generateCover(key);
    } else {
      console.error(`❌ 未知文章: ${key}`);
      console.log(`可选值: ${ARTICLES.join(', ')}`);
    }
  } else {
    // 生成所有封面
    console.log('🚀 生成所有博客封面...\n');
    for (const key of ARTICLES) {
      await generateCover(key);
    }
    console.log('\n🎉 所有封面生成完成！');
  }
}

main().catch(console.error);
