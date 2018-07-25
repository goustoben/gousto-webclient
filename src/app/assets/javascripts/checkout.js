/**
 * @fileoverview Checkout specific application logic
 */

(function() {
	'use strict';

	var checkoutForm = $('#checkoutform');
	var CHECKOUT = (function() {

		$('.card-btn').on('click', function(e) {
			e.preventDefault();
			var cardType = $(this).attr('data-card-type');
			$('#cardtype option[value="' + cardType + '"]').prop('selected', true);
		});

		$('.leavebox-select').change(function() {
			var selected = $(this).val();
			$('#leavebox-info-mobile').toggle(selected === 'Other');
			var yodelFreetext = $('#leavebox-other');
			if (selected !== 'Other' && selected !== 'Neighbour') {
				yodelFreetext.parent().children('div.error').remove();
				yodelFreetext.closest('.row').addClass('hidden');
				yodelFreetext.removeAttr('required');
				return;
			}
			yodelFreetext.attr('data-selected', selected);
			yodelFreetext.closest('.row').removeClass('hidden');
			yodelFreetext.attr('required', 'true');
			if (selected === 'Neighbour') {
				yodelFreetext.attr('maxlength', '10');
				yodelFreetext.attr('placeholder', 'Door number');
			} else {
				$('.yodel-leave-info').popover('show');
				yodelFreetext.attr('maxlength', '68');
				yodelFreetext.attr('placeholder', 'If you aren\'t in where should we leave your box?');
				yodelFreetext.rules( 'add', {
					minlength: 5
				});
			}
		});

		checkoutForm.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: 'POST',
				url: $(this).attr('action'),
				data: $(this).serialize(),
				cache: false,
				success: function(response) {
					if (response.status === 'ok') {
						if(typeof window.dataLayer !== 'undefined' && typeof response.promo_code !== 'undefined') {
							window.dataLayer.push({
								'promo_code': response.promo_code,
								'event': 'GTM_ready'
							});
						}
						if(typeof response['redirect-url'] !== 'undefined'){
							window.location.href = response['redirect-url'];
						}
					} else if(response.error && response.error.code === 'payment-failure'){
						scrollToInput($('#cardnumber'));
						var $alert = $('#payment-fail-alert');
						$alert.removeClass('hidden');
						$('#submit-checkout-form').ladda('stop');
						window.setTimeout(function() {
							$alert.addClass('hidden');
						}, 10000);
					} else {
						window.location.href = '/contact';
					}
				},
				fail: function() {
					window.location.href = '/contact';
				}
			});
		});

		$('#registerForm').on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: 'POST',
				url: $(this).attr('action'),
				data: $(this).serialize(),
				success: function() {
					$('#personaldetails').collapse('hide');
					$('#deliverydetails').removeClass('hidden').collapse();
				}
			});
		});
	})();

	//GA event tracking
	$(document).ready(function() {
		if (typeof gtm_step !== 'undefined') {
			gtm_step(1);
		}
	});

	//form validation stuff
	jQuery.validator.addMethod('nonNumeric', function(value, element) {
		return this.optional(element) || !value.match(/[0-9]+/);
	}, 'Names cannot include numbers.');

	$.validator.addMethod('ukphoneRegex', function(value, element) {
		value = value.replace(/[\s)(]/g, '');
		var blacklist = [
			'0123456',
			'0987654'
		];
		var blacklisted = false;
		$.each(blacklist, function() {
			if(value.substring(0, this.length) === this){
				blacklisted = true;
			}
		});
		return this.optional(element) || (/^(0){1}[1-9]{1}(\d){5}(\d)*$/.test(value)) && !blacklisted;
	}, 'Please enter a valid UK phone number, containing only digits, brackets and spaces.');

	$.validator.addMethod('nameRegex', function(value, element) {
		value = value.trim();
		return this.optional(element) || /^[a-zA-Z\-']+$/.test(value);
	}, 'Please use letters, dashes, and apostrophes only');

	var d = new Date();
	var currentYear = d.getFullYear() - 2000;
	var currentMonth = d.getMonth() + 1;

	jQuery.validator.setDefaults({
		success: 'valid',
		errorElement: 'div'
	});

	$('#checkoutform').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			cardnumber: {
				required: true,
				creditcard: true
			},
			nameoncard: 'required',
			expirymonth: {
				required: true,
				range: [1, 12],
				minlength: 2,
				maxlength: 2
			},
			expiryyear: {
				range: [currentYear, 50],
				minlength: 2,
				maxlength: 2,
				required: true
			},
			cv2: {
				minlength: 3,
				maxlength: 3,
				required: true
			},
			fname: {
				required: true,
				nonNumeric: true,
				nameRegex: true
			},
			lname: {
				required: true,
				nonNumeric: true,
				nameRegex: true
			},
			checkoutpassword: {
				required: true,
				minlength: 6
			},
			phone: {
				required: true,
				ukphoneRegex: true
			},
			delivery_instructions_custom: {
				required: true
			},
			deliverypostcode: 'required',
			deliveryaddress1: 'required',
			deliverytown: 'required',
			deliveryinstruction: 'required',
			billingpostcode: 'required',
			billingaddress1: 'required',
			billingtown: 'required'
		},
		messages: {
			'ukphone': {
				ukphoneRegex: 'Phone number format not valid'
			},
			delivery_instructions_custom: {
				required: 'Please give us a little more detail about where to leave your box if you\'re out when we deliver',
				minlength: 'Please give us a little more detail about where to leave your box if you\'re out when we deliver'
			}
		},
		errorPlacement: function(error, element) {
			if (element.attr('class') === 'leavebox-select') {
				error.insertAfter(element.parent());
				return;
			}
			error.insertAfter(element);
		}
	});

	$('#expirymonth').change(function() {
		if ($('#expirymonth').val() < currentMonth) {
			$('#expiryyear').rules('remove', 'min');
			$('#expiryyear').rules('add', {
				min: currentYear + 1
			});
		} else {
			$('#expiryyear').rules('remove', 'min');
			$('#expiryyear').rules('add', {
				min: currentYear
			});
		}
	});

	var personalDetails = $('#personaldetails');
	var deliveryDetails = $('#deliverydetails');
	var billingDetails = $('#billingdetails');

	$('.validate-checkout-form').on('click', function() {
		if (!checkoutForm.valid()) {
			scrollToError();
		}
	});
	$('.validate-personal-details').on('click', function() {
		var email = $('#email').val().replace(/\s+/g, '');
		if ($('#email').valid()) {
			var emailURL = '/user/validateEmail';
			var isUniqueEmail = false;
			var l = Ladda.create(document.querySelector('#personaldetails-button'));
			capture(1);
			l.start();
			$.ajax({
				url: emailURL,
				data: {
					'email': email
				},
				type: 'GET',
				success: function(data) {
					l.stop();
					if (data.status === 'error') {
						isUniqueEmail = false;
					} else {
						isUniqueEmail = true;
					}
				},
				complete: function(jqxhr, status) {
					if (isUniqueEmail) {
						if (checkoutForm.valid()) {
							personalDetails.data('valid', true);
							scrollToNextSection();
							gtm_step(2);
						} else {
							personalDetails.data('valid', false);
						}
					} else {
						personalDetails.data('valid', false);
						checkoutForm.valid();

						var errors = {};
						switch (jqxhr.responseJSON['error-details'] === null) {
							case false:
								errors.email = 'Please enter a valid email address.';
								break;
							case true:
								errors.email = 'This email address has already been registered, please login \<a href\=\"\#login\" style\=\"text\-decoration\:underline\;\">here\<\/a\>';
								break;
						}

						checkoutForm.validate().showErrors(errors);
					}
				},
				always: function() {
					l.stop();
				}
			});
		}
	});

	function performPostcodeLookup(isDeliveryAddressFields, onError, onSuccess, onAlways, noLadda, afterOnSuccess) {
		var postcode = $('#deliverypostcode').val().replace(/\s+/g, '');
		var postcodeURL = '/postcode/' + postcode;
		var btnClicked, craftyRow, cpObj;
		if (isDeliveryAddressFields) {  //Select delivery or billing fields
			btnClicked = $('#deliverylookup');
			craftyRow = $('#crafty-postcode-row-1');
			cpObj = cp_obj_1;
		} else {
			btnClicked = $('#billinglookup');
			craftyRow = $('#crafty-postcode-row-2');
			cpObj = cp_obj_2;
		}
		if (!noLadda) {
			var l = Ladda.create(btnClicked.get(0));
			l.start();
		}
		$.ajax({
			url: postcodeURL,
			type: 'GET',
			success: function(data) {
				craftyRow.show();
				if (data.status === 'error') {
					var pcodeError = 'Error';
					if (data.error === 'Invalid postcode') {
						pcodeError = 'Please provide a valid postcode.';
					} else if (data.error === 'We do not ship to that postcode') {
						pcodeError = 'Sorry we don\'t deliver to this region yet.';
					}
					checkoutForm.validate().showErrors({deliverypostcode: pcodeError});
					if(typeof onError === 'function'){
						onError();
					}
				} else {
					if(typeof onSuccess === 'function'){
						onSuccess();
					} else {
						cpObj.doLookup();
						$('#postcoderead').val(postcode);
						$('#address-not-found').show();
					}

					if (typeof afterOnSuccess === 'function') {
						afterOnSuccess();
					}
				}
			},
			error: function() {
				if(typeof onError === 'function'){
					onError();
				}
			},
			complete: function() {
				if (!noLadda) {
					l.stop();
				}
				if(typeof onAlways === 'function'){
					onAlways();
				}
			}
		});
	}

	function showDeliveryOptions() {
		function renderDeliverySlot(slot, container, checked) {
			var slotHtml = '<input name="delivery-slot" id="delivery-slot-' + slot.id + '" type="radio" value="' + slot.id + '"';
			if (checked) {
				slotHtml += ' checked';
			}
			slotHtml += '><label for="delivery-slot-' + slot.id + '">' + slot.name + '</label>';
			container.append(slotHtml);
		}

		function renderDeliverySlots(slots) {
			var container = $('#deliveryslot-container');
			var optionsContainer = container.find('.deliveryslot-options');
			var currentSlotId = $('#ordersummary-delivery-date').data('delivery-slot-id');

			var slotExists = false;
			for (var i in slots) {
				if (slots[i].id == currentSlotId) {
					slotExists = true;
					break;
				}
			}

			optionsContainer.html('');

			for (var j in slots) {
				var slot = slots[j];
				if (slot.default || slot.delivery_price === '0.00') {
					slot.name = 'Standard 8am - 7pm';
				} else if (slot.delivery_price !== '0.00') {
					slot.name = 'Evening 7pm - 10pm';
				}
				if (slot.delivery_price === '0.00') {
					slot.delivery_price = 'free';
				} else {
					slot.delivery_price = '£' + slot.delivery_price;
				}
				slot.name += '<span class="delivery-price">(' + slot.delivery_price + ')</span>';

				var checked = false;
				if ((!slotExists && slot.default) || slot.id == currentSlotId) {
					checked = true;
					$('#ordersummary-delivery-date').data('delivery-slot-id', slot.id);
				}

				renderDeliverySlot(slot, optionsContainer, checked);
			}
			if (slots.length > 1) {
				container.removeClass('hidden');
			} else {
				container.addClass('hidden');
			}

			//trigger event to save changes
			optionsContainer.find('input:checked').trigger('change');
		}

		var postcode = $('#deliverypostcode').val();
		var deliveryDayId = $('#ordersummary-delivery-date').data('delivery-day-id');

		$.ajax({
			url: '/delivery-day/' + deliveryDayId,
			data: {
				'postcode': postcode
			},
			type: 'GET',
			success: function(response) {
				if (response.status === 'ok' && typeof response.data[0] !== 'undefined' && typeof response.data[0].delivery_slots !== 'undefined') {
					var slots = response.data[0].delivery_slots;
					renderDeliverySlots(slots);
				}
			}
		});
	}

	$('input:radio[name="deliver-to"]').change(function(){
		if ($(this).val() === 'other') {
			$('#delivery-address-type').show();
		} else {
			$('#delivery-address-type').hide();
		}

		if ($(this).val() === 'home') {
			$('#deliverycompanyname').closest('.row').hide();
		} else {
			$('#deliverycompanyname').closest('.row').show();
		}
	});

	$('#deliverylookup').on('click', function() {
		performPostcodeLookup(true, null, null, null, null, showDeliveryOptions);
	});

	checkoutForm.on('keypress', '#deliverypostcode', function(e) {
		var code = e.keyCode || e.which;
		if (code === 13) {
			//user hit enter in the postcode field, let's do the lookup
			e.preventDefault();
			performPostcodeLookup(true, null, null, null, null, showDeliveryOptions);
			return false;
		}
	});

	$('.validate-delivery-details').on('click', function() {
		//Stop user if he enter the postcode but didn't select an delivery address
		if (checkoutForm.valid() && $('#deliveryaddress1').is(':hidden')) {
			$('#deliveryAddressError').show();
			return false;
		}

		var postcode = $('#deliverypostcode').val().replace(/\s+/g, '');
		var postcodeURL = '/postcode/' + postcode;
		var l = $('#deliveryaddress-button').ladda();
		capture(2);
		l.ladda('start');
		performPostcodeLookup(
			true,
			function(){
				deliveryDetails.data('valid', false);
				scrollToError();
			},
			function(){
				if (checkoutForm.valid()) {
					deliveryDetails.data('valid', true);
					scrollToNextSection();
					gtm_step(3);
				}
			},
			function(){
				$('#deliveryaddress-button').ladda('stop');
			},
			true
		);
	});

	$('#address-not-found').on('click', function() {
		$('#address-container').slideDown();
		$('.address-readonly').prop('readonly', false);
		$(this).hide();
	});

	$('#address-show-edit').on('click', function() {
		$(this).hide();
		$('.address-readonly').prop('readonly', false);
	});

	$('#billinglookup').on('click', function() {
		performPostcodeLookup(false);
	});

	checkoutForm.on('keypress', '#billingpostcode', function(e) {
		var code = e.keyCode || e.which;
		if (code === 13) {
			//user hit enter in the postcode field, let's do the lookup
			e.preventDefault();
			performPostcodeLookup(false);
			return false;
		}
	});

	$('.validate-billing-details').on('click', function() {
		//Stop user if he enter the postcode but didn't select an billing address
		if (checkoutForm.valid() && $('#crafty-postcode-row-2').is(':visible') && $('#bill-address-container').is(':hidden')) {
			$('#billingAddressError').show();
			return false;
		}

		if(!checkoutForm.valid()){
			scrollToError();
			return false;
		}

		var l = $('#submit-checkout-form').ladda();
		l.ladda('start');
		performPostcodeLookup(
			false,
			function(){
				$('#submit-checkout-form').ladda('stop');
				scrollToError();
			},
			checkDuplicate,
			null,
			true
		);
	});

	function checkDuplicate() {
		var promocode = $('.ordersummary-promocode');
		capture(3);
		if (promocode.val() === '') {
			submitCheckoutForm();
		} else {
			if (promocode.attr('data-valid-code') !== 'false' && checkoutForm.valid()) {
				var addressLine1, postcode;
				if ($('#billingaddressfields').is(':visible')) {
					addressLine1 = $('input[name="billingaddress1"]').val();
					postcode = $('#billingpostcode').val();
				} else {
					addressLine1 = $('#deliveryaddress1').val();
					postcode = $('#deliverypostcode').val();
				}
				var postData = {
					email: $('#email').val(),
					postcode: postcode,
					address_line1: addressLine1,
					phone: $('#phone').val(),
					card_number: $('#cardnumber').val(),
					card_expires: $('#expirymonth').val() + '/' + $('#expiryyear').val()
				};
				var formUrl = '/user/check-duplicate';
				$.post(formUrl, postData)
					.success(function(response){
						if (response.status === 'error') {
							submitCheckoutForm();
						} else if (response.data.is_duplicate && promocode.val().length > 0) {
							exposeSerialTrialler();
						} else {
							submitCheckoutForm();
						}
					})
					.error(function(){
						submitCheckoutForm();
					});
			} else {
				$('#submit-checkout-form').ladda('stop');
				if (promocode.val().length > 0 && promocode.attr('data-valid-code') === 'false') {
					$('.ordersummary-promoerror').show();
				}
				scrollToError();
			}
		}
	}

	function exposeSerialTrialler() {
		$('#submit-checkout-form').ladda('stop');
		$('.ordersummary-promocode')
			.attr('data-valid-code', 'false')
			.removeClass('text-success')
			.addClass('text-danger');
		$('.ordersummary-promoerror').show();
		$('.ordersummary-discount').show();
		$('.ordersummary-voucher-applied').hide();
		$('.ordersummary-total').text($('#original-total').text());
		$('.ordersummary-priceportion').text($('#price-per-portion-ref').text());
		$('#promotion-modal').modal('show');
		$('#promocode').val(''); //Hidden field value send to BE
	}

	function submitCheckoutForm() {
		checkoutForm.submit();
	}

	function scrollToError() {
		if ($('div.error').length > 0) {
			var input = $('#' + $('div.error:not(.valid):first').attr('for'));
			scrollToInput(input);
		}
	}

	function scrollToInput(input) {
		if (input.length) {
			var accordionPanel = input.closest('.panel-collapse');
			if (!accordionPanel.hasClass('in')) {
				accordionPanel.collapse('show', {
					toggle: false
				});
			}
			input.focus();
		}
	}

	function scrollToNextSection() {
		if (deliveryDetails.data('valid')) {
			deliveryDetails.collapse('hide', {
				toggle: true
			});
			billingDetails.collapse('show', {
				toggle: true
			});
			window.setTimeout(function() {
				$('html, body').scrollTop(billingDetails.offset().top - 94);
			}, 300);
		} else if (personalDetails.data('valid')) {
			personalDetails.collapse('hide', {
				toggle: true
			});
			deliveryDetails.collapse('show', {
				toggle: true
			});
			window.setTimeout(function() {
				$('html, body').scrollTop(deliveryDetails.offset().top - 112);
			}, 300);
		}
	}

	$('a[data-toggle=collapse]').on('click', function(e) {
		var panel = $(this).parents('.panel').children('.panel-collapse');
		if (panel.data('valid') !== true) {
			e.stopPropagation();
		}
		e.preventDefault();
	});

	function capture(stage) {
		var form = checkoutForm;
		var capdata = {};
		var pdnames = [
			'email',
			'title',
			'fname',
			'lname',
			'phone',
			'deliveryinstruction',
			'deliverypostcode',
			'deliverycompanyname',
			'deliveryaddress1',
			'deliveryaddress2',
			'deliveryaddress3',
			'deliverytown',
			'deliverycounty'
		];
		$.each(pdnames, function(index, value) {
			capdata[value] = form.find('[name="' + value + '"]').val();
		});
		capdata['step'] = stage;
		if (capdata['email']) {
			$.ajax({
				type: 'POST',
				url: '/capture',
				data: capdata
			});
		}
	}

	/***** Step 3 - Billing address ******/
	function populateBillingAddressDropdown(){
		var billAddress = '';
		$('#address-container input').each(function(){
			if($(this).val() !== '') {
				billAddress = billAddress + $(this).val() + ', ';
			}
		});
		billAddress = $.trim(billAddress.replace(/,+$/, ''));
		$('#billingaddresstoggle option[data-id=delivery-address]').text(billAddress).prop('selected', true);
	}
	$(window).load(function(){
		if(typeof window.cp_obj_1 !== 'undefined') {
			window.cp_obj_1.set('on_result_selected', function() {
				$('#address-container').slideDown();
				$('#address-show-edit').show();
				$('#address-not-found').hide();
				populateBillingAddressDropdown();
				$('#deliveryAddressError').hide();
			});
			window.cp_obj_1.set('res_select_on_change', populateBillingAddressDropdown);
		}
		if(typeof window.cp_obj_2 !== 'undefined') {
			window.cp_obj_2.set('on_result_selected', function() {
				$('#bill-address-container').slideDown();
				$('#billingAddressError').hide();
			});
		}
	});
	$(document).on('change', '#billingaddresstoggle', function(){
		if($(this).val() === 'showbillingaddress') {
			$('#billingaddressfields').fadeIn();
		} else {
			$('#billingaddressfields').fadeOut();
		}
	});
	$(document).on('change', '#address-container input', populateBillingAddressDropdown);
})();
