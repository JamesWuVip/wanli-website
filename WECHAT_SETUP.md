# 企业微信机器人配置指南

## 📱 如何获取企业微信机器人Webhook URL

### 步骤1：创建企业微信群

1. 打开**企业微信**（PC端或网页版）
2. 创建一个新群聊，命名为"智理科技-客户咨询通知"（或其他名称）
3. 邀请需要接收通知的团队成员

### 步骤2：添加群机器人

1. 在群聊中，点击右上角的 **...** （更多）
2. 选择 **群机器人** -> **添加机器人**
3. 输入机器人名称，例如："客户咨询助手"
4. 点击 **添加**

### 步骤3：获取Webhook地址

1. 创建成功后，会显示机器人的Webhook地址
2. 格式类似：`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
3. **复制这个完整的URL**

### 步骤4：配置到项目中

1. 在项目根目录创建 `.env.local` 文件（如果不存在）

```bash
cp .env.local.example .env.local
```

2. 编辑 `.env.local` 文件，将Webhook URL粘贴进去

```env
WECHAT_WEBHOOK_URL=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=你的key
```

3. 保存文件

### 步骤5：重启开发服务器

```bash
# 停止当前服务器（Ctrl+C）
# 重新启动
npm run dev
```

## ✅ 测试通知

1. 访问网站的咨询表单
2. 填写测试信息并提交
3. 检查企业微信群是否收到通知

## 📋 收到的通知格式

提交表单后，企业微信群会收到如下格式的消息：

```
## 📋 新客户咨询
> 来源：智理科技官网

👤 客户姓名：张三
📱 联系电话：138-1179-6300
💼 项目类型：AI应用开发
📝 需求描述：需要开发智能客服系统...
🌐 语言环境：zh-CN
⏰ 提交时间：2025-12-27 15:30:25

> 请尽快联系客户！
```

## 🔒 安全提示

1. **.env.local 文件已在 .gitignore 中**，不会被提交到Git仓库
2. **不要将Webhook URL分享给外部人员**
3. 如果URL泄露，可在企业微信中删除机器人并重新创建

## 🚀 部署到生产环境

### Vercel部署

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入项目设置 -> **Environment Variables**
3. 添加环境变量：
   - Name: `WECHAT_WEBHOOK_URL`
   - Value: 你的Webhook地址
4. 重新部署项目

### 其他平台

根据部署平台的文档，添加环境变量配置。

## ❓ 常见问题

### Q: 提交表单后没有收到通知？

A: 检查以下几点：
1. `.env.local` 文件是否正确配置
2. Webhook URL是否完整（包含key参数）
3. 开发服务器是否重启
4. 查看浏览器控制台是否有错误

### Q: 机器人发送失败？

A:
1. 确认Webhook URL是否正确
2. 检查企业微信群是否还存在
3. 机器人是否被删除

### Q: 想修改通知格式？

A: 编辑 `app/api/consultation/route.ts` 文件中的消息模板

## 📞 后续扩展

可以添加更多通知渠道：
- 邮件通知（发送到 wuning@wanli.ai）
- 短信通知
- 钉钉机器人
- Slack通知

需要帮助可以随时咨询！
