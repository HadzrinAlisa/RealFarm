const C='realfarm-v32';
const CORE=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);
 if(/googleapis\.com|firebaseapp\.com|google\.com|firebaseio\.com/.test(u.hostname)||u.pathname.startsWith('/__/'))return;
 const page=q.mode==='navigate'||(u.origin===location.origin&&(u.pathname.endsWith('/')||u.pathname.endsWith('.html')||u.pathname.endsWith('.json')));
 if(page){e.respondWith(fetch(q,{cache:'no-store'}).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(q,cp)).catch(()=>{});return res}).catch(()=>caches.match(q).then(r=>r||caches.match('./index.html'))));return}
 e.respondWith(caches.match(q).then(r=>r||fetch(q).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(q,cp)).catch(()=>{});return res})))});
