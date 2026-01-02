# 自动发布脚本

使用 Playwright 自动发布文章到 CSDN 和知乎。

## 使用步骤

### 1. CSDN 发布

```bash
# 第一步：登录（只需执行一次）
node scripts/auto-publish/login-csdn.cjs

# 第二步：发布文章
node scripts/auto-publish/publish-csdn.cjs
```

### 2. 知乎发布

```bash
# 第一步：登录（只需执行一次）
node scripts/auto-publish/login-zhihu.cjs

# 第二步：发布回答
node scripts/auto-publish/publish-zhihu.cjs
```

## 文件说明

```
scripts/auto-publish/
├── README.md                 # 本说明文件
├── login-csdn.cjs           # CSDN 登录脚本
├── publish-csdn.cjs         # CSDN 发布脚本
├── login-zhihu.cjs          # 知乎登录脚本
├── publish-zhihu.cjs        # 知乎发布脚本
├── csdn-auth.json           # CSDN 登录状态（自动生成）
└── zhihu-auth.json          # 知乎登录状态（自动生成）
```

## 注意事项

1. **登录状态**：登录脚本会打开浏览器，手动完成登录后按回车保存状态
2. **发布间隔**：脚本设置了发布间隔（CSDN 1分钟，知乎 2分钟），避免被限流
3. **非 headless**：脚本使用可视化模式运行，方便观察和调试
4. **错误处理**：如果发布失败，会截图保存错误状态

## 待发布内容

### CSDN 文章（4篇）
- `content/csdn/01-rag-enterprise-knowledge-base.md`
- `content/csdn/02-prompt-engineering-guide.md`
- `content/csdn/03-ai-cost-optimization.md`
- `content/csdn/04-gpt4-customer-service.md`

### 知乎回答（3个）
- 如何使用GPT-4开发智能客服系统？
- 企业如何搭建RAG知识库？
- 小程序开发外包如何避坑？

## 故障排除

### 登录状态过期
重新运行登录脚本即可。

### 发布失败
1. 检查网络连接
2. 查看截图了解错误原因
3. 可能是页面结构变化，需要更新选择器
