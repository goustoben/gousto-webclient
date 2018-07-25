(function() {
	'use strict';

	// Recipe ratings
	var showBadRatingModal = true;
	var showGoodRatingModal = true;
	var ratedRecipes = {};
	var numRatedRecipes = 0;
	var totalRatingScore = 0;
	function fillStars(thisStar, color) {
		thisStar.prevAll().addBack().toggleClass(color);
	}
	$('.star').hover(
		function() {
			fillStars($(this), 'gold_light');
		}
	);
	$('.star').on('click', function(e) {
		e.preventDefault();
		var thisStar = $(this);
		var thisForm = thisStar.closest('.recipe-rating-form');
		var meaningText = thisForm.find('.recipe-rating-meaning');
		thisStar.siblings().addBack().removeClass('gold');
		meaningText.html(thisStar.data('content')).slideDown();
		fillStars(thisStar, 'gold');
		thisForm.find('input[name=recipe-rating]').val(thisStar.data('value'));
		thisForm.find('.recipe-rating-btn').removeAttr('disabled');
	});
	function checkAverageRating(form) {
		var ratingValue = form.find('input[name=recipe-rating]').val();
		ratedRecipes[form.data('recipe-id')] = ratingValue;
		numRatedRecipes++;
		totalRatingScore += parseInt(ratingValue, 10);
		if(numRatedRecipes > 2){
			var averageRating = totalRatingScore / numRatedRecipes;
			if(averageRating < 2.5 && showBadRatingModal === true){
				$('#bad-rating-modal').modal('show');
				showBadRatingModal = false;
			} else if(averageRating > 4 && showGoodRatingModal === true){
				$('#good-rating-modal').modal('show');
				showGoodRatingModal = false;
			}
		}
	}
	function decrementRatingsBadge() {
		var badge = $('#ratings-badge');
		var numToRate = parseInt(badge.html(), 10);
		if(numToRate === 1){
			badge.html('');
		} else {
			numToRate--;
			badge.html(numToRate.toString());
		}
	}
	function removeHtmlTag(str) {
        var getHtmlTag = /(<([^>]+)>)/ig;
        return str.replace(getHtmlTag, '');
	}
	$('.recipe-rating-form').on('click', '.recipe-rating-btn', function(e) {
		e.preventDefault();
		var thisButton = $(this);
		var form = thisButton.closest('form');
		form.find('.star').off().css('cursor', 'default');
		var l = Ladda.create(thisButton.get(0));
		l.start();
		var formData = form.serializeArray().map(function(formParam) {
			var paramValue = removeHtmlTag(formParam.value);
			formParam.value = paramValue;
			return formParam;
		});
		$.post(form.attr('action'), formData)
			.success( function() {
				form.find('.star:not(.gold)').remove();
				var commentsSection = form.children('.recipe-rating-comments');
				var inputTextArea = commentsSection.children('textarea[name=recipe-review]');
				var saveRatingTextValue = removeHtmlTag(inputTextArea.val());
				var saveText = commentsSection.children('.saved-rating-text');
				saveText.html(saveRatingTextValue);
				callbackFadeSwitch(inputTextArea, saveText);
				thisButton.slideUp();
				decrementRatingsBadge();
				checkAverageRating(form);
			})
			.always( function() {
				l.stop();
			});
	});
	// Mobile ratings
	$('.view-order-rating, .hide-order-rating').on('click', function(e){
		e.preventDefault();
		var thisButton = $(this);
		var nextButton = thisButton.siblings('button');
		thisButton.prop('disabled', true);
		nextButton.prop('disabled', false);
		var orderRatingsRow = thisButton.closest('.order-rating-row');
		orderRatingsRow.toggleClass('active');
		orderRatingsRow.children('.mobile-collapse').toggleClass('closed');
		callbackFadeSwitch(thisButton, nextButton);
	});
	// Bad rating modal
	$('.contact-me').on('click', function() {
		var thisButton = $(this);
		var bothButtons = $('.contact-me').prop('disabled', true);
		var l = Ladda.create(thisButton.get(0));
		l.start();
		var postData = {
			type: thisButton.data('type'),
			recipes: ratedRecipes
		};
		$.post('/notifyInternal', postData)
			.success( function() {
				var modalBody = thisButton.closest('.modal-body');
				var modalDialog = modalBody.closest('.modal-dialog');
				modalBody.find('#contact-type').html(thisButton.data('type'));
				keepMinHeight(modalDialog, modalDialog);
				callbackFadeSwitch(modalBody.children('#contact-original'), modalBody.children('#contact-response'));
			})
			.always( function() {
				l.stop();
				bothButtons.prop('disabled', false);
			});
	});
	// End recipe ratings

})();
