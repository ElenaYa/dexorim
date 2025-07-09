/*
***
***
Name: 			contact.js
Written by: 	LayoutDrop
Theme Version:	1.0.0
***
***
*/

(function($) {
	
	'use strict';
	
	var FormFunction = function(){
		
		var checkSelectorExistence = function(selectorName) {
			if(jQuery(selectorName).length > 0){return true;}else{return false;}
		};
		
		/* Email Form Input */
		var validateEmail = function(email)	{
			var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if(emailReg.test(email)) {
				return true;
			} else {
				return false;
			}
		}
		
		var contactForm = function() {
			if (!checkSelectorExistence('.ajax-form')) { return; }
			
			jQuery('.ajax-form').on('submit', function(e) {
				e.preventDefault();
				
				var $form = jQuery(this);
				var firstName = $form.find('#contactFirstName').val().trim();
				var email = $form.find('#contactEmail').val().trim();
				var message = $form.find('#contactMessage').val().trim();
				
				// Валидация
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
				
				// Успешная валидация - показываем поп-ап
				var successMessage = '<div class="alert alert-success">' +
					'<h4>Дякуємо за звернення!</h4>' +
					'<p>Ми отримали ваше повідомлення та зв\'яжемося з вами найближчим часом.</p>' +
					'</div>';
				
				$form.find(".ajax-message").html(successMessage).show('slow');
				
				// Очищаем форму
				$form[0].reset();
				
				// Скрываем сообщение через 5 секунд
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
				
				// Валидация email
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
				
				// Показываем сообщение о обработке
				var processingMessage = '<div class="alert alert-warning">Обробка запиту...</div>';
				$form.find(".ajax-message").html(processingMessage).show('slow');
				
				// Имитируем задержку обработки
				setTimeout(function() {
					var successMessage = '<div class="alert alert-success">' +
						'<h4>Успішна підписка!</h4>' +
						'<p>Дякуємо за підписку на наші новини. Тепер ви будете отримувати останні оновлення та спеціальні пропозиції.</p>' +
						'</div>';
					
					$form.find(".ajax-message").html(successMessage).show('slow');
					
					// Очищаем форму
					$form[0].reset();
					
					// Скрываем сообщение через 5 секунд
					setTimeout(function() {
						$form.find(".ajax-message").fadeOut('slow');
					}, 5000);
				}, 1500);
			});
		}
		
		/* Functions Calling */
		return {
			afterLoadThePage:function(){
				contactForm();
				subscriptionForm();
			},
		}
		
	}(jQuery);
	
	/* jQuery Window Load */
	jQuery(window).on("load", function (e) {
		FormFunction.afterLoadThePage();
	});
	
})(jQuery);	