# 📦 安装 GitHub MCP 服务器指南

GitHub MCP (Model Context Protocol) 可以让 Claude 直接与 GitHub 交互，帮你管理仓库、创建 PR、部署等。

## 前置要求

1. **Node.js** (必需)
2. **GitHub 账号**
3. **GitHub Personal Access Token**

---

## 步骤 1: 安装 Node.js

如果还没有安装 Node.js：

1. 访问 https://nodejs.org/
2. 下载 LTS 版本
3. 安装完成后验证：
   ```bash
   node --version
   npm --version
   ```

---

## 步骤 2: 安装 GitHub MCP 服务器

```bash
# 全局安装
npm install -g @modelcontextprotocol/server-github

# 或者使用 npx 运行（无需全局安装）
npx @modelcontextprotocol/server-github
```

---

## 步骤 3: 创建 GitHub Personal Access Token

1. **访问 GitHub Settings**
   - 登录 GitHub
   - 点击右上角头像 → Settings
   - 左侧菜单 → Developer settings
   - Personal access tokens → Tokens (classic)

2. **生成新 Token**
   - 点击 "Generate new token" → "Generate new token (classic)"
   - Note: `Claude GitHub MCP`
   - Expiration: 选择有效期（建议 90 days）

3. **选择权限** (scopes)：
   - ✅ `repo` (完整仓库访问)
   - ✅ `workflow` (GitHub Actions)
   - ✅ `admin:org` (如果需要管理组织)
   - ✅ `user` (用户信息)

4. **生成并保存 Token**
   - 点击 "Generate token"
   - **立即复制保存！** (只显示一次)

---

## 步骤 4: 配置 Claude Code

### 方法 A: 使用环境变量

```bash
# 添加到 ~/.zshrc 或 ~/.bash_profile
export GITHUB_PERSONAL_ACCESS_TOKEN="your_token_here"

# 重新加载配置
source ~/.zshrc  # 如果使用 zsh
# 或
source ~/.bash_profile  # 如果使用 bash
```

### 方法 B: 配置 Claude Code MCP 设置

在 Claude Code 配置文件中添加 GitHub MCP 服务器。

**配置文件位置：**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- VS Code: `.claude/config.json`

**添加配置：**
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

---

## 步骤 5: 验证安装

重启 Claude Code，然后我就可以：

✅ 创建 GitHub 仓库
✅ 推送代码
✅ 创建分支
✅ 提交 Pull Request
✅ 管理 Issues
✅ 查看仓库信息

---

## 快速部署你的网站

一旦 GitHub MCP 配置完成，我可以帮你：

1. **自动创建 GitHub 仓库**
2. **推送代码到 GitHub**
3. **在 Vercel 上自动部署**

全程只需要几个命令！

---

## 故障排查

### Q: Token 权限不足？
A: 确保选择了 `repo` 和 `workflow` 权限

### Q: 环境变量不生效？
A: 重启终端或重新加载配置文件

### Q: npx 命令找不到？
A: 确保已安装 Node.js，npm 会随 Node.js 一起安装

### Q: MCP 服务器连接失败？
A: 检查 token 是否正确配置在环境变量中

---

## 替代方案：不使用 MCP

如果不想安装 MCP，你仍然可以：

### 方案 1: 使用 GitHub Desktop（图形界面）
- 下载：https://desktop.github.com/
- 简单拖拽即可上传代码

### 方案 2: 使用命令行 Git
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

### 方案 3: 使用 Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

---

## 下一步

选择一个方案开始部署：

1. **最专业**: 安装 GitHub MCP → 自动化部署
2. **最简单**: 使用 GitHub Desktop → 手动部署
3. **最快速**: 使用 Vercel CLI → 直接部署

**准备好了吗？告诉我你选择哪个方案！** 🚀
