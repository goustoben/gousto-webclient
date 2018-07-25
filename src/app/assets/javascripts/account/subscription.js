/**
 * require account.js
 */

(function() {
	'use strict';

	var savingTimer;
	var savingWaitInterval = 1500;

	//Save subscription change
	function saveSubscription() {
		var form = $('#subscription-form');
		$.post(form.attr('action'), form.serializeArray())
		.success(function(response) {
			if(response.status === 'ok'){
				$('#subscription-update-success').fadeIn().delay(3000).fadeOut();
				if(response.data.showModal === true){
					var $modal = $('#subscription-update-success-modal');
					if($modal.length > 0){
						$modal.remove();
					}
					$('body').append(response.data.newModal);
					$modal = $('#subscription-update-success-modal');
					$modal.modal('show');
				}
			} else {
				$('#subscription-update-error').fadeIn().delay(6000).fadeOut();
			}
		});
	}

	//Timer to control multi click on subscription details
	function saveSubscriptionTimer() {
		clearTimeout(savingTimer);
		savingTimer = setTimeout(saveSubscription, savingWaitInterval);
	}

	function updateForm(e) {
		e.preventDefault();
		var el = $(this);
		$('#' + el.data('target')).val(el.data('value')).change();
		el.closest('ul').find('.subscription-form-choice').removeClass('active');
		el.addClass('active');
		saveSubscriptionTimer();
	}

	// Edit subscription form
	$('button.subscription-form-choice').on('click', updateForm);
	$('select.subscription-form-choice').on('change', updateForm);

	//Change vegetarian choice
	$('.vegetarian-checkbox').on('change', function(){
		var el = $(this);
		var checked = el.prop('checked');
		if(checked){
			$('#box-type').val('vegetarian').change();
			$('.vegetarian-checkbox').prop('checked', true);
		} else {
			$('#box-type').val('gourmet').change();
			$('.vegetarian-checkbox').prop('checked', false);
		}
		saveSubscriptionTimer();
	});

	//Change Delivery slots
	$('#delivery-slot-id').on('change', function(){
		var el = $(this);
		var dateFrom = $('#start-date-input');
		var deliverySlotId = el.val();
		dateFrom.empty();
		var options = '';
		$.each(window.deliveryDays[deliverySlotId], function(value, label){
			var option = '<option value="' + value + '">' + label + '</option>';
			options = options + option;
		});
		dateFrom.append(options);
		dateFrom.val(dateFrom.find('option').first().prop('value'));
	});

	//Refresh price on Selection of Portions or Recipes
	$('.price-check').on('change', function(){
		var numPortions = $('#num_portions').val();
		var numRecipes = $('#num_recipes').val();
		var boxType = window.boxTypes[$('#box-type').val()];
		var newPrices = window.prices[numPortions][numRecipes][boxType];
		$('.account-heading').find('.num-recipes').text(numRecipes);
		$('.account-heading').find('.num-portions').text(numPortions);
		$('.portion-price').find('.price').text(newPrices.price_per_portion_discounted);
		$('.total-box-price').find('.price').text(newPrices.recipe_total_discounted);
		$('.num-recipes-price').each(function(){
			var el = $(this);
			var recipeCount = el.parent().data('value');
			var price = window.prices[numPortions][recipeCount][boxType].price_per_portion_discounted;
			el.text(price);
		});
	});

	// Refresh interval, delivery slot and cutoff values in summary text when they change
	$('#interval, #delivery-slot-id').on('change', function(){
		var interval = $('#interval option:selected').text();
		var deliveryDay = $('#delivery-slot-id option:selected').data('delivery-day');
		var deliveryCutoff = $('#delivery-slot-id option:selected').data('cutoff-day');
		$('.account-heading').find('.interval').text(interval);
		$('.account-heading').find('.delivery_slot').text(deliveryDay);
		$('.account-heading').find('.slot_cutoff').text(deliveryCutoff);
	});

	/** Pause my subscription section **/

	//Selection of pause my subscription params
	$('.account-subscription-pause-btn').on('click', function() {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('#subscription-hold-submit').prop('disabled', false);
	});

	function toggleSubscriptionPage() {
		$('.heading-text').slideToggle();
		$('#account-subscription-inactive').slideToggle();
		$('#account-subscription-details').toggleClass('is-disabled');
		$('#account-subscription-summary').slideToggle();
		$('#account-subscription-pause').slideToggle();
	}
	window.toggleSubscriptionPage = toggleSubscriptionPage

	//Reactivate Subscription
	$('#reactivate-subscription').on('click', function(e) {
		e.preventDefault();
		var thisButton = $(this);
		thisButton.prop('disabled', true);
		var l = Ladda.create(thisButton.get(0));
		l.start();
		$.post('my-subscription/reactivate')
			.success( function(response) {
				if(response.status === 'ok'){
					toggleSubscriptionPage();
					if (response.data.showModal === true) {
						var modal = $('#subscription-activate-success-modal');
						if (modal.length > 0){
							modal.remove();
						}
						$('body').append(response.data.newModal);
						modal = $('#subscription-activate-success-modal');
						modal.modal('show');
					}
				} else {
					$('#reactivation-error-modal').modal('show');
				}
			})
			.error( function() {
				$('#reactivation-error-modal').modal('show');
			})
			.always( function() {
				l.stop();
				thisButton.prop('disabled', false);
			});
	});

	//Cancel or Keep orders modal when subscription is paused
	function activateModalClickListener () {
		$('#cancel-orders-button').on('click', function() {
			var $this = $(this);
			var l = Ladda.create($this.get(0));
			l.start();
			var url = $this.data('url');
			$.post(url)
				.success(function() {
					var $modal = $this.closest('.modal');
					$modal.modal('hide');
				})
				.always(function() {
					l.stop();
				});
		});

		$('#keep-orders-button').on('click', function() {
			var $modal = $(this).closest('.modal');
			$modal.modal('hide');
		});
	}

	$('#skip_xmas').on('click', function(e) {
		e.preventDefault();
		var url = $(this).data('url');
		var l = $(this).ladda();
		l.ladda('start');
		$.get(url)
			.success(function(response) {
				if(response.status === 'ok'){
					window.location.href = response.data.redirect_url;
				}
			})
			.always(function() {
				l.ladda('stop');
			});
	});

})();
