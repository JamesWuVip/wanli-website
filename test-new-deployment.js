const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  console.log('🚀 测试最新部署...');
  
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-cache']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  // 清除所有缓存
  await page.setCacheEnabled(false);
  
  // 监听控制台
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('[Form]') || text.includes('[API]') || text.includes('WeChat') || text.includes('提交')) {
      console.log('📝', text);
    }
  });
  
  // 监听网络
  page.on('request', request => {
    const url = request.url();
    if (url.includes('/api/consultation') || url.includes('qyapi.weixin.qq.com')) {
      console.log('🌐 请求:', request.method(), url);
    }
  });
  
  page.on('response', async response => {
    const url = response.url();
    if (url.includes('/api/consultation') || url.includes('qyapi.weixin.qq.com')) {
      console.log('✅ 响应:', response.status(), url);
      try {
        const text = await response.text();
        console.log('📦 内容:', text);
      } catch {}
    }
  });
  
  const url = 'https://zhili-tech-website-iaejgi9tq-wanli-academy.vercel.app/zh-CN';
  console.log('🌍 访问最新部署:', url);
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 60000
  });
  
  await sleep(3000);
  
  await page.evaluate(() => {
    document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' });
  });
  
  await sleep(2000);
  
  console.log('✍️ 填写表单...');
  await page.type('input[name="name"]', '最新部署测试');
  await page.type('input[name="phone"]', '13800138888');
  await page.select('select[name="projectType"]', 'ai');
  await page.type('textarea[name="message"]', '测试最新部署的API功能');
  
  console.log('🖱️ 提交...\n');
  await page.click('button[type="submit"]');
  
  console.log('⏳ 等待25秒...\n');
  await sleep(25000);
  
  console.log('\n✅ 完成！请检查企业微信');
  await browser.close();
  
})().catch(err => {
  console.error('❌ 错误:', err.message);
  process.exit(1);
});
