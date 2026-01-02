/**
 * 掘金文章自动发布脚本
 * 使用方法: node paste-to-juejin.js <markdown文件路径>
 * 
 * 示例: node paste-to-juejin.js juejin-ready/prompt-engineering-clean.md
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COOKIES_PATH = path.join(__dirname, 'juejin-cookies.json');

// 文章配置
const ARTICLE_CONFIG = {
  'prompt-engineering-complete-guide': {
    title: '提示词工程完全指南：从入门到精通',
    category: '人工智能',
    tags: ['提示词工程', 'GPT-4', 'Claude', 'Prompt', 'AI应用'],
    cover: 'prompt-engineering-cover.jpg'
  },
  'ai-cost-optimization-guide': {
    title: 'AI应用成本优化完全指南：从Token节省到架构优化',
    category: '人工智能',
    tags: ['AI成本优化', 'GPT-4', 'Token优化', 'AI应用', '成本控制'],
    cover: 'ai-cost-optimization-cover.jpg'
  },
  'rag-enterprise-knowledge-base': {
    title: 'RAG技术在企业知识库中的应用实践',
    category: '人工智能',
    tags: ['RAG', '知识库', '向量数据库', 'AI应用', 'LangChain'],
    cover: 'rag-cover.jpg'
  },
  'enterprise-microservices-architecture': {
    title: '企业级微服务架构设计与落地实践',
    category: '后端',
    tags: ['微服务', 'Spring Cloud', '架构设计', '分布式系统', 'Java'],
    cover: 'microservices-cover.jpg'
  }
};

async function loadCookies(page) {
  if (!fs.existsSync(COOKIES_PATH)) {
    console.error('❌ Cookie文件不存在，请先运行: node get-cookies.js');
    process.exit(1);
  }
  
  const cookies = JSON.parse(fs.readFileSync(COOKIES_PATH, 'utf-8'));
  await page.setCookie(...cookies);
  console.log('✅ Cookie已加载');
}

function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 提取frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const body = frontmatterMatch[2];
    
    // 解析标题
    const titleMatch = frontmatter.match(/title:\s*(.+)/);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    // 解析slug
    const slugMatch = frontmatter.match(/slug:\s*(.+)/);
    const slug = slugMatch ? slugMatch[1].trim() : '';
    
    return { title, slug, body: body.trim() };
  }
  
  // 没有frontmatter，尝试从第一行获取标题
  const lines = content.split('\n');
  const titleLine = lines.find(l => l.startsWith('# '));
  const title = titleLine ? titleLine.replace('# ', '').trim() : '';
  
  return { title, slug: '', body: content };
}

async function publishToJuejin(markdownPath) {
  console.log('🚀 启动掘金发布流程...\n');
  
  // 解析Markdown文件
  const { title, slug, body } = parseMarkdownFile(markdownPath);
  const config = ARTICLE_CONFIG[slug] || {};
  
  const articleTitle = config.title || title;
  const articleTags = config.tags || ['AI应用'];
  const articleCategory = config.category || '人工智能';
  
  console.log(`📝 文章标题: ${articleTitle}`);
  console.log(`🏷️  标签: ${articleTags.join(', ')}`);
  console.log(`📂 分类: ${articleCategory}\n`);
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1400, height: 900 },
    args: ['--remote-debugging-port=9222']
  });
  
  const page = await browser.newPage();
  
  // 加载Cookie
  await loadCookies(page);
  
  // 打开写文章页面
  console.log('📱 打开掘金编辑器...');
  await page.goto('https://juejin.cn/editor/drafts/new?v=2', { 
    waitUntil: 'networkidle2',
    timeout: 60000 
  });
  
  // 等待编辑器加载
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // 检查是否需要重新登录
  const currentUrl = page.url();
  if (currentUrl.includes('/login')) {
    console.log('⚠️  Cookie已过期，请重新运行: node get-cookies.js');
    await browser.close();
    process.exit(1);
  }
  
  console.log('✅ 编辑器已打开\n');
  
  // 输入标题
  console.log('📝 输入标题...');
  try {
    await page.waitForSelector('input.title-input, input[placeholder*="标题"]', { timeout: 10000 });
    await page.click('input.title-input, input[placeholder*="标题"]');
    await page.keyboard.type(articleTitle, { delay: 30 });
    console.log('✅ 标题已输入');
  } catch (e) {
    console.log('⚠️  无法自动输入标题，请手动输入');
  }
  
  // 切换到Markdown模式（如果需要）
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 输入正文 - 使用更可靠的方法
  console.log('📝 输入正文...');
  try {
    // 等待编辑器完全加载
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 掘金使用 ByteMD 编辑器，找到 CodeMirror 编辑区域
    // 先尝试点击编辑区域激活它
    await page.evaluate(() => {
      // 查找 CodeMirror 编辑器
      const cm = document.querySelector('.CodeMirror');
      if (cm && cm.CodeMirror) {
        cm.CodeMirror.focus();
        return true;
      }
      // 尝试点击编辑区域
      const editor = document.querySelector('.bytemd-editor') || 
                     document.querySelector('[class*="editor"]') ||
                     document.querySelector('.CodeMirror-scroll');
      if (editor) {
        editor.click();
        return true;
      }
      return false;
    });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 直接使用 CodeMirror API 设置内容
    const contentSet = await page.evaluate((content) => {
      // 方法1: 使用 CodeMirror API
      const cm = document.querySelector('.CodeMirror');
      if (cm && cm.CodeMirror) {
        cm.CodeMirror.setValue(content);
        return 'codemirror';
      }
      
      // 方法2: 查找 textarea 并设置
      const textarea = document.querySelector('.bytemd-body textarea, textarea');
      if (textarea) {
        textarea.value = content;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
        return 'textarea';
      }
      
      // 方法3: contenteditable
      const editable = document.querySelector('[contenteditable="true"]');
      if (editable) {
        editable.innerHTML = content.replace(/\n/g, '<br>');
        return 'contenteditable';
      }
      
      return null;
    }, body);
    
    if (contentSet) {
      console.log(`✅ 正文已填入 (${contentSet})`);
    } else {
      // 备用方案：复制到剪贴板让用户粘贴
      await page.evaluate((content) => {
        navigator.clipboard.writeText(content);
      }, body);
      console.log('⚠️  无法自动填入正文');
      console.log('📋 内容已复制到剪贴板，请在编辑器中按 Cmd+V 粘贴');
    }
  } catch (e) {
    console.log('⚠️  正文填入失败:', e.message);
  }
  
  // 等待一下让内容加载
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 点击发布按钮打开发布设置面板
  console.log('📝 打开发布设置...');
  try {
    // 点击右上角的"发布"按钮
    const publishBtnSelectors = [
      'button.publish-btn',
      'button:has-text("发布")',
      '.publish-popup-btn',
      '[class*="publish"]'
    ];
    
    // 使用evaluate来查找并点击发布按钮
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent.includes('发布') && !btn.textContent.includes('定时')) {
          btn.click();
          return true;
        }
      }
      return false;
    });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('✅ 发布设置面板已打开');
  } catch (e) {
    console.log('⚠️  无法自动打开发布设置');
  }
  
  // 选择分类
  console.log(`📂 选择分类: ${articleCategory}...`);
  try {
    // 等待分类列表加载
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const categorySelected = await page.evaluate((category) => {
      // 掘金的分类选择器通常是一个列表
      // 查找包含分类名称的可点击元素
      
      // 方法1: 查找分类列表项
      const categoryList = document.querySelectorAll('[class*="category"] li, [class*="Category"] li, .category-list li');
      for (const item of categoryList) {
        if (item.textContent.includes(category)) {
          item.click();
          return `li: ${item.textContent.trim()}`;
        }
      }
      
      // 方法2: 查找分类按钮/div
      const categoryDivs = document.querySelectorAll('[class*="category"] div, [class*="Category"] div');
      for (const div of categoryDivs) {
        if (div.textContent.trim() === category || div.textContent.includes(category)) {
          div.click();
          return `div: ${div.textContent.trim()}`;
        }
      }
      
      // 方法3: 查找所有包含分类名的元素
      const allElements = document.querySelectorAll('span, div, li, a');
      for (const el of allElements) {
        const text = el.textContent.trim();
        // 精确匹配分类名
        if (text === category || text === `${category}` || text === `# ${category}`) {
          // 确保这个元素在发布弹窗内
          const popup = el.closest('[class*="modal"], [class*="popup"], [class*="dialog"], [class*="drawer"]');
          if (popup) {
            el.click();
            return `element: ${text}`;
          }
        }
      }
      
      // 方法4: 查找“人工智能”文本
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      while (walker.nextNode()) {
        if (walker.currentNode.textContent.trim() === category) {
          const parent = walker.currentNode.parentElement;
          if (parent && parent.tagName !== 'SCRIPT' && parent.tagName !== 'STYLE') {
            parent.click();
            return `text: ${category}`;
          }
        }
      }
      
      return null;
    }, articleCategory);
    
    if (categorySelected) {
      console.log(`✅ 分类已选择 (${categorySelected})`);
    } else {
      console.log('⚠️  未找到分类，请手动选择');
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (e) {
    console.log('⚠️  分类选择失败:', e.message);
  }
  
  // 添加标签 - 改进版
  console.log(`🏷️  添加标签: ${articleTags.join(', ')}...`);
  try {
    for (const tag of articleTags.slice(0, 1)) { // 先添加一个标签确保成功
      // 查找并点击标签输入框
      console.log(`   添加标签: ${tag}`);
      
      // 点击标签区域激活输入
      await page.evaluate(() => {
        const tagSection = document.querySelector('[class*="tag"]');
        if (tagSection) {
          const input = tagSection.querySelector('input');
          if (input) input.click();
        }
      });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 输入标签名称
      await page.keyboard.type(tag, { delay: 50 });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 点击第一个搜索结果
      const tagSelected = await page.evaluate(() => {
        // 查找下拉列表中的选项
        const options = document.querySelectorAll('[class*="suggest"] li, [class*="option"], [class*="item"], [class*="result"] div');
        for (const opt of options) {
          if (opt.textContent.trim() && !opt.textContent.includes('创建')) {
            opt.click();
            return opt.textContent.trim();
          }
        }
        // 如果没有下拉，按回车
        return null;
      });
      
      if (tagSelected) {
        console.log(`   ✅ 已选择: ${tagSelected}`);
      } else {
        // 按回车确认
        await page.keyboard.press('Enter');
        console.log(`   ✅ 已输入: ${tag}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log('✅ 标签添加完成');
  } catch (e) {
    console.log('⚠️  标签添加失败:', e.message);
  }
  
  // 上传封面图片
  const coverPath = path.join(__dirname, 'public-site/blog/covers', `${slug}-cover.jpg`);
  if (fs.existsSync(coverPath)) {
    console.log(`🖼️  上传封面: ${coverPath}`);
    try {
      // 查找封面上传区域
      const uploadInput = await page.$('input[type="file"]');
      if (uploadInput) {
        await uploadInput.uploadFile(coverPath);
        console.log('✅ 封面已上传');
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        // 尝试点击上传按钮
        await page.evaluate(() => {
          const uploadArea = document.querySelector('[class*="cover"], [class*="upload"]');
          if (uploadArea) uploadArea.click();
        });
        await new Promise(resolve => setTimeout(resolve, 500));
        const fileInput = await page.$('input[type="file"]');
        if (fileInput) {
          await fileInput.uploadFile(coverPath);
          console.log('✅ 封面已上传');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    } catch (e) {
      console.log('⚠️  封面上传失败:', e.message);
    }
  } else {
    console.log('⚠️  封面文件不存在, 跳过');
  }
  
  // 等待一下确保所有操作完成
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 点击确定并发布按钮
  console.log('🚀 点击发布...');
  
  // 多次尝试发布
  let publishSuccess = false;
  for (let attempt = 1; attempt <= 3; attempt++) {
    console.log(`   第 ${attempt} 次尝试...`);
    
    // 检查是否有错误提示
    const errorMsg = await page.evaluate(() => {
      const errors = document.querySelectorAll('[class*="error"], [class*="warning"], [class*="toast"], [class*="message"]');
      for (const el of errors) {
        const text = el.textContent.trim();
        if (text && (text.includes('请') || text.includes('错误') || text.includes('失败'))) {
          return text;
        }
      }
      return null;
    });
    
    if (errorMsg) {
      console.log(`   ⚠️  错误: ${errorMsg}`);
      
      // 如果是标签错误，尝试重新添加
      if (errorMsg.includes('标签')) {
        console.log('   重新添加标签...');
        await page.keyboard.type('AI', { delay: 50 });
        await new Promise(resolve => setTimeout(resolve, 800));
        await page.keyboard.press('Enter');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // 如果是分类错误，尝试重新选择
      if (errorMsg.includes('分类')) {
        console.log('   重新选择分类...');
        await page.evaluate(() => {
          const items = document.querySelectorAll('*');
          for (const el of items) {
            if (el.textContent.trim() === '人工智能' && el.children.length === 0) {
              el.click();
              return;
            }
          }
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // 点击发布按钮
    const clickResult = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const text = btn.textContent.trim();
        if (text === '确定并发布') {
          btn.click();
          return { clicked: true, text };
        }
      }
      return { clicked: false };
    });
    
    if (clickResult.clicked) {
      console.log(`   ✅ 已点击: ${clickResult.text}`);
    }
    
    // 等待发布结果
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 检查是否发布成功（URL变化或成功提示）
    const currentUrl = page.url();
    if (currentUrl.includes('/post/') || !currentUrl.includes('/editor/')) {
      publishSuccess = true;
      console.log('🎉 发布成功!');
      console.log(`   文章链接: ${currentUrl}`);
      break;
    }
    
    // 检查是否有成功提示
    const successMsg = await page.evaluate(() => {
      const msgs = document.querySelectorAll('[class*="success"], [class*="toast"]');
      for (const el of msgs) {
        if (el.textContent.includes('成功')) {
          return el.textContent.trim();
        }
      }
      return null;
    });
    
    if (successMsg) {
      publishSuccess = true;
      console.log(`🎉 ${successMsg}`);
      break;
    }
  }
  
  if (!publishSuccess) {
    console.log('\n' + '='.repeat(50));
    console.log('⚠️  自动发布未成功，请手动检查:');
    console.log('='.repeat(50));
    console.log('1. 确认分类已选择');
    console.log('2. 确认至少添加了1个标签');
    console.log('3. 点击"确定并发布"按钮');
    console.log('='.repeat(50));
  }
  
  console.log('\n⏳ 浏览器保持打开...\n');
  
  // 保持浏览器打开
  // 不自动关闭浏览器
}

// 主程序
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('掘金文章发布工具\n');
  console.log('使用方法:');
  console.log('  node paste-to-juejin.js <markdown文件路径>\n');
  console.log('示例:');
  console.log('  node paste-to-juejin.js public-site/blog/markdown/prompt-engineering-complete-guide.md\n');
  console.log('首次使用请先获取Cookie:');
  console.log('  node get-cookies.js\n');
  process.exit(0);
}

const markdownPath = path.resolve(args[0]);

if (!fs.existsSync(markdownPath)) {
  console.error(`❌ 文件不存在: ${markdownPath}`);
  process.exit(1);
}

publishToJuejin(markdownPath).catch(console.error);
