self.importScripts('data/courses.js');

// Files to cache
var cacheName = 'pwa-v1';
var appShellFiles = [
  '/progressivep-web-app/',
  '/progressivep-web-app/index.html',
  '/progressivep-web-app/users.html',
  '/progressivep-web-app/style.css',
  '/progressivep-web-app/data/courses.js',
  '/progressivep-web-app/data/img/',
  '/progressivep-web-app/img/logo.png',
  '/progressivep-web-app/img/instagram.png',
  '/progressivep-web-app/img/twitter.png', 
];
var coursesImages = [];
for(var i=0; i<courses.length; i++) {
  coursesImages.push('data/img/'+courses[i].slug+'.png');
}
var contentToCache = appShellFiles.concat(coursesImages);

// Installing Service Worker
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: ' + e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
