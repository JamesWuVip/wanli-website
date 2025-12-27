#!/bin/bash

# 智理科技网站 - 快速部署脚本
# 使用方法: ./deploy.sh

echo "🚀 智理科技网站 - Vercel 部署脚本"
echo "=================================="
echo ""

# 检查 git 是否已初始化
if [ ! -d .git ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit: Zhili Tech website"
    echo "✅ Git 仓库初始化完成"
    echo ""
else
    echo "✅ Git 仓库已存在"
    echo ""
fi

# 提示设置 GitHub 远程仓库
echo "📋 请按以下步骤操作："
echo ""
echo "1. 访问 https://github.com/new"
echo "2. 创建新仓库，名称建议: zhili-tech-website"
echo "3. 设置为 Private（私有）"
echo "4. 不要勾选任何初始化选项"
echo "5. 创建完成后，复制仓库 URL"
echo ""
read -p "请输入 GitHub 仓库 URL (例如: https://github.com/username/zhili-tech-website.git): " repo_url

if [ -z "$repo_url" ]; then
    echo "❌ 未输入仓库 URL，退出部署"
    exit 1
fi

# 添加远程仓库
echo ""
echo "📡 添加远程仓库..."
git remote remove origin 2>/dev/null
git remote add origin "$repo_url"
git branch -M main

# 推送到 GitHub
echo "⬆️  推送代码到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 代码已成功推送到 GitHub！"
    echo ""
    echo "🎯 下一步：部署到 Vercel"
    echo "=================================="
    echo ""
    echo "1. 访问 https://vercel.com"
    echo "2. 使用 GitHub 账号登录"
    echo "3. 点击 'Add New...' → 'Project'"
    echo "4. 选择 'zhili-tech-website' 仓库"
    echo "5. 点击 'Import'"
    echo "6. 点击 'Deploy'"
    echo ""
    echo "⏱️  等待 2-3 分钟，部署完成！"
    echo ""
    echo "🌐 你的网站将在这里："
    echo "   https://zhili-tech-website.vercel.app"
    echo ""
    echo "📚 详细说明请查看："
    echo "   - VERCEL_DEPLOY.md"
    echo "   - DEPLOYMENT_OPTIONS.md"
    echo ""
else
    echo ""
    echo "❌ 推送失败，请检查："
    echo "   - GitHub 仓库 URL 是否正确"
    echo "   - 是否已登录 GitHub"
    echo "   - 网络连接是否正常"
    echo ""
    echo "💡 手动推送命令："
    echo "   git remote add origin $repo_url"
    echo "   git push -u origin main"
    echo ""
fi
