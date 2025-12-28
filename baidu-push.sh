#!/bin/bash
# 百度搜索资源平台 - URL主动推送脚本
# 使用方法: bash baidu-push.sh

SITE="https://zhili.wanli.ai"
TOKEN="YbBBzZUIw4NtcxJv"

# 创建临时URL列表文件
cat > urls.txt <<EOF
https://zhili.wanli.ai/
https://zhili.wanli.ai/#services
https://zhili.wanli.ai/#cases
https://zhili.wanli.ai/#about
https://zhili.wanli.ai/#faq
https://zhili.wanli.ai/#contact
EOF

echo "🚀 开始推送URL到百度搜索资源平台..."
echo "📍 站点: $SITE"
echo "📄 推送URL数量: $(wc -l < urls.txt)"
echo ""

# 执行推送
response=$(curl -H 'Content-Type:text/plain' \
  --data-binary @urls.txt \
  "http://data.zz.baidu.com/urls?site=$SITE&token=$TOKEN" \
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
rm -f urls.txt

echo ""
echo "💡 提示:"
echo "  - 推送成功的URL会在1-7天内被百度抓取"
echo "  - 每日推送配额有限,建议只推送新增或更新的页面"
echo "  - 登录百度搜索资源平台查看详细状态: https://ziyuan.baidu.com/"
