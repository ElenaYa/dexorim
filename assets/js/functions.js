const initLenis = () =>{
	const lenis = new Lenis({
		autoRaf: true,
		duration: 1.2,
		smooth: true,
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);
}

const mobileToggler = () =>{
	const toggler = document.querySelector('.navbar-toggler');
    const navList = document.querySelector('.navigation-list');

    if (toggler && navList) {
        toggler.addEventListener('click', () => {
            const isActive = toggler.classList.toggle('active');

            // Ensure navList also toggles properly
            if (isActive) {
                navList.classList.add('show');
            } else {
                navList.classList.remove('show');
            }
        });
    }
}

const mobileMenu = () =>{
	var dropdownNav = document.querySelectorAll('.dropdown-nav > a'); // Select all links inside .dropdown-nav
	var navBack = document.querySelectorAll('.nav-back'); // Select all nav-back buttons

	// Loop through each dropdown trigger
	dropdownNav.forEach(element => {
		element.addEventListener('click', function(event) {
			event.preventDefault();
			// Add 'open' class to the parent .dropdown-nav
			const parentDropdown = element.closest('.dropdown-nav');
			if (parentDropdown) {
				parentDropdown.classList.add('open');
			}
		});
	});

	// Loop through each nav-back button
	navBack.forEach(backButton => {
		backButton.addEventListener('click', function(event) {
			event.preventDefault();
			// Find the closest .dropdown-nav and remove the 'open' class
			const parentDropdown = backButton.closest('.dropdown-nav');
			if (parentDropdown) {
				parentDropdown.classList.remove('open');
			}
		});
	});	
}

const scriptFixedHeader = () =>{
	var header = document.querySelector('.sticky-header');
    if (!header) return;

    var scrollPosition = window.scrollY;

    if (scrollPosition > 300) {
        header.classList.add('sticky-active');
    } else {
        header.classList.remove('sticky-active');
    }
}

function initCustomCursor() {
    // Cursor element creation and append
    const cursor = document.createElement('div');
    cursor.id = 'cursor';

    const cursorCircle = document.createElement('div');
    cursorCircle.classList.add('cursorCircle');
    cursor.appendChild(cursorCircle);
    document.body.appendChild(cursor);

    // Mouse tracking variables
    const mouse = { x: -100, y: -100 };
    const pos = { x: 0, y: 0 };
    const speed = 0.1;

    // Mouse position update
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Calculate rotation angle
    function getAngle(diffX, diffY) {
        return Math.atan2(diffY, diffX) * 180 / Math.PI;
    }

    // Calculate squeeze (scale)
    function getSqueeze(diffX, diffY) {
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
        const maxSqueeze = 0.15;
        const accelerator = 1500;
        return Math.min(distance / accelerator, maxSqueeze);
    }

    // Update cursor transformation
    function updateCursor() {
        const diffX = Math.round(mouse.x - pos.x);
        const diffY = Math.round(mouse.y - pos.y);

        pos.x += diffX * speed;
        pos.y += diffY * speed;

        const angle = getAngle(diffX, diffY);
        const squeeze = getSqueeze(diffX, diffY);

        const scale = `scale(${1 + squeeze}, ${1 - squeeze})`;
        const rotate = `rotate(${angle}deg)`;
        const translate = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

        cursor.style.transform = translate;
        cursorCircle.style.transform = rotate + ' ' + scale;
    }

    // Animation loop
    function loop() {
        updateCursor();
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    // Modifier functionality (cursor-class handling)
    const cursorModifiers = document.querySelectorAll('[cursor-class]');
    cursorModifiers.forEach(modifier => {
        modifier.addEventListener('mouseenter', function() {
            const className = this.getAttribute('cursor-class');
            cursor.classList.add(className);
        });
        modifier.addEventListener('mouseleave', function() {
            const className = this.getAttribute('cursor-class');
            cursor.classList.remove(className);
        });
    });
}

const textRoateElements = () => {
	var wordRoateElements = document.querySelectorAll('.word-rotate');
	if (!wordRoateElements.length) return;
	wordRoateElements.forEach((data, _) => {
		var wordRoate = $(data).text().split('');
		const step = 360 / wordRoate.length;
		wordRoate.forEach((el, i) => {
			$(data).closest('.word-rotate-box').append('<span class="rotate-text" style="--char-rotate :' + (i * step) + 'deg">' + el + '</span>');
		})
		$(data).remove();
	})
}

const dataItemHover = () =>{
	const initHoverEffect = (container, images) => {
		const hoverInstance = new hoverEffect({
			parent: container.get(0),
			intensity: container.data("intensity") || undefined,
			speedIn: container.data("speedin") || undefined,
			speedOut: container.data("speedout") || undefined,
			easing: container.data("easing") || undefined,
			hover: container.data("hover") || undefined,
			image1: images.eq(0).attr("src"),
			image2: images.eq(0).attr("src"),
			displacementImage: container.data("displacement"),
			imagesRatio: images[0].height / images[0].width,
			hover: false
		});
		
		container.closest(".data-item-hover")
			.on("mouseenter", () => hoverInstance.next())
			.on("mouseleave", () => hoverInstance.previous());
	};

	const setupHoverAnimations = () => {
		$(".data-img-hover").each(function () {
			const currentContainer = $(this);
			const imageElements = currentContainer.find("img");
			const firstImage = imageElements.eq(0);

			if (firstImage[0].complete) {
				initHoverEffect(currentContainer, imageElements);
			} else {
				firstImage.on("load", () => {
					initHoverEffect(currentContainer, imageElements);
				});
			}
		});
	};

	setupHoverAnimations();
}

const likeButton = () => {
	const elements = document.querySelectorAll('.btn-like');
	if (!elements.length) return;

	elements.forEach(element => {
		element.addEventListener('click', function(event) {
			event.preventDefault();
			const parentElement = this.parentElement;
			const valueElement = parentElement.querySelector(".likes");
			let userText = Number(valueElement.textContent);

			if (this.classList.contains('active')) {
				this.classList.remove('active');
				valueElement.textContent = userText - 1;
			} else {
				this.classList.add('active');
				valueElement.textContent = userText + 1;
			}
		});
	});
}

var isotopeFilters = function () {
	if (jQuery('.isotopeFilters').length > 0) {
		var $filterNav = jQuery('.nav-filters');
		var $grid = jQuery('.isotopeFilters');
		var filterValue = "";

		// Remove all and set first tab active
		$filterNav.find('li').removeClass('active');
		$filterNav.find('li:first').addClass('active');

		// Set up options
		var gutter = parseInt($grid.data('gutter') || 0, 10);
		var columnWidth = parseInt($grid.attr('data-column-width') || 0, 10);

		// Wait for images to load before initializing Isotope
		$grid.imagesLoaded(function () {
			$grid.isotope({
				itemSelector: ".action-card",
				layoutMode: 'masonry',
				masonry: {
					gutter: gutter,
					columnWidth: columnWidth || '.action-card' // fallback to element
				}
			});
		});

		// Filtering
		if ($filterNav.length) {
			$filterNav.on("click", "li", function () {
				$filterNav.find('li').removeClass('active');
				jQuery(this).addClass('active');
				filterValue = jQuery(this).attr("data-filter");

				$grid.isotope({
					filter: filterValue
				});
			});
		}
	}
};

// Call this function when page loads
document.addEventListener("DOMContentLoaded", () => {
	initLenis();
    mobileToggler();
	mobileMenu();
	initCustomCursor();
	textRoateElements();
	dataItemHover();
	likeButton();
	isotopeFilters();
});

window.addEventListener('scroll', () => {
	scriptFixedHeader();
}, 100);


(function($) {
	'use strict';
	
	var ThemeBuilder = function(){
		
		var checkSelectorExistence = function(selectorName) {
			if(jQuery(selectorName).length > 0){return true;}else{return false;}
		};		
		
		/* Page Scroll To Top ============ */
		var pageScrollToTop = function (){
			/* page scroll top on click function */	
			jQuery("button.back-to-top").on('click',function() { 
				jQuery('html').animate({ scrollTop: 0 }, 500);
				return false;
			})

			jQuery(window).on("scroll", function() {
				var scrollWindowHeight = jQuery(window).scrollTop();
				if (scrollWindowHeight > 900) {
					jQuery("button.back-to-top").addClass('active');
				} else {
					jQuery("button.back-to-top").removeClass('active');
				}
			});
			/* page scroll top on click function end*/
		}
		
		/* Set Counter Up Function */
		var setCounterUp = function(){
			if(!checkSelectorExistence('.counter')){return;}
			jQuery('.counter').counterUp({
				delay: 10,
				time: 3000
			});	
		}
		
		/* WOW ANIMATION */
		var wowAnimation = function(){
			if(!checkSelectorExistence('.wow')){return;}
			var wow = new WOW({
				boxClass:     'wow',      
				animateClass: 'animated', 
				offset:       20,          
				mobile:       false,       
				live:         true
			});
			wow.init();	
		}

		var isScrolledIntoView = function (elem){
			var $elem = $(elem);
			var $window = $(window);

			var docViewTop = $window.scrollTop();
			var docViewBottom = docViewTop + $window.height();

			var elemTop = $elem.offset().top;
			var elemBottom = elemTop + $elem.height();

			return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		}
		
		var splitImageAnimation = function (){
			$(window).on('scroll',function(){
				$('.split-media').each(function(){
					if(isScrolledIntoView($(this))){
						$(this).addClass('split-active');
					}
				});
			});
		}
		
		var initNiceSelect = function(){
			if(jQuery('.nice-select').length > 0){
				$(".nice-select").niceSelect();
			}
		}
		
		var initTooltip = function(){
			if(jQuery('[data-bs-toggle="tooltip"]').length > 0){
				$('[data-bs-toggle="tooltip"]').tooltip();
			}
		}
		
		var locationMarker = function(){
			if(jQuery('.location-marker').length > 0){
				$('.location-marker .location-pin').on('click', function () {
					const $marker = $(this).closest('.location-marker');
					const isActive = $marker.hasClass('active');

					$('.location-marker').removeClass('active');

					if (!isActive) {
						$marker.addClass('active');
					}
				});
			}
		}
		
		var magnificPopupImageView = function(){
			/* magnificPopup function */
			if(checkSelectorExistence('.magnific-image')) {
				jQuery('.magnific-image').magnificPopup({ 
					delegate: '.magnific-anchor', 
					type: 'image',
					tLoading: 'Loading image #%curr%...',
					mainClass: 'magnific-img-mobile', 
					gallery: {
						enabled: true,
						navigateByImgClick: true,
						preload: [0,1] // Will preload 0 - before current, and 1 after the current image
					},
					image: {
						tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
						titleSrc: function(item) {
							return item.el.attr('title') + '<small></small>';
						}
					}
				});
			}
			/* magnificPopup function end */
			
			/* magnificPopup for video function */
			if(checkSelectorExistence('.video')) {
				jQuery('.video').magnificPopup({ 
					type: 'iframe',
					iframe: {
						markup: '<div class="mfp-iframe-scaler">'+
								 '<div class="mfp-close"></div>'+
								 '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
								 '<div class="mfp-title">Some caption</div>'+
								 '</div>'
					},
					callbacks: {
						markupParse: function(template, values, item) {
							values.title = item.el.attr('title');
						}
					}
				});
			}
			
			/* magnificPopup for paly video function end*/
			if(checkSelectorExistence('.magnific-popup')) {
				$('.magnific-popup').magnificPopup({
					disableOn: 700,
					type: 'iframe',
					mainClass: 'mfp-fade',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: true
				});
			}
		}
		
		var toggleTabs = function () {
			jQuery('.toggle-tab-btn .price-monthly').on('click', function () {
				jQuery('.price-monthly').addClass('active');
				jQuery('.price-yearly').removeClass('active');
			});

			jQuery('.toggle-tab-btn .price-yearly').on('click', function () {
				jQuery('.price-yearly').addClass('active');
				jQuery('.price-monthly').removeClass('active');
			});
		};


		/* Function ============ */
		return {
			initialHelper:function(){
				initNiceSelect();
				wowAnimation();
				pageScrollToTop();
				splitImageAnimation();
				initTooltip();
				locationMarker();
				magnificPopupImageView();
				toggleTabs();
			},
			
			afterLoadThePage:function(){
				setCounterUp();
			},
			
		}
		
	}(jQuery);

	/* jQuery ready  */	
	jQuery(document).ready(function() {ThemeBuilder.initialHelper();});
	
	/* jQuery Window Load */
	jQuery(window).on("load", function (e) {ThemeBuilder.afterLoadThePage();});
	
})(jQuery);