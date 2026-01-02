#!/bin/bash

# 百度主动推送脚本
# 使用方法：
# 1. 在百度站长平台获取推送接口的 token
# 2. 替换下面的 YOUR_TOKEN
# 3. 运行: bash scripts/baidu-push.sh

SITE="zhili.wanli.ai"
TOKEN="YOUR_TOKEN"  # 替换为你的百度站长平台 token

# 要推送的 URL 列表
URLS=(
    "https://zhili.wanli.ai/"
    "https://zhili.wanli.ai/blog/"
    "https://zhili.wanli.ai/blog/posts/build-ai-customer-service-with-gpt4.html"
    "https://zhili.wanli.ai/blog/posts/rag-enterprise-knowledge-base.html"
    "https://zhili.wanli.ai/blog/posts/enterprise-microservices-architecture.html"
    "https://zhili.wanli.ai/blog/posts/prompt-engineering-complete-guide.html"
    "https://zhili.wanli.ai/blog/posts/ai-cost-optimization-guide.html"
    "https://zhili.wanli.ai/blog/posts/education-ai-application-development.html"
    "https://zhili.wanli.ai/blog/posts/enterprise-ai-transformation-guide-2026.html"
    "https://zhili.wanli.ai/blog/posts/beijing-ai-development-company-guide.html"
    "https://zhili.wanli.ai/blog/posts/miniprogram-development-outsourcing-guide.html"
)

echo "开始推送 URL 到百度..."
echo ""

# 将 URL 写入临时文件
TEMP_FILE=$(mktemp)
for url in "${URLS[@]}"; do
    echo "$url" >> "$TEMP_FILE"
done

# 调用百度推送 API
curl -H 'Content-Type:text/plain' --data-binary @"$TEMP_FILE" \
    "http://data.zz.baidu.com/urls?site=${SITE}&token=${TOKEN}"

echo ""
echo ""
echo "推送完成！共推送 ${#URLS[@]} 个 URL"

# 清理临时文件
rm "$TEMP_FILE"
