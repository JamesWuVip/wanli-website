import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 10; // 最大执行时间10秒

interface ConsultationData {
  name: string;
  phone: string;
  projectType: string;
  message: string;
  locale: string;
}

// 项目类型映射
const PROJECT_TYPE_MAP: Record<string, string> = {
  ai: 'AI应用开发',
  enterprise: '企业管理系统',
  web: '网站开发',
  mobile: '移动应用',
  consulting: '技术咨询',
  other: '其他',
};

export async function POST(request: NextRequest) {
  console.log('[API] Consultation form submission started');

  try {
    const data: ConsultationData = await request.json();
    console.log('[API] Received data:', { ...data, phone: '***' });

    // 验证必填字段
    if (!data.name || !data.phone || !data.projectType) {
      console.log('[API] Validation failed: missing required fields');
      return NextResponse.json(
        { error: '缺少必填字段' },
        { status: 400 }
      );
    }

    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(data.phone)) {
      console.log('[API] Validation failed: invalid phone number');
      return NextResponse.json(
        { error: '手机号格式不正确' },
        { status: 400 }
      );
    }

    const projectTypeName = PROJECT_TYPE_MAP[data.projectType] || data.projectType;
    const currentTime = new Date().toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
    });

    // 企业微信机器人Webhook URL（从环境变量读取）
    const webhookUrl = process.env.WECHAT_WEBHOOK_URL;
    console.log('[API] Webhook URL configured:', webhookUrl ? 'Yes' : 'No');

    if (!webhookUrl) {
      console.error('[API] 未配置企业微信Webhook URL');
      // 即使webhook未配置，也返回成功，避免影响用户体验
      return NextResponse.json({ success: true });
    }

    // 构建企业微信消息
    const message = {
      msgtype: 'markdown',
      markdown: {
        content: `## 📋 新客户咨询
> **来源：** 智理科技官网

**👤 客户姓名：** <font color="info">${data.name}</font>
**📱 联系电话：** <font color="warning">${data.phone}</font>
**💼 项目类型：** ${projectTypeName}
**📝 需求描述：** ${data.message || '暂无'}
**🌐 语言环境：** ${data.locale}
**⏰ 提交时间：** ${currentTime}

> 请尽快联系客户！`,
      },
    };

    console.log('[API] Sending to WeChat webhook...');

    // 发送到企业微信
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const responseText = await response.text();
    console.log('[API] WeChat response status:', response.status);
    console.log('[API] WeChat response:', responseText);

    if (!response.ok) {
      console.error('[API] 企业微信通知发送失败:', responseText);
      // 即使发送失败，也返回成功，避免影响用户体验
    } else {
      console.log('[API] WeChat notification sent successfully');
    }

    // 这里可以添加邮件发送逻辑
    // await sendEmail(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] 处理咨询表单失败:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}
