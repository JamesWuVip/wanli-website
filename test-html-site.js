const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('📝', msg.text()));
  
  page.on('request', req => {
    if (req.url().includes('/api/') || req.url().includes('qyapi')) {
      console.log('🌐', req.method(), req.url());
    }
  });
  
  page.on('response', async res => {
    if (res.url().includes('/api/') || res.url().includes('qyapi')) {
      console.log('✅', res.status(), res.url());
      try {
        console.log('📦', await res.text());
      } catch {}
    }
  });
  
  console.log('访问: https://public-site-2unyojogb-wanli-academy.vercel.app');
  await page.goto('https://public-site-2unyojogb-wanli-academy.vercel.app', { waitUntil: 'networkidle2' });
  
  await new Promise(r => setTimeout(r, 3000));
  
  await page.evaluate(() => {
    document.querySelector('#consultation')?.scrollIntoView();
  });
  
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('\n✍️ 填写表单...');
  await page.type('input[name="name"]', 'HTML版本测试');
  await page.type('input[name="phone"]', '13800138000');
  await page.select('select[name="projectType"]', 'ai');
  
  console.log('🖱️ 提交...\n');
  await page.click('button[type="submit"]');
  
  await new Promise(r => setTimeout(r, 20000));
  
  console.log('\n✅ 完成！检查企业微信');
  await browser.close();
})();
