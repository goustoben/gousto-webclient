(function() {
	'use strict';

	var inputCode = $('#input-discount-code');
	var saveSessionOrBasket = 'session';
	var $errorText = $('#promoapply-error');

	function displayErrorDiscountcode(error) {
		inputCode.addClass('error').removeClass('success');
		if (error === 'Max use reached') {
			$errorText.text('Oops! That code has been all used up.');
		} else {
			$errorText.text('Invalid Voucher');
		}
		$errorText.show();
	}

	function hideErrorDiscountcode() {
		inputCode.removeClass('error');
		$('#promoapply-error').hide();
	}

	//Get the discount value and set it to the basket (local)
	function setDiscountValueBasket(promocode) {
		if (promocode.length <= 30) {
			var tariff;
			if (typeof window.basket.tariffDetails() !== 'undefined') {
				tariff = window.basket.tariffDetails().id;
			}
			$.ajax({
				url: '/prices',
				type: 'GET',
				data: {
					'promocode': promocode,
					'save_promo': true,
					'tariff_id' : tariff
				},
				success: function(res) {
					if (!res.error) {
						var numRecipes;
						if(window.basket.items().length < 2) {
							numRecipes = 2;
						} else {
							numRecipes = window.basket.items().length;
						}
						if(typeof res.boxes[window.basket.numPortions()][numRecipes][window.basket.boxType()].promo_code !== 'undefined') {
							window.basket.discountCode(promocode);
							window.basket.boxPrices.removeAll();
							window.basket.boxPrices.push(res.boxes);
							if (res.boxes[window.basket.numPortions()][numRecipes][window.basket.boxType()].promo_code === false) {
								displayErrorDiscountcode();
							} else {
								inputCode.removeClass('error').addClass('success');
								var discountValueString = '';
								var discountValue = res.boxes[window.basket.numPortions()][numRecipes][window.basket.boxType()].recipe_discount;
								if (discountValue == res.boxes[window.basket.numPortions()][numRecipes][window.basket.boxType()].recipe_total) {
									discountValueString = $.parseHTML('Your voucher entitles you to a <b>FREE</b> scrummy Gousto box.');
								} else {
									discountValueString = $.parseHTML('Your <b>£' + discountValue + '</b> welcome voucher has been automatically applied to your account and you’re ready to order.');
								}
								$('#promoapply-saving-value').html(discountValueString);
								$('#step-enter-voucher').hide();
								$('#step-confirmation').show();
							}
						} else {
							displayErrorDiscountcode();
						}
					} else {
						displayErrorDiscountcode(res.error);
					}
				}
			});
		} else {
			displayErrorDiscountcode();
		}
	}

	//Get the discount value and set it to the Session (saved beetween pages)
	function setDiscountValueSession(promocode) {
		$.ajax({
			url: '/promotion/setSession',
			type: 'POST',
			data: {
				'promocode': promocode
			},
			success: function(res) {
				if (!res.error) {
					var discountValueString = '';
					if (typeof res.data.details['discount-whole-order-percent'] !== 'undefined') {
						discountValueString = parseInt(res.data.details['discount-whole-order-percent']) + '%';
					} else if (typeof res.data.details['discount-whole-order-amount'] !== 'undefined') {
						discountValueString = '£' + parseInt(res.data.details['discount-whole-order-amount']);
					}

					if (discountValueString !== '') {
						inputCode.removeClass('error').addClass('success');
						var discountAppliedInfo;
						if (discountValueString === '100%') {
							discountAppliedInfo = 'Spiffing! Your 1st box is free';
							discountValueString = $.parseHTML('Your voucher entitles you to a <b>FREE</b> scrummy Gousto box.');
						} else {
							discountAppliedInfo = 'Spiffing! Your 1st box is ' + discountValueString + ' off';
							discountValueString = $.parseHTML('Your <b>' + discountValueString + '</b> welcome voucher has been automatically applied to your account and you’re ready to order.');
						}
						$('#promoapply-saving-value').html(discountValueString);
						$('#step-enter-voucher').hide();
						$('#step-confirmation').show();

						$('#home-no-voucher').hide();
						$('#home-valid-voucher').text(discountAppliedInfo);
					} else {
						displayErrorDiscountcode();
					}
				} else {
					displayErrorDiscountcode();
				}
			}
		});
	}

	//Choose if save it to the session or basket
	function chooseSessionOrBasket(promocode) {
		if (saveSessionOrBasket === 'localSession') {
			setDiscountValueSession(promocode);
			if (typeof localSession !== 'undefined') {
				localSession.set('promo', promocode);
			}
		} else if (saveSessionOrBasket === 'session') {
			setDiscountValueSession(promocode);
		} else {
			setDiscountValueBasket(promocode);
		}
	}

	//Submit a voucher code on claim button click
	$('#submit-discount-code').on('click', function() {
		chooseSessionOrBasket($('#input-discount-code').val().toUpperCase());
	});

	//Submit a voucher code on keyboard 'enter'
	var promoApplyError = $('#promoapply-error');
	$(document).on('keypress', '#input-discount-code', function(e) {
		if (promoApplyError.is(':visible')) {
			hideErrorDiscountcode();
		}

		var code = e.keyCode || e.which;
		if (code === 13) { //user hit enter in the discount input
			e.preventDefault();
			chooseSessionOrBasket($(this).val().toUpperCase());
			return false;
		}
	});

	//Remove voucher if the user erase voucher
	inputCode.on('blur', function() {
		if ($(this).val() === '') {
			chooseSessionOrBasket('');
		}
	});

	//Set default discount code
	$('.get-default-voucher').click(function(event) {
		saveSessionOrBasket = $(event.currentTarget).data('save');
		chooseSessionOrBasket(window.defaultDiscountCode);
		inputCode.val(window.defaultDiscountCode);
	});

	//Reset modal views on show
	$('#promo-apply-modal').on('show.bs.modal', function(event) {
		var recipient = $(event.relatedTarget).data('step');
		saveSessionOrBasket = $(event.relatedTarget).data('save');
		$('.promoapply-step').hide();
		$('#' + recipient).show();
		hideErrorDiscountcode();
	});

	//Set page to the edit discount page
	$('#edit-voucher').click(function() {
		$('#step-existing-voucher').hide();
		$('#step-enter-voucher').show();
		inputCode.val('');
	});
})();
