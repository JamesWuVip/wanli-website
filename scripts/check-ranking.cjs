const { chromium } = require('playwright');

// 使用站长工具检测排名
async function checkRankingViaChinaz(keyword, targetDomain) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();
    
    try {
        console.log(`\n🔍 检测关键词: "${keyword}"`);
        
        // 使用站长工具的排名查询
        const url = `https://rank.chinaz.com/${targetDomain}`;
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // 等待页面加载
        await page.waitForTimeout(3000);
        
        // 获取页面内容
        const content = await page.content();
        console.log(`📄 已访问站长工具页面`);
        
        // 截图保存
        await page.screenshot({ path: 'scripts/chinaz-result.png', fullPage: false });
        console.log(`📸 截图已保存到 scripts/chinaz-result.png`);
        
        return { keyword, success: true };
        
    } catch (error) {
        console.log(`❌ 检测失败: ${error.message}`);
        return { keyword, error: error.message };
    } finally {
        await browser.close();
    }
}

async function main() {
    const targetDomain = 'zhili.wanli.ai';
    
    console.log('='.repeat(60));
    console.log('🎯 SEO 排名检测 - 使用站长工具');
    console.log(`📍 目标域名: ${targetDomain}`);
    console.log('='.repeat(60));
    
    await checkRankingViaChinaz('智理科技', targetDomain);
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ 检测完成');
    console.log('='.repeat(60));
}

main().catch(console.error);
