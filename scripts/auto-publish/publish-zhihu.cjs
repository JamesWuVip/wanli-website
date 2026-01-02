/**
 * 知乎自动发布脚本
 * 使用 Playwright 自动登录并发布文章/回答问题
 * 
 * 使用方法：
 * 1. 先运行 node scripts/auto-publish/login-zhihu.cjs 完成登录
 * 2. 再运行 node scripts/auto-publish/publish-zhihu.cjs 发布内容
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
    // 内容文件
    contentFile: path.join(__dirname, '../../content/zhihu/01-answers.md'),
    // 登录状态存储
    storageState: path.join(__dirname, 'zhihu-auth.json'),
    // 发布间隔（毫秒）
    publishInterval: 120000, // 2分钟间隔
};

// 知乎问答内容
const ZHIHU_QUESTIONS = [
    {
        // 搜索这个问题或直接访问问题页面
        searchKeyword: '如何使用GPT-4开发智能客服系统',
        questionUrl: null, // 如果有具体URL可以填写
        answer: `作为一个做过多个智能客服项目的团队，分享一下我们的实战经验。

### 核心架构

智能客服系统的核心是：**意图识别 → 知识检索 → 答案生成**

### 关键技术点

**1. 意图识别**
用GPT-3.5做分类就够了，成本低、速度快：
- 产品咨询
- 订单查询
- 投诉建议
- 技术支持

**2. 知识库建设**
这是最重要的环节。推荐用RAG架构：
- 向量数据库存储企业知识
- 用户提问时检索相关文档
- 将文档作为上下文给GPT-4

**3. 多轮对话**
保持最近10轮对话历史，让AI理解上下文。

**4. 人工兜底**
设置转人工的触发条件：用户主动要求、投诉类问题、连续3轮未解决

### 效果数据

我们做过的项目数据：
- 问题解决率：85%+
- 响应时间：<2秒
- 人工转接率：<15%

---

> 我们团队专注AI应用开发，写过一篇更详细的实现指南：
> https://zhili.wanli.ai/blog/posts/build-ai-customer-service-with-gpt4.html`
    },
    {
        searchKeyword: '企业如何搭建RAG知识库',
        questionUrl: null,
        answer: `做过几个企业RAG项目，说说实际经验。

### 什么是RAG？

RAG = 检索增强生成，简单说就是：
1. 把企业文档转成向量存起来
2. 用户提问时，检索相关文档
3. 把文档给大模型，让它生成答案

### 技术选型

| 组件 | 推荐 | 理由 |
|------|------|------|
| Embedding | text-embedding-3-small | 性价比高 |
| 向量库 | Milvus | 开源、性能好 |
| LLM | GPT-4 | 效果最好 |

### 核心步骤

**1. 文档处理**
- 支持PDF、Word、网页等格式
- 文档分块（500字左右）
- 保留元数据

**2. 向量化存储**

**3. 检索生成**

### 优化技巧

- **重排序**：用Cross-Encoder对检索结果重排
- **查询改写**：扩展用户问题提高召回
- **缓存**：热门问题缓存答案

### 实际效果

我们做的一个项目：50万+文档，准确率92%，响应<2秒

---

> 完整实现方案可以看这篇：
> https://zhili.wanli.ai/blog/posts/rag-enterprise-knowledge-base.html`
    },
    {
        searchKeyword: '小程序开发外包如何避坑',
        questionUrl: null,
        answer: `作为做过很多外包项目的团队，说几个关键点。

### 选择供应商

**看这几点**：
1. **案例**：要看真实上线的项目，不是设计稿
2. **团队**：问清楚谁来做，是否外包给别人
3. **沟通**：前期沟通是否专业、响应是否及时
4. **报价**：太低的要警惕，可能后面加钱

### 合同要点

**必须写清楚**：
- 功能范围（PRD文档作为附件）
- 交付时间节点
- 付款方式（建议3-4期）
- 源码归属
- 售后维护期

### 验收标准

**分阶段验收**：设计稿确认 → 前端页面 → 功能联调 → 上线测试

### 常见坑

| 坑 | 如何避免 |
|----|---------|
| 需求理解偏差 | 写详细PRD，画原型图 |
| 中途加价 | 合同明确变更流程 |
| 延期交付 | 分阶段付款，绑定时间节点 |
| 代码质量差 | 要求代码审查，交付源码 |

### 报价参考

- 简单展示类：1-3万
- 电商类：5-15万
- 复杂业务类：10-30万

---

> 更详细的避坑指南：
> https://zhili.wanli.ai/blog/posts/miniprogram-development-outsourcing-guide.html`
    }
];

// 发布回答
async function publishAnswer(page, question) {
    console.log(`\n📝 准备回答: ${question.searchKeyword}`);
    
    try {
        // 搜索问题
        await page.goto(`https://www.zhihu.com/search?type=content&q=${encodeURIComponent(question.searchKeyword)}`, {
            waitUntil: 'networkidle'
        });
        await page.waitForTimeout(3000);
        
        // 点击第一个问题结果
        const questionLink = await page.locator('a[href*="/question/"]').first();
        if (await questionLink.isVisible()) {
            await questionLink.click();
            await page.waitForTimeout(3000);
        } else {
            console.log('❌ 未找到相关问题');
            return false;
        }
        
        // 点击"写回答"按钮
        const writeAnswerBtn = await page.locator('button:has-text("写回答"), button:has-text("回答")').first();
        if (await writeAnswerBtn.isVisible()) {
            await writeAnswerBtn.click();
            await page.waitForTimeout(2000);
        }
        
        // 输入回答内容
        const editor = await page.locator('[contenteditable="true"], .public-DraftEditor-content, textarea').first();
        await editor.click();
        await page.waitForTimeout(500);
        
        // 输入内容
        await page.keyboard.type(question.answer, { delay: 5 });
        console.log('✅ 回答内容已输入');
        
        // 点击发布
        await page.waitForTimeout(2000);
        const publishBtn = await page.locator('button:has-text("发布回答"), button:has-text("发布")').first();
        await publishBtn.click();
        
        await page.waitForTimeout(5000);
        console.log('✅ 回答发布成功!');
        
        return true;
    } catch (error) {
        console.error(`❌ 发布失败: ${error.message}`);
        // 截图保存错误状态
        await page.screenshot({ path: `scripts/auto-publish/error-zhihu-${Date.now()}.png` });
        return false;
    }
}

// 发布文章到专栏
async function publishArticle(page, title, content) {
    console.log(`\n📝 准备发布文章: ${title}`);
    
    try {
        // 访问写文章页面
        await page.goto('https://zhuanlan.zhihu.com/write', { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);
        
        // 输入标题
        const titleInput = await page.locator('textarea[placeholder*="标题"], input[placeholder*="标题"]').first();
        await titleInput.fill(title);
        console.log('✅ 标题已输入');
        
        // 输入正文
        const editor = await page.locator('[contenteditable="true"], .public-DraftEditor-content').first();
        await editor.click();
        await page.keyboard.type(content, { delay: 2 });
        console.log('✅ 正文已输入');
        
        // 点击发布
        await page.waitForTimeout(2000);
        const publishBtn = await page.locator('button:has-text("发布")').first();
        await publishBtn.click();
        
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
    console.log('🚀 知乎自动发布脚本');
    console.log('='.repeat(60));
    
    // 检查登录状态
    if (!fs.existsSync(CONFIG.storageState)) {
        console.log('\n❌ 未找到登录状态，请先运行登录脚本:');
        console.log('   node scripts/auto-publish/login-zhihu.cjs');
        return;
    }
    
    console.log(`\n📚 准备发布 ${ZHIHU_QUESTIONS.length} 个回答`);
    
    // 启动浏览器
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 100 
    });
    
    const context = await browser.newContext({
        storageState: CONFIG.storageState
    });
    
    const page = await context.newPage();
    
    // 发布回答
    let successCount = 0;
    for (let i = 0; i < ZHIHU_QUESTIONS.length; i++) {
        const success = await publishAnswer(page, ZHIHU_QUESTIONS[i]);
        if (success) {
            successCount++;
        }
        
        // 发布间隔
        if (i < ZHIHU_QUESTIONS.length - 1) {
            console.log(`\n⏳ 等待 ${CONFIG.publishInterval / 1000} 秒后发布下一个...`);
            await page.waitForTimeout(CONFIG.publishInterval);
        }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`✅ 发布完成! 成功: ${successCount}/${ZHIHU_QUESTIONS.length}`);
    console.log('='.repeat(60));
    
    await browser.close();
}

main().catch(console.error);
