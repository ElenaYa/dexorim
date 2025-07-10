
(function($) {
	
	'use strict';
	
	var FormFunction = function(){
		
		var checkSelectorExistence = function(selectorName) {
			if(jQuery(selectorName).length > 0){return true;}else{return false;}
		};
		
		var validateEmail = function(email)	{
			var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if(emailReg.test(email)) {
				return true;
			} else {
				return false;
			}
		}
		
		var getGclidFromUrl = function() {
			var urlParams = new URLSearchParams(window.location.search);
			return urlParams.get('gclid') || '';
		};

		var contactForm = function() {
			if (!checkSelectorExistence('.ajax-form')) { return; }

			var gclid = getGclidFromUrl();
			if (gclid) {
				jQuery('#gclid').val(gclid);
			}

			jQuery('.ajax-form').on('submit', function(e) {
				e.preventDefault();

				var $form = jQuery(this);
				var firstName = $form.find('#contactFirstName').val().trim();
				var email = $form.find('#contactEmail').val().trim();
				var message = $form.find('#contactMessage').val().trim();
				var gclid = $form.find('#gclid').val() || getGclidFromUrl();
				
				if(!firstName || !email || !message) {
					var response = '<div class="alert alert-danger">Будь ласка, заповніть всі обов\'язкові поля</div>';
				$form.find(".ajax-message").html(response).show('slow');
					return;
				}
				
				if(!validateEmail(email)) {
					var response = '<div class="alert alert-danger">Будь ласка, введіть коректну email адресу</div>';
					$form.find(".ajax-message").html(response).show('slow');
					return;
				}
				
				var formData = {
					firstName: firstName,
					email: email,
					message: message,
					gclid: gclid
				};
				
				
				var successMessage = '<div class="alert alert-success">' +
					'<h4>Дякуємо за звернення!</h4>' +
					'<p>Ми отримали ваше повідомлення та зв\'яжемося з вами найближчим часом.</p>' +
					'</div>';
				
				$form.find(".ajax-message").html(successMessage).show('slow');
				
						$form[0].reset();
				
				setTimeout(function() {
					$form.find(".ajax-message").fadeOut('slow');
				}, 5000);
			});
		}
		
		var subscriptionForm = function() {
			if (!checkSelectorExistence('.subscribe-form1')) { return; }

			jQuery('.subscribe-form1').on('submit', function(e) {
				e.preventDefault();

				var $form = jQuery(this);
				var email = $form.find('input[name="email"]').val().trim();

				if(!email) {
					var response = '<div class="alert alert-danger">Будь ласка, введіть email адресу</div>';
					$form.find(".ajax-message").html(response).show('slow');
					return;
				}

				if(!validateEmail(email)) {
					var response = '<div class="alert alert-danger">Будь ласка, введіть коректну email адресу</div>';
				$form.find(".ajax-message").html(response).show('slow');
					return;
				}
				
				var processingMessage = '<div class="alert alert-warning">Обробка запиту...</div>';
				$form.find(".ajax-message").html(processingMessage).show('slow');
				
				setTimeout(function() {
					var successMessage = '<div class="alert alert-success">' +
						'<h4>Успішна підписка!</h4>' +
						'<p>Дякуємо за підписку на наші новини. Тепер ви будете отримувати останні оновлення та спеціальні пропозиції.</p>' +
						'</div>';
					
					$form.find(".ajax-message").html(successMessage).show('slow');
					
						$form[0].reset();
					
					setTimeout(function() {
						$form.find(".ajax-message").fadeOut('slow');
					}, 5000);
				}, 1500);
			});
		}
		
		return {
			afterLoadThePage:function(){
				contactForm();
				subscriptionForm();
			},
		}
		
	}(jQuery);
	
	jQuery(window).on("load", function (e) {
		FormFunction.afterLoadThePage();
	});
	
})(jQuery);	