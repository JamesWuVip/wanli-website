/**
 * 知乎登录脚本
 * 运行后会打开浏览器，手动完成登录后按回车保存登录状态
 * 
 * 使用方法：
 * node scripts/auto-publish/login-zhihu.cjs
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const STORAGE_PATH = path.join(__dirname, 'zhihu-auth.json');

async function waitForEnter(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise(resolve => {
        rl.question(prompt, () => {
            rl.close();
            resolve();
        });
    });
}

async function main() {
    console.log('='.repeat(60));
    console.log('🔐 知乎登录脚本');
    console.log('='.repeat(60));
    
    const browser = await chromium.launch({ 
        headless: false,
        args: ['--start-maximized']
    });
    
    const context = await browser.newContext({
        viewport: null
    });
    
    const page = await context.newPage();
    
    // 访问知乎登录页
    console.log('\n📱 正在打开知乎登录页面...');
    await page.goto('https://www.zhihu.com/signin', { waitUntil: 'networkidle' });
    
    console.log('\n' + '='.repeat(60));
    console.log('👆 请在浏览器中完成登录');
    console.log('   支持：手机验证码、密码、微信扫码等方式');
    console.log('='.repeat(60));
    
    await waitForEnter('\n✅ 登录完成后，按回车键保存登录状态...');
    
    // 保存登录状态
    await context.storageState({ path: STORAGE_PATH });
    
    console.log(`\n✅ 登录状态已保存到: ${STORAGE_PATH}`);
    console.log('\n现在可以运行发布脚本:');
    console.log('   node scripts/auto-publish/publish-zhihu.cjs');
    
    await browser.close();
}

main().catch(console.error);
