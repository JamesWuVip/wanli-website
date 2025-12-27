# 表单集成指南

留资表单已经创建完成，现在需要集成邮件发送功能，将客户信息发送到您的邮箱。

## 📋 表单优化亮点

### ✅ 降低填写门槛
- 只需3个必填字段：姓名、电话、项目类型
- 需求描述改为选填
- 取消了公司名称和邮箱（非必要）
- 手机号格式验证

### ✅ 提升转化率设计
- 30秒快速填写提示
- 2小时响应承诺（而非24小时）
- 实时状态反馈（提交中、提交成功）
- 提交失败自动提示电话
- 成功后5秒自动清空表单

### ✅ 表单数据
提交时会收集：
- 姓名
- 手机号
- 项目类型
- 需求描述（选填）
- 提交时间

## 🔧 集成邮件服务（4种方案）

### 方案一：EmailJS（推荐 - 最简单）

#### 1. 注册 EmailJS
1. 访问 https://www.emailjs.com/
2. 注册免费账号（每月200封邮件）
3. 添加邮件服务（Gmail/Outlook等）

#### 2. 创建邮件模板
```
主题：【新客户咨询】{{name}} - {{projectType}}

内容：
新客户咨询信息
==================

姓名：{{name}}
电话：{{phone}}
项目类型：{{projectType}}
需求描述：{{message}}

提交时间：{{submitTime}}
```

#### 3. 安装依赖
```bash
npm install @emailjs/browser
```

#### 4. 更新表单代码

在 `components/ConsultationForm.tsx` 中：

```typescript
import emailjs from '@emailjs/browser';

// 在 handleSubmit 函数中替换 TODO 部分：
try {
  // EmailJS 配置
  const templateParams = {
    name: formData.name,
    phone: formData.phone,
    projectType: formData.projectType,
    message: formData.message || '无',
    submitTime: new Date().toLocaleString('zh-CN'),
  };

  await emailjs.send(
    'YOUR_SERVICE_ID',      // 替换为你的 Service ID
    'YOUR_TEMPLATE_ID',     // 替换为你的 Template ID
    templateParams,
    'YOUR_PUBLIC_KEY'       // 替换为你的 Public Key
  );

  setSubmitted(true);
  // ... 其余代码
} catch (error) {
  console.error('发送失败:', error);
  alert('提交失败，请直接拨打电话联系我们：138-1179-6300');
}
```

---

### 方案二：企业微信机器人（推荐 - 国内最佳）

#### 1. 创建企业微信群机器人
1. 在企业微信群中添加机器人
2. 获取 Webhook URL

#### 2. 更新表单代码

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    const message = `
【新客户咨询】
姓名：${formData.name}
电话：${formData.phone}
项目类型：${formData.projectType}
需求：${formData.message || '无'}
时间：${new Date().toLocaleString('zh-CN')}
    `;

    await fetch('YOUR_WEBHOOK_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        msgtype: 'text',
        text: { content: message }
      })
    });

    setSubmitted(true);
    // ... 其余代码
  } catch (error) {
    console.error('发送失败:', error);
  }
};
```

---

### 方案三：后端 API（最灵活）

#### 1. 创建 API 路由

在 `app/api/contact/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 配置邮件发送
    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com', // 或其他邮件服务器
      port: 465,
      secure: true,
      auth: {
        user: 'your-email@qq.com',
        pass: 'your-smtp-password',
      },
    });

    // 发送邮件
    await transporter.sendMail({
      from: 'your-email@qq.com',
      to: 'wuning@wanli.ai',
      subject: `【新客户咨询】${data.name} - ${data.projectType}`,
      text: `
姓名：${data.name}
电话：${data.phone}
项目类型：${data.projectType}
需求：${data.message || '无'}
时间：${new Date().toLocaleString('zh-CN')}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('发送失败:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
```

#### 2. 安装依赖
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

#### 3. 更新表单代码

```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...formData,
    submitTime: new Date().toISOString(),
  }),
});

if (response.ok) {
  setSubmitted(true);
  // ...
}
```

---

### 方案四：第三方表单服务

#### Formspree
1. 访问 https://formspree.io/
2. 注册免费账号
3. 获取表单 endpoint

```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

## 📊 方案对比

| 方案 | 难度 | 成本 | 推荐度 | 适用场景 |
|------|------|------|--------|----------|
| EmailJS | ⭐ | 免费 | ⭐⭐⭐⭐⭐ | 快速上线 |
| 企业微信 | ⭐ | 免费 | ⭐⭐⭐⭐⭐ | 国内团队 |
| 后端API | ⭐⭐⭐ | 免费 | ⭐⭐⭐⭐ | 需要定制 |
| Formspree | ⭐ | 免费 | ⭐⭐⭐ | 简单需求 |

## 🎯 推荐实施方案

### 第一阶段（立即实施）
使用 **企业微信机器人** 或 **EmailJS**
- 最快上线（5分钟配置）
- 零成本
- 实时通知

### 第二阶段（后续优化）
添加数据存储
- 将表单数据保存到数据库
- 建立CRM系统
- 数据分析和跟进

## 📱 接收通知设置

### 推荐配置
1. **企业微信通知**（实时）
2. **邮件通知**（备份）
3. **短信通知**（重要客户）

### 通知内容
```
【新客户咨询】
👤 姓名：张三
📞 电话：138-1179-6300
💼 项目：AI应用开发
📝 需求：需要开发智能客服系统
⏰ 时间：2024-01-01 10:30

🔥 请在2小时内回电！
```

## ⚠️ 注意事项

1. **隐私保护**
   - 数据加密传输
   - 不要在前端暴露敏感密钥
   - 使用环境变量存储配置

2. **防止垃圾提交**
   - 添加 Google reCAPTCHA
   - 限制提交频率
   - 手机号格式验证

3. **用户体验**
   - 提交成功后清空表单
   - 失败时提示备用联系方式
   - 响应时间控制在2秒内

## 🚀 快速开始

### 最简单的方式（5分钟）

1. **注册 EmailJS**
   - 访问 https://www.emailjs.com/
   - 连接你的邮箱

2. **安装依赖**
```bash
npm install @emailjs/browser
```

3. **更新代码**
   - 按照方案一的代码替换 TODO 部分

4. **测试**
   - 提交表单
   - 检查邮箱

5. **完成！** 🎉

---

## 💡 后续增强功能

- [ ] 自动回复短信/邮件
- [ ] CRM系统集成
- [ ] 客户跟进提醒
- [ ] 数据分析报表
- [ ] A/B测试表单
- [ ] 智能线索评分

---

**现在就开始集成邮件服务，开始接收客户咨询吧！** 🚀
