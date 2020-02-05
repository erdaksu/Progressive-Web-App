var courses = [
	{
		slug: 'mathshendon',
		topic: 'Maths Classes',
		location: 'Hendon',
		price: '£100',
	},
	{
		slug: 'mathscolindale',
		topic: 'Maths Classes',
		location: 'Colindale',
		price: '£110',
	},
	{
		slug: 'mathsbrentcross',
		topic: 'Maths Classes',
		location: 'BrentCross',
		price: '£90',
	},
	{
		slug: 'mathsgoldersgreen',
		topic: 'Maths Classes',
		location: 'GoldersGreen',
		price: '£80',
	},

	{
		slug: 'englishhendon',
		topic: 'English Classes',
		location: 'Hendon',
		price: '£70',
	},
	{
		slug: 'englishcolindale',
		topic: 'English Classes',
		location: 'Colindale',
		price: '£70',
	},
	{
		slug: 'englishbrentcross',
		topic: 'English Classes',
		location: 'BrentCross',
		price: '£90',
	},
	{
		slug: 'englishgoldersgreen',
		topic: 'English Classes',
		location: 'GoldersGreen',
		price: '£80',
	},

	{
		slug: 'sciencehendon',
		topic: 'Science Classes',
		location: 'Hendon',
		price: '£90',
	},
	{
		slug: 'sciencecolindale',
		topic: 'Science Classes',
		location: 'Colindale',
		price: '£70',
	},
	{
		slug: 'sciencebrentcross',
		topic: 'Science Classes',
		location: 'BrentCross',
		price: '£70',
	},
	{
		slug: 'sciencegoldersgreen',
		topic: 'Science Classes',
		location: 'GoldersGreen',
		price: '£80',
	},

	{
		slug: 'sportshendon',
		topic: 'Sports Classes',
		location: 'Hendon',
		price: '£50',
	},
	{
		slug: 'sportscolindale',
		topic: 'Sports Classes',
		location: 'Colindale',
		price: '£35',
	},
	{
		slug: 'sportsbrentcross',
		topic: 'Sports Classes',
		location: 'BrentCross',
		price: '£40',
	},
	{
		slug: 'sportsgoldersgreen',
		topic: 'Sports Classes',
		location: 'GoldersGreen',
		price: '£50',
	},
]; ///testing

// Files to cache
var cacheName = 'Progressive-Web-App-v1';
var appShellFiles = [
  'index.html',
  'courses.html',
  'users.html',
  'style.css',
  'data/courses.js',
  'img/logo.png',
  'icons/icon-32.png',
  'icons/icon-64.png',
  'icons/icon-96.png',
  'icons/icon-128.png',
  'icons/icon-168.png',
  'icons/icon-192.png',
  'icons/icon-256.png',
  'icons/icon-512.png'
];
var coursesImages = [];
for (var i = 0; i < courses.length; i++) {
  coursesImages.push('data/img/' + courses[i].slug + '.png');
}
var contentToCache = appShellFiles.concat(coursesImages);

// Installing Service Worker
self.addEventListener('install', function (e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(appShellFiles);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      console.log('[Service Worker] Fetching resource: ' + e.request.url);
      return r || fetch(e.request).then(function (response) {
        return caches.open(cacheName).then(function (cache) {
          console.log('[Service Worker] Caching new resource: ' + e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

// self.addEventListener('install', (e) => {
//   e.waitUntil(
//     caches.open('Progressive-Web-App-v2').then((cache) => {
//       return cache.addAll(contentToCache);
//     })
//   );
// });

// self.addEventListener('activate', (e) => {
//   e.waitUntil(
//     caches.keys().then((keyList) => {
//       return Promise.all(keyList.map((key) => {
//         if (key !== cacheName) {
//           return caches.delete(key);
//         }
//       }));
//     })
//   );
// });


