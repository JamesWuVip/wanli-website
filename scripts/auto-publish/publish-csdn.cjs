/**
 * CSDN 自动发布脚本
 * 使用 Playwright 自动登录并发布文章
 * 
 * 使用方法：
 * 1. 先运行 node scripts/auto-publish/login-csdn.cjs 完成登录
 * 2. 再运行 node scripts/auto-publish/publish-csdn.cjs 发布文章
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
    // 文章目录
    articlesDir: path.join(__dirname, '../../content/csdn'),
    // 登录状态存储
    storageState: path.join(__dirname, 'csdn-auth.json'),
    // 发布间隔（毫秒）
    publishInterval: 60000, // 1分钟间隔，避免被限流
};

// 解析 Markdown 文章
function parseArticle(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // 提取标题（第一行 # 开头）
    let title = '';
    let startIndex = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('# ')) {
            title = lines[i].replace('# ', '').trim();
            startIndex = i + 1;
            break;
        }
    }
    
    // 跳过封面图建议部分，找到正文开始
    let bodyStartIndex = startIndex;
    for (let i = startIndex; i < lines.length; i++) {
        if (lines[i].startsWith('> ') || lines[i].startsWith('## ')) {
            bodyStartIndex = i;
            break;
        }
    }
    
    // 提取正文（跳过封面图建议）
    const body = lines.slice(bodyStartIndex).join('\n');
    
    // 提取标签（文章末尾）
    const tagsMatch = content.match(/\*\*标签\*\*[：:]\s*(.+)/);
    const tags = tagsMatch ? tagsMatch[1].split(/[,，]/).map(t => t.trim()) : [];
    
    return { title, body, tags };
}

// 发布单篇文章到 CSDN
async function publishArticle(page, article) {
    console.log(`\n📝 准备发布: ${article.title}`);
    
    try {
        // 访问写文章页面
        await page.goto('https://editor.csdn.net/md/', { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);
        
        // 清空并输入标题
        const titleInput = await page.locator('input.article-bar__title, input[placeholder*="标题"]').first();
        await titleInput.click();
        await titleInput.fill('');
        await titleInput.fill(article.title);
        console.log('✅ 标题已输入');
        
        // 输入正文（Markdown编辑器）
        const editor = await page.locator('.editor__inner, .CodeMirror-code, textarea.content').first();
        await editor.click();
        
        // 使用键盘快捷键全选并删除
        await page.keyboard.press('Meta+a');
        await page.keyboard.press('Backspace');
        await page.waitForTimeout(500);
        
        // 输入内容
        await page.keyboard.type(article.body, { delay: 1 });
        console.log('✅ 正文已输入');
        
        // 点击发布按钮
        await page.waitForTimeout(2000);
        const publishBtn = await page.locator('button:has-text("发布文章"), button:has-text("发布")').first();
        await publishBtn.click();
        console.log('✅ 点击发布按钮');
        
        // 等待发布设置弹窗
        await page.waitForTimeout(2000);
        
        // 添加标签
        if (article.tags.length > 0) {
            const tagInput = await page.locator('input[placeholder*="标签"], input[placeholder*="添加"]').first();
            if (await tagInput.isVisible()) {
                for (const tag of article.tags.slice(0, 5)) { // CSDN 最多5个标签
                    await tagInput.fill(tag);
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(300);
                }
                console.log('✅ 标签已添加');
            }
        }
        
        // 确认发布
        const confirmBtn = await page.locator('button:has-text("确定并发布"), button:has-text("发布")').last();
        await confirmBtn.click();
        
        await page.waitForTimeout(5000);
        console.log('✅ 文章发布成功!');
        
        return true;
    } catch (error) {
        console.error(`❌ 发布失败: ${error.message}`);
        return false;
    }
}

// 主函数
async function main() {
    console.log('='.repeat(60));
    console.log('🚀 CSDN 自动发布脚本');
    console.log('='.repeat(60));
    
    // 检查登录状态
    if (!fs.existsSync(CONFIG.storageState)) {
        console.log('\n❌ 未找到登录状态，请先运行登录脚本:');
        console.log('   node scripts/auto-publish/login-csdn.cjs');
        return;
    }
    
    // 获取待发布文章
    const files = fs.readdirSync(CONFIG.articlesDir)
        .filter(f => f.endsWith('.md'))
        .sort();
    
    if (files.length === 0) {
        console.log('\n❌ 未找到待发布文章');
        return;
    }
    
    console.log(`\n📚 找到 ${files.length} 篇待发布文章:`);
    files.forEach((f, i) => console.log(`   ${i + 1}. ${f}`));
    
    // 启动浏览器
    const browser = await chromium.launch({ 
        headless: false, // 显示浏览器便于调试
        slowMo: 100 
    });
    
    const context = await browser.newContext({
        storageState: CONFIG.storageState
    });
    
    const page = await context.newPage();
    
    // 发布文章
    let successCount = 0;
    for (let i = 0; i < files.length; i++) {
        const filePath = path.join(CONFIG.articlesDir, files[i]);
        const article = parseArticle(filePath);
        
        const success = await publishArticle(page, article);
        if (success) {
            successCount++;
        }
        
        // 发布间隔
        if (i < files.length - 1) {
            console.log(`\n⏳ 等待 ${CONFIG.publishInterval / 1000} 秒后发布下一篇...`);
            await page.waitForTimeout(CONFIG.publishInterval);
        }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`✅ 发布完成! 成功: ${successCount}/${files.length}`);
    console.log('='.repeat(60));
    
    await browser.close();
}

main().catch(console.error);
