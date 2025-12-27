#!/bin/bash

# 智理科技网站 - 完整自动化部署脚本
# 运行前提：已安装 Node.js
# 使用方法: chmod +x setup-and-deploy.sh && ./setup-and-deploy.sh

set -e  # 遇到错误立即退出

echo "🚀 智理科技网站 - 自动化部署"
echo "=================================="
echo ""

# 步骤 1: 检查 Node.js
echo "📋 步骤 1/6: 检查 Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装！"
    echo ""
    echo "请先安装 Node.js："
    echo "1. 访问 https://nodejs.org/"
    echo "2. 下载并安装 LTS 版本"
    echo "3. 安装完成后重新运行此脚本"
    exit 1
fi

NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
echo "✅ Node.js $NODE_VERSION"
echo "✅ npm $NPM_VERSION"
echo ""

# 步骤 2: 安装项目依赖
echo "📋 步骤 2/6: 安装项目依赖..."
npm install
echo "✅ 依赖安装完成"
echo ""

# 步骤 3: 检查 Git
echo "📋 步骤 3/6: 检查 Git..."
if ! command -v git &> /dev/null; then
    echo "⚠️  Git 未安装，正在安装 Xcode 命令行工具..."
    xcode-select --install
    echo "请完成 Xcode 命令行工具安装后重新运行此脚本"
    exit 1
fi
echo "✅ Git 已安装"
echo ""

# 步骤 4: 初始化 Git 仓库
echo "📋 步骤 4/6: 初始化 Git 仓库..."
if [ ! -d .git ]; then
    git init
    git add .
    git commit -m "Initial commit: Zhili Tech website"
    echo "✅ Git 仓库初始化完成"
else
    echo "✅ Git 仓库已存在"
fi
echo ""

# 步骤 5: 安装并登录 Vercel CLI
echo "📋 步骤 5/6: 安装 Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "正在安装 Vercel CLI..."
    npm install -g vercel
    echo "✅ Vercel CLI 安装完成"
else
    echo "✅ Vercel CLI 已安装"
fi
echo ""

echo "📋 步骤 6/6: 登录 Vercel 并部署..."
echo ""
echo "🔐 即将打开浏览器进行 Vercel 登录..."
echo "请在浏览器中完成登录授权"
echo ""
read -p "按 Enter 键继续..."

# 登录 Vercel
vercel login

echo ""
echo "🚀 开始部署到 Vercel..."
echo ""

# 部署项目
vercel --prod

echo ""
echo "=================================="
echo "✅ 部署完成！"
echo ""
echo "🎉 你的网站已上线！"
echo ""
echo "📋 下一步："
echo "1. 访问 Vercel 控制台查看网站地址"
echo "2. 集成表单邮件服务（查看 FORM_INTEGRATION.md）"
echo "3. 配置 SEO（查看 START_HERE.md）"
echo "4. 开始推广获客！"
echo ""
echo "🆘 需要帮助？查看文档："
echo "   - VERCEL_DEPLOY.md"
echo "   - DEPLOYMENT_CHECKLIST.md"
echo "   - CUSTOMER_ACQUISITION.md"
echo ""
