let cacheName = "cache_v1";
let url ="https://aravindvattappallil.github.io/pwalab4"

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


//Notification 

self.addEventListener('notificationclick', (event) => {
    const action = event.action;
    const notification = event.notification;
  
    switch (action) {
      case 'confirm':
        console.log('Confirmed!!!');
        const feedbackc= document.getElementById('feedback')
        const msggc = document.createElement('p')
        msgg.innerText="So we both agree on that!"
      
      feedback.appendChild(msggc)
       
        break;
  
      case 'cancel':
        console.log('Cancelled.');
        const feedback= document.getElementById('feedback')
    const msgg = document.createElement('p')
    msgg.innerText="Let's agree to disagree."
  
  feedback.appendChild(msgg)
       
        break;
  

    }
  });