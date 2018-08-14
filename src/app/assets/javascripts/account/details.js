var detailsModule = function() {
	'use strict';

	var $myDelivery = $('#my-delivery-container');
	//form copies
	var $customerAddressCopies = {};
	var currentPaymentForm = null;
	var formConfig = {};

	var getFormButtons = function(form){
		var navButtons = form.parents().find('.address-box .address-buttons').find('.address-cancel, .address-delete:not(:disabled)')
		return navButtons.add(form.find('.account-address-details-edit'))
	};

	var paymentFormEl = document.getElementById('payment-form');
	var payNowButton = document.getElementById('pay-now-button');
	var paymentFormStyle = window.paymentFormStyle;

	var cookieList = cookiesToJs();
	var feature = JSON.parse(
		JSON.parse(cookieList.v1_goustoStateStore_features)
	);

	if (feature && feature.featureCheckout && feature.featureCheckout.value) {
		formConfig = {
			style: paymentFormStyle(),
			theme: 'simple',
			containerSelector: '.frames-container-details',
			localisation: {
				cardNumberPlaceholder: 'Card number'
			}
		};
		$('#detail-form-sage').addClass('hide');
		$('#detail-form-checkout').removeClass('hide');
		$('#detail-form-sage').removeClass('hide-soft');
		$('#detail-form-checkout').addClass('hide-soft');

		currentPaymentForm = window.paymentForm(paymentFormEl, payNowButton);
	}

	// DETAILS PAGE
	// Mobile detail section show/hide
	$('.details-section-edit, .details-section-close').click(function(e){
		e.preventDefault();
		var thisButton = $(this);
		var nextButton = thisButton.siblings('button');
		thisButton.prop('disabled', true);
		nextButton.prop('disabled', false);
		var detailsSection = thisButton.closest('div.account-block-inner');
		var detailsSectionContent = detailsSection.find('div.details-section-content');
		detailsSection.toggleClass('active');
		detailsSectionContent.slideToggle();
		callbackFadeSwitch(thisButton, nextButton);
	});
	// Detail edit/cancel
	$('.detail-edit, .detail-cancel').on('click', function(e){
		e.preventDefault();
		switchAccountForm($(this).closest('.details-section-row'));
	});

	$('#my-details-payment-container .detail-edit').on('click', function(e){
		e.preventDefault();

		if (currentPaymentForm) {
			currentPaymentForm.init(formConfig);
		}
	});

	// Address form show/hide
	$(document).on('click', '.new-address, .address-edit, .address-cancel', function (e) {
		var form = null;
		var formNumber = $(this).attr('data-form-number') || '';
		var cancelNewForm = $(this).is('.address-cancel-new-address');

		e.preventDefault();
		toggleAddressForm($(this));

		if ($(this).is('.new-address')) {
			//clone new address form
			$customerAddressCopies["new-address"] = $myDelivery.find('form[id^="account-new-address-form-"]').clone(true);
		}
		else if ($(this).is('.address-edit')) {
			//clone address edit form
			$customerAddressCopies[formNumber] = $myDelivery.find('form[id^="account-postcode-"][data-number="' + formNumber + '"]').clone(true);
		}
		else {
			//revert form data on cancellation
			form = cancelNewForm ? $myDelivery.find('form[id^="account-new-address-form-"]') : $myDelivery.find('form[id^="account-postcode-"][data-number="' + formNumber + '"]');

			if(form.length){
				form.replaceWith(cancelNewForm ? $customerAddressCopies["new-address"] : $customerAddressCopies[formNumber])
				if(cancelNewForm){
					delete $customerAddressCopies["new-address"]
				}
				else{
					delete $customerAddressCopies[formNumber]
				}
			}
		}
	});

	$(document).on('click', '.address-delete', function(e){
		e.preventDefault();
		var addressBox = $(this).closest('.address-box');
		var deleteForm = addressBox.find('.address-delete-form');
		$.post(deleteForm.attr('action'), deleteForm.serializeArray())
			.success(function(data){
				// TODO: Better UX for removing addresses
				if(typeof data.error !== 'undefined'){
					return;
				}
				addressBox.remove();
			});
	});

	$(document).on('click', '.account-postcode-lookup', function(e){
		e.preventDefault();
		var l = Ladda.create(this);
		l.start();
		var form = $(this).closest('form');
		var formId = form.attr('id');
		form.attr('id', formId);
		var postcode = form.find('.account-postcode').val();

		var resultContainer = form.find('.account-address-list');
		var resultContainerId = 'account-address-list-' + formId;
		resultContainer.attr('id', resultContainerId);

		var inputFields = form.find('.account-address-details input[type="text"]');
		var editButton = form.find('.account-address-details-edit');

		var cantFindButton = form.find('.account-address-cant-find');

		//cancel, edit and delete buttons
		var formButtons = getFormButtons(form);

		PostcodeLookup.emptyInputFields(editButton, inputFields);
		PostcodeLookup.hideInputFields(editButton, inputFields);

		PostcodeLookup.isDeliveryAvailable(
			postcode,
			function() {
				var config = {
					'form': formId,
					'result_elem_id': resultContainerId,
					'elem_company': 'companyname',
					'elem_street1': 'line1',
					'elem_street2': 'line2',
					'elem_street3': 'line3',
					'elem_town': 'town',
					'elem_county': 'county',
					'elem_postcode': 'postcode',
					'on_result_ready': function() {
						PostcodeLookup.showCantFindButton(cantFindButton);
					},
					'on_result_selected': function() {
						PostcodeLookup.updateInputFields(editButton, inputFields);
					},
					'on_error': function() {
						PostcodeLookup.emptyInputFields(editButton, inputFields);
						PostcodeLookup.hideCantFindButton(cantFindButton);
					}
				};

				PostcodeLookup.getListOfAddresses(postcode, config);
			},
			function(msg) {
				resultContainer.text(msg);
				PostcodeLookup.hideInputFields(editButton, inputFields);
			},
			function() {
				l.stop();
				formButtons.attr('disabled', false);
			}
		);
	});

	$(document).on('click', '.account-address-details-edit', function(e){
		e.preventDefault();
		var editButton = $(this);
		var inputFields = editButton.closest('.account-address-details').find('input[type="text"]');

		PostcodeLookup.showInputFields(editButton, inputFields);
	});

	$(document).on('click', '.account-address-cant-find', function(e){
		e.preventDefault();
		var editButton = $(this).closest('form').find('.account-address-details-edit');
		var inputFields = editButton.closest('.account-address-details').find('input[type="text"]');

		PostcodeLookup.showInputFields(editButton, inputFields);
	});

	var $accountAddress = $('.account-address');
	$accountAddress.each(function () {
		$(this).validate({
			rules: {
				delivery_instructions_custom: {
					required: true,
					minlength: {
						param: 5,
						depends: function () {
							return $(this).closest('form').find('input[name=delivery_instructions]').val() === 'Other';
						}
					}
				}
			},
			messages: {
				name: {
					required: 'Please provide a name for this address'
				},
				delivery_instructions_custom: 'Please give us a little more detail about where to leave your box if you\'re out when we deliver'
			}
		});
	});

	// Comm preferences. Enable submit button when changes
	var commPreferencesForm = $(document).find('#account-comms-pref-form');
	commPreferencesForm.on('click', '.comm-pref-checkbox', function(){
		var submitBtn = commPreferencesForm.find('#account-comms-pref-submit');
		submitBtn.prop('disabled', false);
		submitBtn.removeClass('disabled');
		submitBtn.prop('value', 'Save changes');
	});

	// Submit update on Comm preferences
	$('#account-comms-pref-form').on('submit', function(e){
		e.preventDefault();
		var form = $(this);
		var postData = form.serializeArray();
		var errorEl = form.find('.detail-error');
		errorEl.hide();
		var submitBtn = form.find('input[type=submit]');
		submitBtn.prop('disabled', true);
		$.post(form.prop('action'), postData).done(function(data){
			if(data.status === 'ok') {
				submitBtn.prop('value', 'Saved');
			} else {
				submitBtn.prop('disabled', false);
				errorEl.text('An error occurred, please try again later');
				errorEl.show();
			}
		});
	});

	// New address form submit
	$accountAddress.submit(function(e) {
		e.preventDefault();
		var form = $(this);
		var submitButton = form.find('button[type=submit]').get(0);
		var l = Ladda.create(submitButton);
		l.start();
		var deliveryInstructions = form.find('select[name=delivery_instructions]');
		var leaveBoxInput = form.find('input[name=delivery_instructions_custom]:visible');
		if (deliveryInstructions.length && leaveBoxInput.length) {
			switch (deliveryInstructions.val()) {
				case 'Other':
					leaveBoxInput.rules('add', {
						minlength: 5
					});
					break;
				default:
					break;
			}
		}
		if(!form.valid()){
			l.stop();
			return;
		}
		//disable cancel, edit and delete button
		var formButtons = getFormButtons(form);
		formButtons.attr('disabled', true);
		var postcodeElement = form.find('input[name=postcode]');
		var postcode = postcodeElement.val().replace(/\s+/g, '');
		var postcodeURL = '/postcode/' + postcode;
		var postData = form.serializeArray();
		var formURL = form.attr('action');

		var submitFormData = function () {
			$.post(formURL, postData).done(function(data) {
				var addressBox = form.closest('.address-box');
				if (typeof data.updated !== 'undefined') {
					addressBox.find('.address-name').html(data.updated.name);
					addressBox.find('.address-text > p').html(getAddressString(data.updated));
				} else if (typeof data.created !== 'undefined') {
					var addressString = getAddressString(data.created);
					var newAddressForm = addressBox.find('form.build-new-address-form');
					newAddressForm.find('input[name=address_id]').val(data.created.id);
					$.get(newAddressForm.attr('action'), newAddressForm.serializeArray())
						.success(function(data) {
							if (typeof data.data !== 'undefined') {
								var lastAddressBox = addressBox.prev('.address-box');
								var newAddressBox = $(data.data);
								newAddressBox.hide();
								lastAddressBox.after(newAddressBox);
								newAddressBox.find('.address-text > p').html(addressString);
								newAddressBox.slideToggle();
							}
						})
				}
				toggleAddressForm(form.closest('.address-box').find('.address-cancel'));
			})
			.always(function(){
				l.stop();
				if($customerAddressCopies["new-address"]){
					$myDelivery.find('form[id^="account-new-address-form-"]').replaceWith($customerAddressCopies["new-address"]);
					delete $customerAddressCopies["new-address"];
				}
				//enable cancel, edit and delete buttons, timeout because of the toggle delay
				setTimeout(function(){
					formButtons.attr('disabled', false);
				}, 250)
			});
		};

		PostcodeLookup.isDeliveryAvailable(
			postcode,
			submitFormData,
			function(msg) {
				var resultContainer = form.find('.account-address-list');
				resultContainer.text(msg);
				l.stop();
				formButtons.attr('disabled', false);
			},
			function() {}
		);
	});

	var toggleAddressForm = function (e) {
		var thisButton = e;
		var nextButton = thisButton.siblings('button').not('button.address-delete');
		thisButton.prop('disabled', true);
		nextButton.prop('disabled', false);
		var addressBox = thisButton.closest('.address-box');
		var orderContainer = thisButton.closest('.order-container');
		addressBox.children('.address-form').slideToggle();
		addressBox.children('.address-text').slideToggle();
		if(thisButton.is('.new-address')){
			thisButton.siblings('button').fadeIn();
		} else if (addressBox.hasClass('add-new-address')){
			thisButton.fadeOut();
		} else {
			callbackFadeSwitch(thisButton, nextButton);
		}
	};

	// Deliver instructions initial max length and placeholder
	var leaveBoxSelector = $('.leave-box-select')
	var leaveBoxOptionSelected = leaveBoxSelector.val() && leaveBoxSelector.val().toLowerCase();
	var leaveBoxInput = leaveBoxSelector.siblings('.leave-box-custom').children('.leave-box-input');
	if (leaveBoxOptionSelected === 'neighbour') {
		leaveBoxInput.attr('maxlength', '10');
		leaveBoxInput.attr('placeholder', 'Door number');
		leaveBoxInput.rules( 'add', {
			minlength: 1,
			maxlength: 10
		});
	}
	if (leaveBoxOptionSelected === 'other') {
		leaveBoxInput.attr('maxlength', '50');
		leaveBoxInput.attr('placeholder', 'Where should we leave your box?');
		leaveBoxInput.rules( 'add', {
			minlength: 5,
			maxlength: 50
		});
	}

	// Delivery instructions change
	$('.leave-box-select').change(function() {
		var thisSelect = $(this);
		var selected = thisSelect.val();
		var leaveBoxCustom = thisSelect.siblings('.leave-box-custom');
		var leaveBoxInput = leaveBoxCustom.children('.leave-box-input');
		if (selected !== 'Other' && selected !== 'Neighbour') {
			leaveBoxCustom.slideUp();
			leaveBoxInput.removeAttr('required');
			leaveBoxInput.val('');
			return;
		}
		leaveBoxInput.attr('data-selected', selected);
		leaveBoxInput.attr('required', 'true');
		leaveBoxInput.val('');
		if (selected === 'Neighbour') {
			leaveBoxInput.siblings('.leave-box-text').slideUp();
			leaveBoxInput.attr('maxlength', '10');
			leaveBoxInput.attr('placeholder', 'Door number');
			leaveBoxInput.rules( 'add', {
				minlength: 1,
				maxlength: 10
			});
		} else {
			leaveBoxInput.siblings('.leave-box-text').slideDown();
			leaveBoxInput.attr('maxlength', '50');
			leaveBoxInput.attr('placeholder', 'Where should we leave your box?');
			leaveBoxInput.rules( 'add', {
				minlength: 5,
				maxlength: 50
			});
		}
		leaveBoxCustom.slideDown();
	});

	var humanizeCardError = function (error) {
		switch (error) {
			case '\'card_number\' format invalid':
				return 'The card number is invalid.';
				break;
			case '\'card_expires\' format invalid':
				return 'The card expiry date is invalid.';
				break;
			default:
				return 'Your card information is not valid';
				break;
		}
		return error;
	};

	function updateBalanceView(balance) {
		var textColor = '';
		var minusSign = '';
		var $textPositif = $('#account-balance-positif');
		var $textNull = $('#account-balance-null');

		balance = parseFloat(balance);

		if (balance > 0) {
			textColor = ' text-success';
			$textPositif.show();
			$textNull.hide();
		} else if (balance < 0){
			textColor =  ' text-danger';
			$textPositif.hide();
			$textNull.hide();
		} else {
			$textPositif.hide();
			$textNull.show();
		}

		$('#account-balance').html('<p class="pull-right detail-title' + textColor + '">' + '&pound;' + balance + '</p>');
	}

	//Submit update on name/phone/email or payment info
	$('.account-form').on('submit', function(e){
		e.preventDefault();
		var form = $(this);
		var container = form.closest('.details-section-row');
		var postData = form.serializeArray();
		form.find('.detail-error').hide();
		var submitBtn = form.find('input[type=submit]');
		submitBtn.prop('disabled', true);
		$.post(form.prop('action'), postData).done(function(data){
			if(data.status === 'ok'){
				var newTitle = '';
				if (form.attr('id') === 'account-payment-card' && typeof data.data.method.data.card_number_masked !== 'undefined') {
					updateBalanceView(data.balance);
					newTitle = data.data.method.data.card_number_masked;
				} else {
					$.each(postData, function (index, object) {
						if (object.name !== '_token') {
							newTitle = newTitle + object.value + ' ';
						}
					});
				}
				container.find('.detail-original').text(newTitle);
				switchAccountForm(container);
			} else {
				if (typeof data.error === 'undefined') {
					return;
				}
				try {
					var errors = $.parseJSON(data.error);
					$.each(errors, function(index, object){
						var errorEl = $('.detail-error[data-for="' + index + '"]');
						errorEl.text(humanizeCardError(object[0]));
						errorEl.show();
					});
				} catch (e) {
					var errorEl = $('.detail-error[data-for=general]');
					errorEl.text(humanizeCardError(data.error));
					errorEl.show();
				}
			}
			submitBtn.prop('disabled', false);
		});
	});

	var switchAccountForm = function(container){
		var detailHeading = container.find('.change-detail-heading');
		var thisButton = detailHeading.find('button:visible');
		var nextButton = thisButton.siblings('button');
		thisButton.prop('disabled', true);
		nextButton.prop('disabled', false);
		var detailsSectionRow = thisButton.closest('.details-section-row');
		var detailForm = detailsSectionRow.children('.change-detail-form');
		var detailTitle = thisButton.siblings('.detail-title');
		var detailOriginal = thisButton.siblings('.detail-original');
		keepMinHeight(detailOriginal, detailTitle);
		detailForm.slideToggle();
		callbackFadeSwitch(thisButton, nextButton);
		if(detailTitle.is(':visible')){
			callbackFadeSwitch(detailTitle, detailOriginal);
		} else {
			callbackFadeSwitch(detailOriginal, detailTitle);
		}
	};

	$('#account-reset-password').on('submit', function(e){
		e.preventDefault();
		var form = $(this);
		var resetSubmit = form.find('input[type=submit]');
		$.post(form.prop('action'), []).done(function(data){
			if(data.status === 'ok'){
				resetSubmit.val('Email Sent');
				resetSubmit.text('Email Sent');
				resetSubmit.prop('disabled', true);
			} else {
				// do nothing
			}
		});
	});

	// Cancel Account Modal
	$('#show-cancel-modal').on('click', function(e) {
		e.preventDefault();
		$('#cancel-account-modal').modal('show');
		var subscription = $('#cancel-account-modal').data('subscription');
		if ($('#cancel-account-modal').data('subscription') === 'active') {
			$('#subscription-content').removeClass('hide-soft');
			$('#subscription-cancel-confirm').addClass('hide-soft');
			$('#subscription-cancel-confirm-footer').addClass('hide-soft');
		}
	});
	$('#cancel-confirm').on('click', function(e) {
		e.preventDefault();
		$('#subscription-content').addClass('hide-soft');
		$('#subscription-cancel-confirm').removeClass('hide-soft');
		$('#subscription-cancel-confirm-footer').removeClass('hide-soft');
		var title = $('#subscription-cancel-confirm-header').get(0);
		$('#subscription-content-header').get(0).replaceWith(title);
	});
	$('#cancel-with-free-box').on('click', function() {
		var modalBody = $(this).closest('.modal-body');
		callbackFadeSwitch(modalBody.children('#subscription-content'), modalBody.children('#free-box-content'));
	});
};

$(document).ready(function() {
	detailsModule();
});
