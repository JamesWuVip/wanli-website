// Vercel Serverless Function for handling consultation form submissions
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== API调用开始 ===');
    console.log('Request method:', req.method);
    console.log('Request body:', JSON.stringify(req.body));

    const { name, phone, projectType, message, locale } = req.body;

    // Validation
    if (!name || !phone || !projectType) {
      console.error('验证失败: 缺少必填字段');
      return res.status(400).json({ error: '缺少必填字段' });
    }

    const PROJECT_TYPE_MAP = {
      ai: 'AI应用开发',
      enterprise: '企业管理系统',
      web: '网站开发',
      mobile: '移动应用',
      consulting: '技术咨询',
      other: '其他',
    };

    const projectTypeName = PROJECT_TYPE_MAP[projectType] || projectType;
    const currentTime = new Date().toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
    });

    // WeChat Webhook URL
    const webhookUrl = process.env.WECHAT_WEBHOOK_URL;
    console.log('环境变量检查:');
    console.log('- WECHAT_WEBHOOK_URL存在:', !!webhookUrl);
    console.log('- WECHAT_WEBHOOK_URL长度:', webhookUrl ? webhookUrl.length : 0);
    console.log('- WECHAT_WEBHOOK_URL前50字符:', webhookUrl ? webhookUrl.substring(0, 50) : 'undefined');

    if (!webhookUrl) {
      console.error('❌ 未配置企业微信Webhook URL');
      // Still return success to avoid breaking user experience
      return res.json({ success: true, message: '表单已接收（未配置webhook）' });
    }

    const wechatMessage = {
      msgtype: 'markdown',
      markdown: {
        content: `## 📋 新客户咨询
> **来源：** 智理科技官网

**👤 客户姓名：** <font color="info">${name}</font>
**📱 联系电话：** <font color="warning">${phone}</font>
**💼 项目类型：** ${projectTypeName}
**📝 需求描述：** ${message || '暂无'}
**🌐 语言环境：** ${locale || 'zh-CN'}
**⏰ 提交时间：** ${currentTime}

> 请尽快联系客户！`,
      },
    };

    console.log('准备发送企业微信消息...');
    console.log('消息内容:', JSON.stringify(wechatMessage, null, 2));

    // Send to WeChat
    console.log('⏳ 开始调用企业微信webhook...');
    const fetchStartTime = Date.now();

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wechatMessage),
    });

    const fetchDuration = Date.now() - fetchStartTime;
    console.log(`✓ Fetch完成 (耗时: ${fetchDuration}ms)`);
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    const result = await response.json();
    console.log('✓ 企业微信响应:', JSON.stringify(result));

    if (result.errcode !== 0) {
      console.error('❌ 企业微信返回错误:', result);
      return res.json({ success: true, message: '表单已接收（发送失败）', debug: result });
    }

    console.log('✅ 消息发送成功!');
    return res.json({ success: true, message: '提交成功', wechatResult: result });
  } catch (error) {
    console.error('❌ 异常捕获:');
    console.error('- 错误消息:', error.message);
    console.error('- 错误堆栈:', error.stack);
    console.error('- 错误类型:', error.name);
    // Return success even on error to avoid breaking UX
    return res.json({ success: true, message: '表单已接收（异常）', error: error.message });
  }
}
