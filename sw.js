const C='realfarm-v27';
const CORE=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(/googleapis\.com|firebaseapp\.com|google\.com|firebaseio\.com/.test(u.hostname)||u.pathname.startsWith('/__/'))return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{});return res}).catch(()=>r)))});
