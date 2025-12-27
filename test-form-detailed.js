const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  console.log('🚀 启动详细测试...');
  
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  // 监听所有控制台消息（不过滤）
  page.on('console', msg => {
    console.log('📝 控制台:', msg.text());
  });
  
  // 监听所有网络请求
  page.on('request', request => {
    console.log('🌐 请求:', request.method(), request.url());
  });
  
  page.on('response', async response => {
    console.log('✅ 响应:', response.status(), response.url());
  });
  
  console.log('🌍 访问: https://zhili.wanli.ai');
  await page.goto('https://zhili.wanli.ai', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });
  
  await sleep(3000);
  
  await page.evaluate(() => {
    document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  
  await sleep(2000);
  
  console.log('\n✍️ 填写表单...');
  await page.type('input[name="name"]', '详细测试');
  await page.type('input[name="phone"]', '13900000000');
  await page.select('select[name="projectType"]', 'ai');
  
  console.log('\n🖱️ 提交表单...\n');
  await page.click('button[type="submit"]');
  
  console.log('⏳ 等待30秒...\n');
  await sleep(30000);
  
  console.log('\n✅ 测试结束');
  await browser.close();
  
})().catch(err => {
  console.error('❌ 错误:', err.message);
  process.exit(1);
});
