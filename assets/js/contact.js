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
		
		/* URL Form Input */
		var validateURL = function(textval) {
			var urlregex = new RegExp(
			   "^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
			return urlregex.test(textval);
		}
		
		/* Integer Number Form Input */
		var validateInteger = function(){
			if(!checkSelectorExistence('.int-value')){return;}
			$(".int-value").on('keydown', function (e) {
				// Allow: backspace, delete, tab, escape, enter and .
				if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
					 // Allow: Ctrl+A, Command+A
					(e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
					 // Allow: home, end, left, right, down, up
					(e.keyCode >= 35 && e.keyCode <= 40)) {
						 // let it happen, don't do anything
						 return;
				}
				// Ensure that it is a number and stop the keypress
				if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					e.preventDefault();
				}
			});
		}
		
		/* Integer Number Form Input */
		var validateCharacter  = function(){
			if(!checkSelectorExistence('.valid-character')){return;}
			$('.valid-character').keyup(function() {
				if (this.value.match(/[^a-zA-Z ]/g)) {
					this.value = this.value.replace(/[^a-zA-Z ]/g, '');
				}
			});
		}
		
		var contactForm = function() {
			if (!checkSelectorExistence('.ajax-form')) { return; }

			// Set reCAPTCHA callbacks
			jQuery('form').on('submit', function(e) {
				e.preventDefault();

				var $form = jQuery(this);
				var response = '<div class="alert alert-warning alert-dismissable">Processing...</div>';
				$form.find(".ajax-message").html(response).show('slow');
				var form = $(this).closest('form')[0]; // get the form element
				var formData = new FormData(form);     // ✅ works now
			
				//	var formAction = $form.attr('action');
				$.ajax({
					type: 'POST',
					url: 'assets/script/contact.php',
					data: formData,
					dataType: 'json',
					contentType: false, // required for FormData
					processData: false, // required for FormData
					success: function(data) {
						var response;
						if (data.status == 1) {
							response = '<div class="gen alert alert-success">' + data.message + '</div>';
						} else {
							response = '<div class="err alert alert-danger">' + data.message + '</div>';
						}
						$form.find(".ajax-message").html(response).delay(5000).fadeOut('slow');
						$form[0].reset();
						if (typeof grecaptcha !== 'undefined') {
							//grecaptcha.reset(); // Reset reCAPTCHA if available
						}
					},
					error: function(xhr, status, error) {
						var errorMessage = '<div class="alert alert-danger">There was an error. Please try again later.</div>';
						$form.find(".ajax-message").html(errorMessage).show('slow');
						console.error('AJAX Error:', status, error);
					}
				});
			});
		}
		
		var subscriptionForm = function() {
			if (!checkSelectorExistence('.subscribe-form1, .subscribe-form')) { return; }

			jQuery('.subscribe-form1, .subscribe-form').on('submit', function(event) {
				event.preventDefault();

				var $form = jQuery(this);
				var email = $form.find('input[name="email"]').val().trim();

				if (!email) {
					var response = '<div class="alert alert-danger">Please enter a valid email address.</div>';
					$form.find(".ajax-message").html(response).show('slow');
					return;
				}

				var response = '<div class="alert alert-warning alert-dismissable">Processing...</div>';
				$form.find(".ajax-message").html(response).show('slow');

				jQuery.ajax({
					type: 'POST',
					url: 'assets/script/mailchamp.php',
					data: { email: email },
					dataType: 'json', // 👈 Important if server returns JSON
					success: function(data) {
						var response;
						if (data.status == 1) {
							response = '<div class="gen alert alert-success">' + data.message + '</div>';
						} else {
							response = '<div class="err alert alert-danger">' + data.message + '</div>';
						}
						$form.find(".ajax-message").html(response).delay(5000).fadeOut('slow');
						$form[0].reset();
					},
					error: function(xhr, status, error) {
						var response = '<div class="alert alert-danger">There is something wrong. Please try again later.</div>';
						$form.find(".ajax-message").html(response).show('slow');
						console.error("Ajax error:", error);
					}
				});
			});
		};
		
		/* Functions Calling */
		return {
			afterLoadThePage:function(){
				
				contactForm();
				subscriptionForm();
				validateInteger();
				validateCharacter();
			},
		}
		
	}(jQuery);
	
	/* jQuery Window Load */
	jQuery(window).on("load", function (e) {
		FormFunction.afterLoadThePage();
	});
	
})(jQuery);	