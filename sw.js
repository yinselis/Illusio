// 版本号：随意写，反正不会缓存
const VERSION = 'v-online-only';

// 安装阶段：强制跳过等待，立刻接管（保证不卡旧版）
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// 激活阶段：立刻接管页面，清理任何可能存在的乱七八糟旧缓存
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => caches.delete(cacheName))
            );
        }).then(() => self.clients.claim())
    );
});

// 核心：拦截请求阶段（必须有这个函数才能被识别为 PWA）
self.addEventListener('fetch', (event) => {
    // 【什么都不做】！
    // 绝不使用 caches.match() 拦截
    // 浏览器会自动穿透这个空方法，直接向你的 Git 服务器发起网络请求拉取最新数据。
    return; 
});