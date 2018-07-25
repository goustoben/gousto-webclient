(function() {
	'use strict';

	var successSection = $('#email-success');
	var formSection = $('#email-form-section');

	$('#share-buttons').find('> .btn').click(function() {
		var nextPageLink = $('#next-page');
		nextPageLink.addClass('continue');
		nextPageLink.html('Continue &gt;&gt;');
	});

	$('.refersocial-btn--facebook').click(function(e) {
		e.preventDefault();
		if (typeof user_name === 'undefined') {
			if ($(this).attr('data-username').length) {
				var user_name = $(this).attr('data-username');
			}
		}
		if (typeof referral_code === 'undefined') {
			if ($(this).attr('data-referralcode').length) {
				var referral_code = $(this).attr('data-referralcode');
			}
		}
		if (typeof whats_for_them === 'undefined') {
			if ($(this).attr('data-whatsforthem').length) {
				var whats_for_them = $(this).attr('data-whatsforthem');
			}
		}
		if (typeof image === 'undefined') {
			if ($(this).attr('data-image').length) {
				var image = $(this).attr('data-image');
			}
		}
		var uri = 'https://www.gousto.co.uk/join?promo_code=' + referral_code;
		var params = {
			method: 'share',
			href: uri,
			redirect_uri: uri,
			title: "Get 3 delicious meals for just £9.99!",
			picture: image,
			description: "Thanks to Gousto, I'm cooking delicious recipes every week, and you can too! Use my personal code "+referral_code+" and get up to &pound;"+whats_for_them+" off your first box."
		};

		if (window.dataScienceDataLayer) {
			window.dataScienceDataLayer.push({
				event: 'userAction',
				category: 'ReferFriend',
				actionType: 'ReferFriendCode Share',
				actionValue: '{"channel":"facebook"}',
				pathname: window.location.pathname,
				version: 2,
			})
		}

		FB.ui(params, function(response) {
			if (window.dataScienceDataLayer && response && !response.error_message) {
				window.dataScienceDataLayer.push({
					event: 'userAction',
					category: 'ReferFriend',
					actionType: 'ReferFriendCode Shared',
					actionValue: '{"channel":"facebook"}',
					pathname: window.location.pathname,
					version: 2,
				})
			}
		});
	});

	$('.refersocial-btn--facebook-messenger').click(function(e) {
		e.preventDefault();
		if (typeof user_name === 'undefined') {
			if ($(this).attr('data-username').length) {
				var user_name = $(this).attr('data-username');
			}
		}
		if (typeof referral_code === 'undefined') {
			if ($(this).attr('data-referralcode').length) {
				var referral_code = $(this).attr('data-referralcode');
			}
		}
		var uri = 'https://www.gousto.co.uk/join?promo_code=' + referral_code;
		var params = {
			method: 'send',
			link: uri,
			redirect_uri: uri,
			message: "I enjoy cooking Gousto and think you should give it a try! I'm discovering new recipes and getting all the top-quality, pre-measured ingredients to cook them delivered straight to my home. Click on " + uri + " and get up to £25 off your first box. That's 3 meals for just £9.99, don't miss it!"
		};

		if (window.dataScienceDataLayer) {
			window.dataScienceDataLayer.push({
				event: 'userAction',
				category: 'ReferFriend',
				actionType: 'ReferFriendCode Share',
				actionValue: '{"channel":"facebook-messenger"}',
				pathname: window.location.pathname,
				version: 2,
			})
		}
		
		FB.ui(params, function(response) {
			if (window.dataScienceDataLayer && response && !response.error_message) {
				window.dataScienceDataLayer.push({
					event: 'userAction',
					category: 'ReferFriend',
					actionType: 'ReferFriendCode Shared',
					actionValue: '{"channel":"facebook-messenger"}',
					pathname: window.location.pathname,
					version: 2,
				})
			}
		});
	});

	$('#send-refer-a-friend').not('#refer-section #send-refer-a-friend').click(function(e) {
		e.preventDefault();
		var form = $(this).closest('form');
		var filters = form.serialize();

		formSection.fadeOut('fast', function() {
			successSection.fadeIn();
		});

		$.post(form.attr('action'), filters);
	});

	$('#invite-more-friends').click(function(e) {
		e.preventDefault();
		$('input[type="email"]').val('');
		$('input[type="text"]').val('');
		successSection.fadeOut('fast', function() {
			formSection.fadeIn();
		});
	});

	$('.refersocial-btn--twitter').click(function() {
		var width = 600,
			height = 255,
			left = ($(window).width() - width) / 2,
			top = ($(window).height() - height) / 2,
			url = this.href,
			opts = 'status=1' +
			',width=' + width +
			',height=' + height +
			',top=' + top +
			',left=' + left;

		window.open(url, 'twitter', opts);

		return false;
	});

})();
