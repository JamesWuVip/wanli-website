#!/bin/bash
# 360搜索 - URL主动推送脚本
# 使用方法: bash 360-push.sh

SITE="https://zhili.wanli.ai"
# TODO: 从360站长平台获取token后替换这里
TOKEN="YOUR_360_TOKEN_HERE"

echo "⚠️  注意: 请先完成以下步骤："
echo "   1. 注册360站长平台: https://zhanzhang.so.com"
echo "   2. 验证网站所有权"
echo "   3. 获取推送Token"
echo "   4. 将上面的 YOUR_360_TOKEN_HERE 替换为实际Token"
echo ""

if [ "$TOKEN" = "YOUR_360_TOKEN_HERE" ]; then
  echo "❌ 错误: 请先配置360站长平台Token"
  exit 1
fi

# 创建临时URL列表文件
cat > urls-360.txt <<EOF
https://zhili.wanli.ai/
https://zhili.wanli.ai/#services
https://zhili.wanli.ai/#cases
https://zhili.wanli.ai/#about
https://zhili.wanli.ai/#faq
https://zhili.wanli.ai/#contact
https://zhili.wanli.ai/blog/
EOF

echo "🚀 开始推送URL到360搜索..."
echo "📍 站点: $SITE"
echo "📄 推送URL数量: $(wc -l < urls-360.txt)"
echo ""

# 执行推送（360的API地址需要根据实际文档调整）
response=$(curl -H 'Content-Type:text/plain' \
  --data-binary @urls-360.txt \
  "http://data.zhanzhang.so.com/push?site=$SITE&token=$TOKEN" \
  2>/dev/null)

echo "📊 推送结果:"
echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
echo ""

# 解析结果
if echo "$response" | grep -q "success"; then
  success=$(echo "$response" | grep -o '"success":[0-9]*' | cut -d':' -f2)
  echo "✅ 成功推送: $success 个URL"
else
  echo "⚠️  推送可能失败,请检查返回结果"
fi

# 清理临时文件
rm -f urls-360.txt

echo ""
echo "💡 提示:"
echo "  - 推送成功的URL会在1-7天内被360搜索抓取"
echo "  - 每日推送配额有限,建议只推送新增或更新的页面"
echo "  - 登录360站长平台查看详细状态: https://zhanzhang.so.com"
