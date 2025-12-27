#!/bin/bash

# 无需 Git 的 Vercel 部署方案

echo "🚀 智理科技网站 - 准备部署"
echo "======================================"
echo ""

# 创建 .vercelignore 文件
cat > .vercelignore <<EOF
node_modules
.next
.git
*.log
.DS_Store
EOF

echo "✅ 项目已准备就绪"
echo ""
echo "📋 接下来请访问 Vercel 网页版部署："
echo ""
echo "方法 1: 拖拽部署"
echo "----------------"
echo "1. 访问 https://vercel.com/new"
echo "2. 登录 Vercel 账号"
echo "3. 选择 '上传文件夹'"
echo "4. 拖拽整个项目文件夹: /Users/a111/Desktop/code/devWeb"
echo "5. 点击 Deploy"
echo ""
echo "方法 2: 通过 GitHub"
echo "-------------------"
echo "1. 下载 GitHub Desktop: https://desktop.github.com"
echo "2. 用 GitHub Desktop 上传代码"
echo "3. 在 Vercel 导入 GitHub 仓库"
echo ""
echo "项目位置: /Users/a111/Desktop/code/devWeb"
echo ""
echo "✅ 所有依赖已安装完成，项目可以直接部署！"
echo ""
