let cacheName = "cache_v1";
let url ="https://aravindvattappallil.github.io/Lab2"

//network with cash fallback
self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request)
        .catch(function () {
        return caches.match(event.request);
        })
    );
});

//installing 
self.addEventListener('install',(   )=>{
    console.log("Installing...")
    self.skipWaiting();
    caches.open(cacheName).then((cache)=>{
        return cache.addAll([
            `${url}`,
            `${url}/index.html`,
            `${url}/manifest.json`,
            `${url}/script.js`,
            `${url}/icon/icon.png`,
            `${url}/css/style.css`,
            `${url}/favicon_package/android-chrome-192x192.png`,
            `${url}/favicon_package/android-chrome-512x512.png`

        ]);
    }).catch((error)=>{
        console.error("failed")
    })
    
});

// claim control
self.addEventListener('activate',(event)=>{
    event.waitUntil(clients.claim());

    event.waitUntil(caches.keys().then(function(cacheNames){
        return Promise.all(cacheNames.filter(item => item !== cacheName).map(item =>caches.delete(item))
        );
        
    }));

});
