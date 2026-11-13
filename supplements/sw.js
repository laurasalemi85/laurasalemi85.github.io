const C="supps-v6";const FILES=["./","./index.html","./manifest.webmanifest","./icon-180.png","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const same=new URL(e.request.url).origin===location.origin;
 const save=res=>{if(res.ok&&same){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res};
 if(e.request.mode==="navigate"||e.request.destination==="document"){e.respondWith(fetch(e.request,{cache:"no-store"}).then(save).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("./index.html"))));return}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>{const net=fetch(e.request).then(save).catch(()=>r);return r||net}))});
