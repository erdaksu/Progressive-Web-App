const vueapp = new Vue({
	el: '#content',
	data: {
		courses: [
			{ slug: 'mathshendon', topic: 'Maths Classes', location: 'Hendon', price: '£100', },
			{ slug: 'mathscolindale', topic: 'Maths Classes', location: 'Colindale', price: '£110', },
			{ slug: 'mathsbrentcross', topic: 'Maths Classes', location: 'BrentCross', price: '£90', },
			{ slug: 'mathsgoldersgreen', topic: 'Maths Classes', location: 'GoldersGreen', price: '£80', },
			{ slug: 'englishhendon', topic: 'English Classes', location: 'Hendon', price: '£70', },
			{ slug: 'englishcolindale', topic: 'English Classes', location: 'Colindale', price: '£70', },
			{ slug: 'englishbrentcross', topic: 'English Classes', location: 'BrentCross', price: '£90', },
			{ slug: 'englishgoldersgreen', topic: 'English Classes', location: 'GoldersGreen', price: '£80', },
			{ slug: 'sciencehendon', topic: 'Science Classes', location: 'Hendon', price: '£90', },
			{ slug: 'sciencecolindale', topic: 'Science Classes', location: 'Colindale', price: '£70', },
			{ slug: 'sciencebrentcross', topic: 'Science Classes', location: 'BrentCross', price: '£70', },
			{ slug: 'sciencegoldersgreen', topic: 'Science Classes', location: 'GoldersGreen', price: '£80', },
			{ slug: 'sportshendon', topic: 'Sports Classes', location: 'Hendon', price: '£50', },
			{ slug: 'sportscolindale', topic: 'Sports Classes', location: 'Colindale', price: '£35', },
			{ slug: 'sportsbrentcross', topic: 'Sports Classes', location: 'BrentCross', price: '£40', },
			{ slug: 'sportsgoldersgreen', topic: 'Sports Classes', location: 'GoldersGreen', price: '£50', },]
	}
})

// Registering Service Worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/Progressive-Web-App/sw.js');
};

// Requesting permission for Notifications after clicking on the button
var button = document.getElementById("notifications");
button.addEventListener('click', function (e) {
	Notification.requestPermission().then(function (result) {
		if (result === 'granted') {
			randomNotification();
		}
	});
});

// Setting up random Notification
function randomNotification() {
	var randomItem = Math.floor(Math.random() * courses.length);
	var notifTitle = courses[randomItem].topic;
	var notifBody = 'Classes Located: ' + courses[randomItem].location + '.';
	var notifImg = 'data/img/' + courses[randomItem].slug + '.png';
	var options = {
		body: notifBody,
		icon: notifImg
	}
	var notif = new Notification(notifTitle, options);
	setTimeout(randomNotification, 30000);
};

// Progressive loading images
var imagesToLoad = document.querySelectorAll('img[data-src]');
var loadImages = function (image) {
	image.setAttribute('src', image.getAttribute('data-src'));
	image.onload = function () {
		image.removeAttribute('data-src');
	};
};
if ('IntersectionObserver' in window) {
	var observer = new IntersectionObserver(function (items, observer) {
		items.forEach(function (item) {
			if (item.isIntersecting) {
				loadImages(item.target);
				observer.unobserve(item.target);
			}
		});
	});
	imagesToLoad.forEach(function (img) {
		observer.observe(img);
	});
}
else {
	imagesToLoad.forEach(function (img) {
		loadImages(img);
	});
}