/**
 * CSDN 交互式登录脚本
 * 运行后会打开浏览器，手动完成登录后，脚本会自动检测登录状态并保存
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const STORAGE_PATH = path.join(__dirname, 'csdn-auth.json');

async function main() {
    console.log('='.repeat(60));
    console.log('🔐 CSDN 登录脚本（自动检测版）');
    console.log('='.repeat(60));
    
    const browser = await chromium.launch({ 
        headless: false,
        args: ['--start-maximized']
    });
    
    const context = await browser.newContext({
        viewport: null
    });
    
    const page = await context.newPage();
    
    // 访问 CSDN 登录页
    console.log('\n📱 正在打开 CSDN 登录页面...');
    await page.goto('https://passport.csdn.net/login', { waitUntil: 'networkidle' });
    
    console.log('\n' + '='.repeat(60));
    console.log('👆 请在浏览器中完成登录');
    console.log('   脚本会自动检测登录状态...');
    console.log('='.repeat(60));
    
    // 自动检测登录状态（检测是否跳转到首页或出现用户头像）
    let loggedIn = false;
    let attempts = 0;
    const maxAttempts = 60; // 最多等待60次，每次5秒，共5分钟
    
    while (!loggedIn && attempts < maxAttempts) {
        await page.waitForTimeout(5000);
        attempts++;
        
        // 检测是否已登录（多种方式）
        const currentUrl = page.url();
        
        // 方式1：检测URL是否跳转
        if (currentUrl.includes('csdn.net') && !currentUrl.includes('passport')) {
            loggedIn = true;
            break;
        }
        
        // 方式2：检测页面上是否有用户信息
        try {
            const userAvatar = await page.locator('.toolbar-btn-avatar, .user-avatar, img[alt*="头像"]').first();
            if (await userAvatar.isVisible({ timeout: 1000 })) {
                loggedIn = true;
                break;
            }
        } catch (e) {
            // 继续等待
        }
        
        // 方式3：尝试访问需要登录的页面
        if (attempts % 6 === 0) { // 每30秒检测一次
            await page.goto('https://editor.csdn.net/md/', { waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => {});
            await page.waitForTimeout(2000);
            const editorUrl = page.url();
            if (editorUrl.includes('editor.csdn.net')) {
                loggedIn = true;
                break;
            }
            // 如果被重定向到登录页，返回登录页继续等待
            if (editorUrl.includes('passport')) {
                await page.goto('https://passport.csdn.net/login', { waitUntil: 'networkidle' });
            }
        }
        
        console.log(`⏳ 等待登录... (${attempts * 5}秒)`);
    }
    
    if (loggedIn) {
        // 保存登录状态
        await context.storageState({ path: STORAGE_PATH });
        console.log(`\n✅ 登录成功！状态已保存到: ${STORAGE_PATH}`);
        console.log('\n现在可以运行发布脚本:');
        console.log('   node scripts/auto-publish/publish-csdn.cjs');
    } else {
        console.log('\n❌ 登录超时，请重新运行脚本');
    }
    
    await browser.close();
}

main().catch(console.error);
