const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  console.log('🚀 启动浏览器测试...');
  
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  // 监听所有控制台消息
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('[Form]') || text.includes('[API]') || text.includes('WeChat')) {
      console.log('📝 浏览器控制台:', text);
    }
  });
  
  // 监听网络请求
  page.on('request', request => {
    const url = request.url();
    if (url.includes('/api/consultation') || url.includes('qyapi.weixin.qq.com')) {
      console.log('🌐 请求:', request.method(), url.substring(0, 80));
    }
  });
  
  page.on('response', async response => {
    const url = response.url();
    if (url.includes('/api/consultation') || url.includes('qyapi.weixin.qq.com')) {
      console.log('✅ 响应:', response.status(), response.statusText());
      try {
        const text = await response.text();
        if (text) console.log('📦 响应内容:', text.substring(0, 200));
      } catch (e) {
        console.log('⚠️ 无法读取响应内容');
      }
    }
  });
  
  console.log('🌍 访问网站: https://zhili.wanli.ai');
  await page.goto('https://zhili.wanli.ai', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });
  
  console.log('⏳ 等待页面加载...');
  await sleep(3000);
  
  console.log('📋 滚动到表单区域...');
  await page.evaluate(() => {
    const section = document.querySelector('#consultation');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await sleep(2000);
  
  console.log('🔍 检查表单元素...');
  const nameInput = await page.$('input[name="name"]');
  const phoneInput = await page.$('input[name="phone"]');
  const projectSelect = await page.$('select[name="projectType"]');
  const submitButton = await page.$('button[type="submit"]');
  
  console.log('  - 姓名输入框:', nameInput ? '✓' : '✗');
  console.log('  - 电话输入框:', phoneInput ? '✓' : '✗');
  console.log('  - 项目类型:', projectSelect ? '✓' : '✗');
  console.log('  - 提交按钮:', submitButton ? '✓' : '✗');
  
  if (!nameInput || !phoneInput || !projectSelect || !submitButton) {
    console.log('❌ 表单元素未找到！');
    await browser.close();
    return;
  }
  
  console.log('\n✍️ 填写表单...');
  await page.type('input[name="name"]', 'Puppeteer测试');
  console.log('  ✓ 姓名已填写');
  
  await page.type('input[name="phone"]', '13800138000');
  console.log('  ✓ 电话已填写');
  
  await page.select('select[name="projectType"]', 'ai');
  console.log('  ✓ 项目类型已选择');
  
  await page.type('textarea[name="message"]', '这是浏览器自动化测试提交，请忽略');
  console.log('  ✓ 需求描述已填写');
  
  console.log('\n🖱️ 点击提交按钮...');
  await page.click('button[type="submit"]');
  
  console.log('⏳ 等待20秒观察网络请求和响应...\n');
  await sleep(20000);
  
  console.log('\n✅ 测试完成！');
  console.log('📱 请检查您的企业微信群是否收到通知');
  console.log('\n浏览器窗口将保持打开，按 Ctrl+C 关闭');
  
})().catch(err => {
  console.error('❌ 测试失败:', err.message);
  process.exit(1);
});
