/**
 * CSDN 补发剩余文章脚本
 * 只发布：提示词工程、GPT-4智能客服
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CONFIG = {
    storageState: path.join(__dirname, 'csdn-auth.json'),
    publishInterval: 60000,
};

// 待发布的文章（跳过已发布的）
const ARTICLES = [
    {
        title: '提示词工程完全指南：从入门到精通 | 智理科技',
        file: '02-prompt-engineering-guide.md'
    },
    {
        title: '如何使用GPT-4构建智能客服系统 | 智理科技',
        file: '04-gpt4-customer-service.md'
    }
];

function parseArticle(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    let title = '';
    let startIndex = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('# ')) {
            title = lines[i].replace('# ', '').trim();
            startIndex = i + 1;
            break;
        }
    }
    
    let bodyStartIndex = startIndex;
    for (let i = startIndex; i < lines.length; i++) {
        if (lines[i].startsWith('> ') || lines[i].startsWith('## ')) {
            bodyStartIndex = i;
            break;
        }
    }
    
    const body = lines.slice(bodyStartIndex).join('\n');
    const tagsMatch = content.match(/\*\*标签\*\*[：:]\s*(.+)/);
    const tags = tagsMatch ? tagsMatch[1].split(/[,，]/).map(t => t.trim()) : [];
    
    return { title, body, tags };
}

async function publishArticle(page, article) {
    console.log(`\n📝 准备发布: ${article.title}`);
    
    try {
        await page.goto('https://editor.csdn.net/md/', { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);
        
        // 关闭模态框
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);
        
        // 再次尝试关闭
        try {
            const closeBtn = await page.locator('.modal-close, button:has-text("×"), .close').first();
            if (await closeBtn.isVisible({ timeout: 1000 })) {
                await closeBtn.click();
                await page.waitForTimeout(500);
            }
        } catch (e) {}
        
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
        
        // 输入标题
        const titleInput = await page.locator('input.article-bar__title').first();
        await titleInput.click({ force: true });
        await titleInput.fill('');
        await titleInput.fill(article.title);
        console.log('✅ 标题已输入');
        
        // 输入正文
        const editor = await page.locator('.cledit-section, .editor__inner').first();
        await editor.click({ force: true });
        await page.keyboard.press('Meta+a');
        await page.keyboard.press('Backspace');
        await page.waitForTimeout(300);
        await page.keyboard.type(article.body, { delay: 0 });
        console.log('✅ 正文已输入');
        
        // 点击发布按钮
        await page.waitForTimeout(2000);
        const publishBtn = await page.locator('button:has-text("发布文章")').first();
        await publishBtn.click();
        console.log('✅ 点击发布按钮');
        
        // 等待弹窗
        await page.waitForTimeout(3000);
        
        // 点击确认发布
        const confirmBtn = await page.locator('button:has-text("发布文章")').last();
        await confirmBtn.click();
        console.log('✅ 点击确认发布');
        
        await page.waitForTimeout(5000);
        console.log('✅ 文章发布完成!');
        
        return true;
    } catch (error) {
        console.error(`❌ 发布失败: ${error.message}`);
        await page.screenshot({ path: `scripts/auto-publish/error-${Date.now()}.png` });
        return false;
    }
}

async function main() {
    console.log('='.repeat(60));
    console.log('🚀 CSDN 补发剩余文章');
    console.log('='.repeat(60));
    
    if (!fs.existsSync(CONFIG.storageState)) {
        console.log('\n❌ 未找到登录状态');
        return;
    }
    
    const browser = await chromium.launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext({ storageState: CONFIG.storageState });
    const page = await context.newPage();
    
    let successCount = 0;
    for (let i = 0; i < ARTICLES.length; i++) {
        const filePath = path.join(__dirname, '../../content/csdn', ARTICLES[i].file);
        const article = parseArticle(filePath);
        
        const success = await publishArticle(page, article);
        if (success) successCount++;
        
        if (i < ARTICLES.length - 1) {
            console.log(`\n⏳ 等待 ${CONFIG.publishInterval / 1000} 秒...`);
            await page.waitForTimeout(CONFIG.publishInterval);
        }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`✅ 发布完成! 成功: ${successCount}/${ARTICLES.length}`);
    console.log('='.repeat(60));
    
    await browser.close();
}

main().catch(console.error);
