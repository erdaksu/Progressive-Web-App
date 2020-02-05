self.importScripts('data/courses.js');

// Files to cache
var cacheName = 'Progressive-Web-App-v1';
var appShellFiles = [
  '/Progressive-Web-App/',
  '/Progressive-Web-App/index.html',
  '/Progressive-Web-App/courses.html',
  '/Progressive-Web-App/users.html',
  '/Progressive-Web-App/style.css',
  '/Progressive-Web-App/data/courses.js',
  '/Progressive-Web-App/img/logo.png',
  '/Progressive-Web-App/icons/icon-32.png',
  '/Progressive-Web-App/icons/icon-64.png',
  '/Progressive-Web-App/icons/icon-96.png',
  '/Progressive-Web-App/icons/icon-128.png',
  '/Progressive-Web-App/icons/icon-168.png',
  '/Progressive-Web-App/icons/icon-192.png',
  '/Progressive-Web-App/icons/icon-256.png',
  '/Progressive-Web-App/icons/icon-512.png'
];
var coursesImages = [];
for (var i = 0; i < courses.length; i++) {
  coursesImages.push('data/img/' + courses[i].slug + '.png');
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



