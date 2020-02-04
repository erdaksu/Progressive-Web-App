var template = "<article>\n\
	<img src='data/img/placeholder.png' data-src='data/img/SLUG.png' alt='NAME'>\n\
	<h3>#POS. TOPIC</h3>\n\
	<span>Topic:</span> <strong>TOPIC</strong>\n\
	<br>\n\
	<span>Location:</span> <strong>LOCATION</strong>\n\
	<br>\n\
	<span>Price:</span> <strong>PRICE</strong>\n\
	<br>\n\
	<span>More:</span> <a href='http://classesandactivities/SLUG'>classesandactivities/SLUG</a>\n\
</article>";
var content = '';
for(var i=0; i<courses.length; i++) {
	var entry = template.replace(/POS/g,(i+1))
		.replace(/SLUG/g,courses[i].slug)
		.replace(/TOPIC/g,courses[i].topic)
		.replace(/LOCATION/g,courses[i].location)
		.replace(/PRICE/g,courses[i].price)
	entry = entry.replace('<a href=\'http:///\'></a>','-');
	content += entry;
};
document.getElementById('content').innerHTML = content;
// Registering Service Worker
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('Progressive-Web-App/sw.js');
};

// Requesting permission for Notifications after clicking on the button
var button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
	Notification.requestPermission().then(function(result) {
		if(result === 'granted') {
			randomNotification();
		}
	});
});

// Setting up random Notification
function randomNotification() {
	var randomItem = Math.floor(Math.random()*courses.length);
	var notifTitle = courses[randomItem].topic;
	var notifBody = 'Classes Located: '+courses[randomItem].location+'.';
	var notifImg = 'data/img/'+courses[randomItem].slug+'.png';
	var options = {
		body: notifBody,
		icon: notifImg
	}
	var notif = new Notification(notifTitle, options);
	setTimeout(randomNotification, 30000);
};

// Progressive loading images
var imagesToLoad = document.querySelectorAll('img[data-src]');
var loadImages = function(image) {
	image.setAttribute('src', image.getAttribute('data-src'));
	image.onload = function() {
		image.removeAttribute('data-src');
	};
};
if('IntersectionObserver' in window) {
	var observer = new IntersectionObserver(function(items, observer) {
		items.forEach(function(item) {
			if(item.isIntersecting) {
				loadImages(item.target);
				observer.unobserve(item.target);
			}
		});
	});
	imagesToLoad.forEach(function(img) {
		observer.observe(img);
	});
}
else {
	imagesToLoad.forEach(function(img) {
		loadImages(img);
	});
}