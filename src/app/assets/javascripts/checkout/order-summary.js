/**
 * @fileoverview Order summary for checkout
 */

(function() {
	'use strict';

	//Find out the correct ID depending on mobile/desktop
	var promocode;
	var typingTimer;
	var doneTypingInterval = 500;

	function showPromoValid(data) {
		$('.ordersummary-promocode')
				.attr('data-valid-code', 'true')
				.removeClass('text-danger')
				.addClass('text-success');
		$('.ordersummary-promoerror').hide();
		$('.ordersummary-discount-wrapper').hide();
		$('.ordersummary-voucher-applied').show();
		$('.ordersummary-discount-line').text('-£' + parseFloat(data.discount).toFixed(2));
		$('.ordersummary-priceportion').text('£' + parseFloat(data.price_per_portion_discounted).toFixed(2));
		$('#promocode').val(promocode.val()); //Hidden field value send to BE
	}

	function showPromoInvalid() {
		$('.ordersummary-promocode')
			.attr('data-valid-code', 'false')
			.removeClass('text-success')
			.addClass('text-danger');
		$('.ordersummary-promoerror').show();
		$('.ordersummary-voucher-applied').hide();
		$('.ordersummary-priceportion').text($('#price-per-portion-ref').text());
		$('#promocode').val(''); //Hidden field value send to BE
	}

	function showSessionInvalid() {
		$('#session-expired-modal').modal('show');
	}

	function showPromoEmpty() {
		$('.ordersummary-promocode')
			.attr('data-valid-code', 'true')
			.removeClass('text-danger text-success');
		$('.ordersummary-promoerror').hide();
		$('.ordersummary-voucher-applied').hide();
		$('.ordersummary-priceportion').text($('#price-per-portion-ref').text());
		$('#promocode').val(''); //Hidden field value send to BE
	}

	function updateTotalToPay(price) {
		$('.ordersummary-total').text('£' + parseFloat(price).toFixed(2));
	}

	function updateDeliveryPrice(price) {
		if (price === '0.00') {
			price = 'FREE';
		} else {
			price = '£' + price;
		}

		$('#delivery-cost').text(price);
	}

	function doneTyping() {
		var recipeIds = [];
		$('input[name="recipes[]"]').each(function() {
			recipeIds.push($(this).val());
		});
		var tariff;
		if($('.checkout').find('input[name=tariff_id]').length > 0){
			tariff = $('.checkout').find('input[name=tariff_id]').val();
		}
		var postData = {
			order_id: $('input[name=order_id]').val(),
			promocode: promocode.val(),
			tariff_id: tariff,
			recipes: recipeIds,
			delivery_slot_id: $('#ordersummary-delivery-date').data('delivery-slot-id')
		};

		$.ajax({
			type: 'POST',
			url: '/order/preview',
			data: postData,
			success: function(data) {
				if (!$.isEmptyObject(data) && data.can_apply_promotion_code === true) {
					if (promocode.val()) {
						showPromoValid(data);
					} else {
						showPromoEmpty(data);
					}
				} else {
					showPromoInvalid();
				}
				updateDeliveryPrice(data.delivery_total);
				updateTotalToPay(data.total);
			},
			error: function(e) {
				var errorType = e.responseJSON.errors && e.responseJSON.errors.length ?
					e.responseJSON.errors[0].error :
					'promo-invalid';

				switch (errorType) {
					case 'session-timeout':
						showSessionInvalid();
						break;
					default:
						showPromoInvalid();
				}
			}
		});
	}

	function hideDiscountCTA(itemThis) {
		itemThis.hide();
		$('.ordersummary-discount-default').hide();
		$('.ordersummary-discount').show();
		$('.ordersummary-change-discount').hide();
	}

	$('.ordersummary-discount-btn, .ordersummary-change-discount').click(function() {
		hideDiscountCTA($(this));
	});

	$('.ordersummary-discount-default').click(function() {
		promocode.val(window.defaultDiscountCode);
		hideDiscountCTA($('.ordersummary-discount-btn'));
		doneTyping();
	});

	$('#deliveryslot-container').on('change', 'input', function(e){
		$('#ordersummary-delivery-date').data('delivery-slot-id', $(e.target).val());
		doneTyping();
	});

	$('.ordersummary-promocode').keyup(function() {
		promocode = $(this);
		$('.ordersummary-promocode').val(promocode.val()); //Copy in the other field
		clearTimeout(typingTimer);

		promocode.attr('data-valid-code', 'false');
		typingTimer = setTimeout(doneTyping, doneTypingInterval);
	});

	// If a promocode is automatically applied,
	// check validity at the start of loading checkout
	$(document).ready(function() {
		promocode = $('.ordersummary-promocode');
		if (promocode.val() && promocode.val().length > 0) {
			doneTyping();
		}
	});
	if($('#ordersummary-box.twr').length){
		var targetOrderSummary = $('#ordersummary-box');
		var boxPriceHrTop = $('#ordersummary-box-price').offset().top;
		var orderSummaryWidth = $('#ordersummary-box').width();
		$(window).on('scroll', function(){
			if($(this).width() > 767){
				var scrollTop = $(this).scrollTop();
				//capture and set the width, it will be lost when setting fixed otherwise
				if(scrollTop > boxPriceHrTop && orderSummaryWidth > 0) {
					targetOrderSummary.addClass('sticky');
					var newTop = $('.ordersummary-box-content').height() - 240;
					targetOrderSummary.css({
						'top': '-' + newTop + 'px',
						'width': orderSummaryWidth + 'px'
					});
				} else {
					targetOrderSummary.removeClass('sticky');
					targetOrderSummary.css('top', '');
					targetOrderSummary.css('width', '');
				}
			} else {
				targetOrderSummary.removeClass('sticky');
				targetOrderSummary.css('top', '');
				targetOrderSummary.css('width', '');
			}
		});
	}

	$('.ordersummary-fixedbottom-click').click(function() {
		var wrapper = $('.ordersummary-fixedbottom-wrapper');
		$('.ordersummary-fixedbottom-openbtn').toggleClass('scrollup');
		wrapper.scrollTop(0).toggleClass('open');
		$('.ordersummary-fixedbottom-closebtn').toggle();

		if(wrapper.hasClass('open') && Modernizr.mq('(max-width: 768px)')){
			$('.page-wrapper').css({
				'height': $(window).height(),
				'overflow': 'hidden'
			});
		} else {
			$('.page-wrapper').css({
				'height': '',
				'overflow': ''
			});
		}
	});

})();
