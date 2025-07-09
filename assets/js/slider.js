/*
***
***
Name: 			slider.js
Written by: 	LayoutDrop 
Theme Version:	1.0.0
***
***
*/

'use strict';

document.addEventListener("DOMContentLoaded", function() {
	
	function checkSelectorExistence(selectorName) {
        return document.querySelector(selectorName) !== null;
    }
	
	var feedbackSwiper1 = function() {
		if(!checkSelectorExistence('.testimonial-swiper')){return;}
		var swiper = new Swiper(".testimonial-swiper", {
			loop: true,
			spaceBetween: 0,
			speed: 500,
			autoplay: {
				delay: 3000,
			},
			navigation: {
				nextEl: ".testimonial-btn-next1",
				prevEl: ".testimonial-btn-prev1",
			},
			pagination: {
				el: ".swiper-pagination",
				type: "progressbar",
			},
			on: {
				slideChange: function () {
					const total = this.slides.length;
					const current = this.realIndex + 1;
					document.querySelector('.swiper-pagination-fraction').innerHTML = `${current} / ${total}`;
				},
				init: function () {
					const total = this.slides.length;
					const current = this.realIndex + 1;
					document.querySelector('.swiper-pagination-fraction').innerHTML = `${current} / ${total}`;
				}
			}
		});
	}
	
	var feedbackSwiper2 = function() {
		if(!checkSelectorExistence('.testimonial-swiper2')){return;}
		var swiper = new Swiper(".testimonial-swiper2", {
			loop: true,
			spaceBetween: 20,
			slidesPerView: 1,
			speed: 500,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			breakpoints: {
				767: {
					slidesPerView: 2,
				},
			},
		});
	}
	
	var brandLogo = function() {
		if(!checkSelectorExistence('.brand-logo-swiper')){return;}
		var swiper = new Swiper(".brand-logo-swiper", {
			loop: true,
			freemode: true,
			spaceBetween: 30,
			slidesPerView: 'auto',
			centeredSlides: true,
			allowTouchMove: false,
			speed: 5000,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			}
		});
	}
	
	var marqueeSwiper = function() {
		if(!checkSelectorExistence('.marquee-swiper')){return;}
		var swiper = new Swiper(".marquee-swiper", {
			loop: true,
			freemode: true,
			spaceBetween: 0,
			slidesPerView: 'auto',
			centeredSlides: true,
			allowTouchMove: false,
			speed: 5000,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			}
		});
	}
	
	var authSwiper = function() {
		if(!checkSelectorExistence('.auth-swiper')){return;}
		var swiper = new Swiper(".auth-swiper", {
			loop: true,
			effect: 'fade',
			spaceBetween: 5,
			slidesPerView: 1,
			centeredSlides: true,
			allowTouchMove: false,
			parallax: true,
			navigation: {
				nextEl: ".auth-btn-next",
				prevEl: ".auth-btn-prev",
			},
			pagination: {
				el: ".swiper-pagination",
				type: "fraction",
			},
			autoplay: {
				delay: 3000,
				disableOnInteraction: true,
			}
		});
	}
	
	var videoSwiper = function() {
		if(!checkSelectorExistence('.video-swiper')){return;}
		var swiper = new Swiper(".video-swiper", {
			loop: true,
			spaceBetween: 5,
			slidesPerView: 1,
			centeredSlides: false,
			allowTouchMove: true,
			parallax: false,
			effect: false,
			speed: 500,
			navigation: {
				nextEl: ".video-btn-next",
				prevEl: ".video-btn-prev",
			},
			pagination: {
				el: ".swiper-video-pagination",
				dynamicBullets: true,
			},
			autoplay: {
				delay: 3000,
				disableOnInteraction: true,
			},
			breakpoints: {
				767: {
					allowTouchMove: false,
					effect: 'fade',
					parallax: true,
					centeredSlides: true,
				},
			},
		});
	}
	
	
	
	// Initialize all Swipers
	feedbackSwiper1();
	feedbackSwiper2();
	brandLogo();
	marqueeSwiper();
	authSwiper();
	videoSwiper();
	
	
});