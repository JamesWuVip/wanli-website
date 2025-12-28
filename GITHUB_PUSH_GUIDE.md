# GitHub 推送指南

## 📦 当前状态

✅ **Git 仓库已配置完成**
- 远程仓库: `git@github.com:JamesWuVip/zhili-website.git`
- 本地分支: `main`
- 待推送提交: 4个

## 🔑 推送方法

### 方法 1: 使用 GitHub CLI (推荐)

如果安装了 `gh` 命令行工具:

```bash
# 登录 GitHub
gh auth login

# 推送代码
git push -u origin main
```

### 方法 2: 使用个人访问令牌 (Personal Access Token)

1. **生成令牌**:
   - 访问: https://github.com/settings/tokens
   - 点击 "Generate new token (classic)"
   - 勾选 `repo` 权限
   - 生成并复制令牌

2. **推送代码**:
```bash
# 使用 HTTPS + 令牌
git remote set-url origin https://github.com/JamesWuVip/zhili-website.git
git push -u origin main

# 输入用户名和密码时:
# Username: JamesWuVip
# Password: <粘贴你的个人访问令牌>
```

### 方法 3: 配置 SSH 密钥

1. **生成 SSH 密钥** (如果还没有):
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. **添加到 GitHub**:
```bash
# 复制公钥
cat ~/.ssh/id_ed25519.pub

# 访问 https://github.com/settings/keys
# 点击 "New SSH key" 并粘贴公钥
```

3. **推送代码**:
```bash
git push -u origin main
```

## 📊 待推送的提交

```
0d067579 添加图片优化和 OG 图片生成脚本
d2fc20d1 添加性能优化指南和完善项目配置
a9f12c30 更新SEO监控数据和优化总结报告
230f3278 SEO全面优化: 内容扩充 + 结构化数据 + 性能提升
```

## ✅ 推送后操作

推送成功后:
1. 访问 https://github.com/JamesWuVip/zhili-website 查看代码
2. Vercel 会自动检测到更新并部署
3. 等待 2-3 分钟后访问 https://zhili.wanli.ai 查看效果

## 🔧 故障排除

### 问题 1: Permission denied
```bash
# 检查 SSH 配置
ssh -T git@github.com
```

### 问题 2: Authentication failed
```bash
# 使用 HTTPS 并输入令牌
git remote set-url origin https://github.com/JamesWuVip/zhili-website.git
```

---

**提示**: 推荐使用方法 2 (个人访问令牌)，最简单快速！
