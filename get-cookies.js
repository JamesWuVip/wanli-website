/**
 * 获取掘金登录Cookie
 * 使用方法: node get-cookies.js
 * 
 * 脚本会打开浏览器让你手动登录，登录后自动保存Cookie
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COOKIES_PATH = path.join(__dirname, 'juejin-cookies.json');

async function getCookies() {
  console.log('🚀 启动浏览器...');
  
  const browser = await puppeteer.launch({
    headless: false,  // 显示浏览器窗口
    defaultViewport: { width: 1280, height: 800 }
  });
  
  const page = await browser.newPage();
  
  console.log('📱 打开掘金登录页面...');
  await page.goto('https://juejin.cn/login', { waitUntil: 'networkidle2' });
  
  console.log('\n⏳ 请在浏览器中完成登录...');
  console.log('   登录成功后会自动保存Cookie\n');
  
  // 等待用户登录成功（检测URL变化或特定元素）
  try {
    await page.waitForFunction(
      () => !window.location.href.includes('/login'),
      { timeout: 300000 }  // 5分钟超时
    );
    
    // 等待页面完全加载
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 获取所有Cookie
    const cookies = await page.cookies();
    
    // 保存Cookie
    fs.writeFileSync(COOKIES_PATH, JSON.stringify(cookies, null, 2));
    
    console.log('✅ Cookie已保存到: juejin-cookies.json');
    console.log(`   共 ${cookies.length} 个Cookie\n`);
    
  } catch (error) {
    console.error('❌ 登录超时或出错:', error.message);
  }
  
  await browser.close();
  console.log('🎉 完成！现在可以使用 paste-to-juejin.js 发布文章了');
}

getCookies().catch(console.error);
