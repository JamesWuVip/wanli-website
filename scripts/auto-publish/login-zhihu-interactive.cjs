/**
 * 知乎交互式登录脚本
 * 自动检测登录状态
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const STORAGE_PATH = path.join(__dirname, 'zhihu-auth.json');

async function main() {
    console.log('='.repeat(60));
    console.log('🔐 知乎登录脚本（自动检测版）');
    console.log('='.repeat(60));
    
    const browser = await chromium.launch({ 
        headless: false,
        args: ['--start-maximized']
    });
    
    const context = await browser.newContext({ viewport: null });
    const page = await context.newPage();
    
    console.log('\n📱 正在打开知乎登录页面...');
    await page.goto('https://www.zhihu.com/signin', { waitUntil: 'networkidle' });
    
    console.log('\n' + '='.repeat(60));
    console.log('👆 请在浏览器中完成登录');
    console.log('   脚本会自动检测登录状态...');
    console.log('='.repeat(60));
    
    // 自动检测登录状态
    let loggedIn = false;
    let attempts = 0;
    const maxAttempts = 60;
    
    while (!loggedIn && attempts < maxAttempts) {
        await page.waitForTimeout(5000);
        attempts++;
        
        const currentUrl = page.url();
        
        // 检测是否跳转到首页
        if (currentUrl === 'https://www.zhihu.com/' || currentUrl.includes('zhihu.com/?')) {
            loggedIn = true;
            break;
        }
        
        // 检测页面上是否有用户头像
        try {
            const avatar = await page.locator('.AppHeader-profile, .Avatar').first();
            if (await avatar.isVisible({ timeout: 1000 })) {
                loggedIn = true;
                break;
            }
        } catch (e) {}
        
        // 每30秒尝试访问首页检测
        if (attempts % 6 === 0) {
            await page.goto('https://www.zhihu.com/', { waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => {});
            await page.waitForTimeout(2000);
            
            try {
                const avatar = await page.locator('.AppHeader-profile, .Avatar').first();
                if (await avatar.isVisible({ timeout: 2000 })) {
                    loggedIn = true;
                    break;
                }
            } catch (e) {}
            
            // 如果未登录，返回登录页
            if (!loggedIn) {
                await page.goto('https://www.zhihu.com/signin', { waitUntil: 'networkidle' });
            }
        }
        
        console.log(`⏳ 等待登录... (${attempts * 5}秒)`);
    }
    
    if (loggedIn) {
        await context.storageState({ path: STORAGE_PATH });
        console.log(`\n✅ 登录成功！状态已保存到: ${STORAGE_PATH}`);
        console.log('\n现在可以运行发布脚本:');
        console.log('   node scripts/auto-publish/publish-zhihu.cjs');
    } else {
        console.log('\n❌ 登录超时，请重新运行脚本');
    }
    
    await browser.close();
}

main().catch(console.error);
