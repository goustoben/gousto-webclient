(function () {
	'use strict';

	// Order address update show/hide
	$(document).on('click', '.update-order-address, .cancel-order-address', function (e) {
		e.preventDefault();
		var thisButton = $(this);
		var nextButton = thisButton.siblings('button');
		thisButton.prop('disabled', true);
		nextButton.prop('disabled', false);
		thisButton.closest('.order-address').children('.order-choose-address').slideToggle();
		window.callbackFadeSwitch(thisButton, nextButton);
	});

	//Cancel an order
	$(document).on('click', 'a.order-cancel', function (clickEvent) {
		clickEvent.preventDefault();
		var href = this.href;
		var msg = 'Are you sure you wish to cancel this order?';
		if (typeof alertify !== 'undefined') {
			alertify.set({
				labels: {
					ok: 'Yes, cancel my order',
					cancel: 'No, I want to keep this order'
				}
			});
			alertify.confirm(msg, function (e) {
				if (e) {
					window.location.href = href;
				}
			});
		} else {
			if (window.confirm(msg)) {
				window.location.href = href;
			}
		}
	});

	function scrollOrderTop(summaryContainer) {
		$('html, body').animate({
			scrollTop: summaryContainer.offset().top - 150
		}, {
			complete: function () {
				summaryContainer.css('min-height', 0);
			}
		});
	}

	//Desktop: Switch displayed order
	$('.orders-sidebar-item a, .orders-list-item a').on('click', function (e) {
		e.stopPropagation();
	});
	$('.orders-sidebar-item, .orders-list-item').on('click', function (e) {
		e.preventDefault();
		var thisItem = $(this);
		var orderId = thisItem.attr('data-order-id');
		var orderItem = $('.order-container[data-order-id="' + orderId + '"]');
		var summaryContainer = orderItem.closest('#order-summary-container');
		thisItem.addClass('active');
		thisItem.siblings('.orders-sidebar-item, .orders-list-item').removeClass('active');
		window.keepMinHeight(summaryContainer, summaryContainer);
		$('.order-container:not([data-order-id="' + orderId + '"])').removeClass('displayed');
		window.setTimeout(function () {
			scrollOrderTop(summaryContainer);
			orderItem.addClass('displayed');
		}, 300);
	});

	//Mobile: Toggle Order details
	$('.view-order-summary, .hide-order-summary').on('click', function (e) {
		e.preventDefault();
		var thisButton = $(this);
		var nextButton = thisButton.siblings('button');
		thisButton.prop('disabled', true);
		nextButton.prop('disabled', false);
		window.callbackFadeSwitch(thisButton, nextButton);
		thisButton.closest('.order-container').toggleClass('displayed-mobile');
	});

	function changeOrderStateDetails(orderSummary, elementId) {
		var elements = orderSummary.find(elementId);
		elements.toggleClass('active');
	}

	function refreshContainer(containerName, hideContainerName, scrollTo, callback) {
		var container = $('#' + containerName);
		if (hideContainerName !== undefined) {
			$('#' + hideContainerName).slideUp(1000);
		}
		$.get(container.data('refresh-url'))
			.success(function (data) {
				if (data.result === 'ok') {
					container.html(data.html);
					if (hideContainerName !== undefined && hideContainerName !== false) {
						$('#' + hideContainerName).show();
					}
					if (typeof scrollTo !== 'undefined' && scrollTo === true) {
						$('html, body').animate({
							scrollTop: $(container).offset().top
						}, 500);
					}
				} else {
					// error retrieving refresh content
				}
				if (typeof callback === 'function') {
					callback();
				}
			});
	}

	// Skip order - Restore order
	$(document).on('click', '.delivery-skip-links, .delivery-skip-btns', function (e) {
		e.preventDefault();
		var l = Ladda.create($(this).get(0));
		l.start();
		var form = $(this).closest('form');
		var url = form.attr('action');
		var orderId = form.closest('[data-order-id]').attr('data-order-id');
		$.ajax({
			url: url,
			type: 'post',
			data: form.serializeArray(),
			complete: function (data) {
				if (typeof data.responseJSON.status !== 'undefined' && data.responseJSON.status === 'ok') {
					//toggle order summary btn and content
					var diplayedString = '';
					if ($(window).width() < 768) {
						diplayedString = '-mobile';
					}
					var orderSummary = $('.order-container.displayed' + diplayedString).find('.order-summary[data-order-id=' + orderId + ']');
					orderSummary.find('.delivery-skip-options').toggle();
					changeOrderStateDetails(orderSummary, '.projected-delivery-message');
					changeOrderStateDetails(orderSummary, '.mobile-order-status');

					//toggle list item btn and ribbon
					$('.orders-list-item[data-order-id=' + orderId + ']').find('.delivery-skip-options').toggle();

					//Check to activate all-skiped modal
					var orderCount = $('.order-container:not(.has-details)').length;
					var skippedCount = $('.order-container').find('.skipped-count:visible').length;
					if (orderCount === skippedCount) {
						//user has skipped all projected deliveries
						refreshContainer('skipped-all-modal', false, false, function () {
							$('#skipped-all-modal').modal('show');
						});
					}
				}
				l.stop();
			}
		});
	});

	// CHOOSE ADDRESS FORM
	// Switch default address from list
	$(document).on('click', '.address-check-box', function (e) {
		e.preventDefault();
		var thisCheckBox = $(this);
		var thisAddress = thisCheckBox.closest('.address-box');
		if (thisAddress.hasClass('active')) {
			return;
		}

		var thisButton = thisCheckBox.closest('button');
		var formURL = thisButton.siblings('form.address-checkbox-form').attr('action');

		var $order = thisCheckBox.closest('.order-container');
		if ($order.data('premium-delivery') === 1 && thisAddress.data('premium-delivery') === 0) {
			var $confirmModal = $('#remove-premium-delivery-address-modal');
			$confirmModal.find('#change-order-address-button').data('url', formURL);
			$confirmModal.modal('show');
			return;
		}

		thisButton.attr('disabled', 'disabled');
		var selectedAddressName = thisCheckBox.closest('.choose-address-section').find('.selected-address-name');
		$.post(formURL)
			.success(function (response) {
				if (response.status === 'ok') {
					thisAddress.addClass('active');
					thisCheckBox.children('.glyphicon').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
					thisAddress.siblings('#default-address').children().val('');
					var oldAddress = thisAddress.siblings('.active');
					oldAddress.find('.address-check-box').children('.glyphicon').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
					oldAddress.removeClass('active');
					oldAddress.find('.address-delete').prop('disabled', false);
					thisCheckBox.siblings('.address-delete').prop('disabled', true);
					selectedAddressName.html(thisAddress.find('.address-name').html());
					$('.cancel-order-address').click();
					var modal = $('#change-default-address-modal');
					modal.find('.modal-footer').remove();
					modal.find('.modal-body').replaceWith(response.data);
					modal.modal('show');
				}
			})
			.always(function () {
				thisButton.removeAttr('disabled');
			});
	});

	// Change address for premium delivery order via modal
	$('#remove-premium-delivery-address-modal').on('click', '#change-order-address-button', function () {
		var $button = $(this);
		var l = Ladda.create($button.get(0));
		l.start();
		var formURL = $button.data('url');
		$.post(formURL)
			.success(function () {
				location.reload();
			})
			.always(function () {
				l.stop();
			});
	});

	$(document).on('click', '.address-box.billing-address-button', function (e) {
		e.preventDefault();
		var form = $(this).find('form');
		$.post(form.attr('action'), form.serializeArray())
			.success(function (data) {
				if (typeof data.created !== 'undefined') {
					var container = form.closest('.details-section-row');
					container.find('.detail-original').text(window.getAddressString(data.created));
				}
			})
			.always(function () {
				form.closest('.details-section-row').find('.detail-cancel').click();
			});
	});

	$('[skip-handler-order-number]').on('click', function() {
		var skip = $(this);
		var handler = parseInt(skip.attr('skip-handler-order-number'));

		switch(handler) {
			case 2:
				hj('trigger', 'skip-projected-second-box-poll');
				break;
			case 3:
				hj('trigger', 'skip-projected-third-box-poll');
				break;
			case 4:
				hj('trigger', 'skip-projected-fourth-box-poll');
				break;
			case (handler > 4):
				hj('trigger', 'skip-projected-more-than-fourth-box-poll');
				break;
		}

	});

	$('[cancel-handler]').on('click', function() {
		var skip = $(this);
		var handler = skip.attr('cancel-handler');

		switch(handler) {
			case 'isFirstPendingWithNoRecipes':
				hj('trigger', 'cancel-pending-first-empty-box-poll');
				break;
			case 'isFirstPendingWithRecipes':
				hj('trigger', 'cancel-pending-first-box-poll');
				break;
			case 'isSecondPendingWithNoRecipes':
				hj('trigger', 'cancel-pending-second-empty-box-poll');
				break;
			case 'isSecondPendingWithRecipes':
				hj('trigger', 'cancel-pending-second-box-poll');
				break;
			case 'isThirdPendingWithNoRecipes':
				hj('trigger', 'cancel-pending-third-empty-box-poll');
				break;
			case 'isThirdPendingWithRecipes':
				hj('trigger', 'cancel-pending-third-box-poll');
				break;
			case 'isFourthPendingWithNoRecipes':
				hj('trigger', 'cancel-pending-fourth-empty-box-poll');
				break;
			case 'isFourthPendingWithRecipes':
				hj('trigger', 'cancel-pending-fourth-box-poll');
				break;
			case 'isPendingWithNoRecipes':
				hj('trigger', 'cancel-pending-more-than-fourth-empty-box-poll');
				break;
			case 'isPendingWithRecipes':
				hj('trigger', 'cancel-pending-more-than-fourth-box-poll');
				break;
		}
	});

})();
