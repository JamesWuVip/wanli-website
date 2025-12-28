/**
 * 社交分享优化
 * 添加一键分享到微信、微博、LinkedIn等平台
 */

const fs = require('fs');
const path = require('path');

const shareButtonsHTML = `
<!-- 社交分享按钮 -->
<div class="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-3" id="shareButtons">
    <!-- 分享到微博 -->
    <button onclick="shareToWeibo()"
            class="w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
            title="分享到微博">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.6 12c-.4 0-.7.2-.8.5-.1.4 0 .7.3.9.4.2.8.2 1.1-.1.2-.3.2-.7 0-1-.2-.2-.4-.3-.6-.3zm2.7-1.1c-.2 0-.3.1-.4.2 0 .2 0 .3.2.4.2.1.3.1.5 0 .1-.1.1-.3 0-.4-.1-.1-.2-.2-.3-.2zm5.4 7c-1.6 1.2-3.8 1.5-5.7 1.1-1.9-.4-3.6-1.5-4.6-3.1-1-1.6-1.2-3.7-.5-5.5.7-1.8 2.3-3.2 4.2-3.7 1.9-.5 4-.1 5.5 1.1 1.6 1.2 2.4 3.1 2.2 5-.2 1.9-1.2 3.7-2.6 4.8l.5.3zm-5.6-7.6c-2.6-.3-4.9 1.3-5.3 3.5-.4 2.2 1.4 4.3 4 4.7 2.6.4 5-1.1 5.4-3.4.4-2.2-1.4-4.4-4.1-4.8z"/>
        </svg>
    </button>

    <!-- 复制链接 -->
    <button onclick="copyLink()"
            class="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
            title="复制链接">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
    </button>

    <!-- 微信分享（显示二维码） -->
    <button onclick="shareToWechat()"
            class="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
            title="分享到微信">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.5 12c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm7 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-1.21 0-2.34-.27-3.37-.75-.7.43-2.26 1.18-4.08 1.45.58-.85 1.12-2.15 1.35-3.22C4.42 15.78 3.5 14 3.5 12c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z"/>
        </svg>
    </button>
</div>

<!-- 微信分享二维码弹窗 -->
<div id="wechatModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-sm mx-4">
        <div class="text-center mb-4">
            <h3 class="text-xl font-bold text-gray-900">微信扫码分享</h3>
            <p class="text-sm text-gray-600 mt-2">请使用微信扫描二维码</p>
        </div>
        <div id="qrcodeContainer" class="flex justify-center mb-4"></div>
        <button onclick="closeWechatModal()"
                class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded">
            关闭
        </button>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
<script>
// 分享到微博
function shareToWeibo() {
    const url = window.location.href;
    const title = document.querySelector('meta[property="og:title"]').content;
    const pic = document.querySelector('meta[property="og:image"]').content;

    const weiboUrl = \`https://service.weibo.com/share/share.php?url=\${encodeURIComponent(url)}&title=\${encodeURIComponent(title)}&pic=\${encodeURIComponent(pic)}\`;
    window.open(weiboUrl, '_blank', 'width=600,height=400');
}

// 复制链接
function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showToast('✅ 链接已复制到剪贴板');
    }).catch(() => {
        // 降级方案
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast('✅ 链接已复制到剪贴板');
    });
}

// 分享到微信（显示二维码）
let qrcodeGenerated = false;
function shareToWechat() {
    const modal = document.getElementById('wechatModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    if (!qrcodeGenerated) {
        const container = document.getElementById('qrcodeContainer');
        container.innerHTML = ''; // 清空
        new QRCode(container, {
            text: window.location.href,
            width: 256,
            height: 256
        });
        qrcodeGenerated = true;
    }
}

function closeWechatModal() {
    const modal = document.getElementById('wechatModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Toast提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
}

// 滚动时隐藏/显示分享按钮
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const buttons = document.getElementById('shareButtons');

    if (currentScroll > 200) {
        if (currentScroll > lastScroll) {
            buttons.style.opacity = '0.3';
        } else {
            buttons.style.opacity = '1';
        }
    } else {
        buttons.style.opacity = '1';
    }

    lastScroll = currentScroll;
});
</script>
`;

// 读取所有博客文章HTML
const postsDir = path.join(__dirname, '../public-site/blog/posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.html'));

console.log('🔗 添加社交分享按钮...\n');

files.forEach(file => {
  const htmlPath = path.join(postsDir, file);
  let html = fs.readFileSync(htmlPath, 'utf-8');

  // 检查是否已经有分享按钮
  if (html.includes('id="shareButtons"')) {
    console.log(`⏭️  跳过: ${file} (已有分享按钮)`);
    return;
  }

  // 在</body>前插入分享按钮
  html = html.replace('</body>', shareButtonsHTML + '\n</body>');

  fs.writeFileSync(htmlPath, html);
  console.log(`✅ ${file}`);
});

console.log('\n✨ 社交分享按钮添加完成！\n');
