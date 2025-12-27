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
    const { name, phone, projectType, message, locale } = req.body;

    // Validation
    if (!name || !phone || !projectType) {
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

    if (!webhookUrl) {
      console.error('未配置企业微信Webhook URL');
      // Still return success to avoid breaking user experience
      return res.json({ success: true, message: '表单已接收' });
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

    // Send to WeChat
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wechatMessage),
    });

    const result = await response.json();
    console.log('WeChat response:', result);

    if (result.errcode !== 0) {
      console.error('发送失败:', result);
      // Still return success
      return res.json({ success: true, message: '表单已接收' });
    }

    return res.json({ success: true, message: '提交成功' });
  } catch (error) {
    console.error('Error:', error.message);
    // Return success even on error to avoid breaking UX
    return res.json({ success: true, message: '表单已接收' });
  }
}
