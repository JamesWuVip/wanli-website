/**
 * 在当前已打开的掘金页面上继续操作
 * 使用方法: node fix-juejin.js
 */

import puppeteer from 'puppeteer';

async function fixCurrentPage() {
  console.log('🔍 连接到已打开的浏览器...');
  
  try {
    const browser = await puppeteer.connect({
      browserURL: 'http://127.0.0.1:9222'
    });
    
    const pages = await browser.pages();
    console.log(`📄 找到 ${pages.length} 个页面`);
    
    // 找到掘金编辑器页面
    let juejinPage = null;
    for (const page of pages) {
      const url = page.url();
      if (url.includes('juejin.cn')) {
        juejinPage = page;
        console.log(`✅ 找到掘金页面: ${url}`);
        break;
      }
    }
    
    if (!juejinPage) {
      console.log('❌ 未找到掘金页面');
      return;
    }
    
    // 读取页面结构，找到分类选择器
    console.log('🔍 分析页面结构...');
    const pageInfo = await juejinPage.evaluate(() => {
      const result = {
        categories: [],
        buttons: [],
        inputs: []
      };
      
      // 查找所有可能的分类元素
      const allText = document.body.innerText;
      if (allText.includes('人工智能')) {
        result.hasAI = true;
      }
      
      // 查找弹窗内的元素
      const modal = document.querySelector('[class*="modal"], [class*="popup"], [class*="publish"], [class*="drawer"]');
      if (modal) {
        result.modalFound = true;
        result.modalClass = modal.className;
        
        // 查找分类相关元素
        const categorySection = modal.querySelector('[class*="category"], [class*="Category"]');
        if (categorySection) {
          result.categorySection = categorySection.className;
          // 查找分类选项
          const items = categorySection.querySelectorAll('span, div, li');
          items.forEach(item => {
            if (item.textContent.trim() && item.children.length === 0) {
              result.categories.push({
                text: item.textContent.trim(),
                tag: item.tagName,
                class: item.className
              });
            }
          });
        }
      }
      
      // 查找按钮
      document.querySelectorAll('button').forEach(btn => {
        result.buttons.push(btn.textContent.trim());
      });
      
      return result;
    });
    
    console.log('📊 页面信息:', JSON.stringify(pageInfo, null, 2));
    
    // 选择分类 - 使用更精确的方法
    console.log('📂 选择分类: 人工智能...');
    const categoryResult = await juejinPage.evaluate(() => {
      // 方法1: 查找分类列表中的"人工智能"
      const modal = document.querySelector('[class*="modal"], [class*="popup"], [class*="publish"], [class*="drawer"]');
      if (!modal) return { error: '未找到弹窗' };
      
      // 在弹窗内查找分类
      const allElements = modal.querySelectorAll('*');
      for (const el of allElements) {
        const text = el.textContent.trim();
        // 精确匹配"人工智能"
        if (text === '人工智能' && el.children.length === 0) {
          el.click();
          return { success: true, element: el.tagName, class: el.className };
        }
      }
      
      return { error: '未找到人工智能分类' };
    });
    
    console.log('📂 分类选择结果:', categoryResult);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 点击发布
    console.log('🚀 点击发布...');
    const publishResult = await juejinPage.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const text = btn.textContent.trim();
        if (text === '确定并发布' || text === '发布') {
          btn.click();
          return { success: true, button: text };
        }
      }
      return { error: '未找到发布按钮' };
    });
    
    console.log('🚀 发布结果:', publishResult);
    
    // 等待并检查结果
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const finalCheck = await juejinPage.evaluate(() => {
      // 检查是否有错误提示
      const errors = document.querySelectorAll('[class*="error"], [class*="warning"], [class*="message"]');
      for (const el of errors) {
        if (el.textContent.trim()) {
          return { error: el.textContent.trim() };
        }
      }
      // 检查URL是否变化（发布成功会跳转）
      return { url: window.location.href };
    });
    
    console.log('📝 最终状态:', finalCheck);
    
    // 不断开连接，让浏览器保持打开
    console.log('\n✅ 操作完成，浏览器保持打开');
    
  } catch (e) {
    console.log('❌ 错误:', e.message);
    console.log('\n💡 请确保之前的浏览器窗口还开着');
  }
}

fixCurrentPage();
