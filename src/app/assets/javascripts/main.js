(function($, sr) {

	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function(func, threshold, execAsap) {
		var timeout;

		return function debounced() {
			var obj = this,
				args = arguments;

			function delayed() {
				if (!execAsap){
					func.apply(obj, args);
				}
				timeout = null;
			}

			if (timeout){
				clearTimeout(timeout);
			}else if (execAsap){
				func.apply(obj, args);
			}

			timeout = setTimeout(delayed, threshold || 100);
		};
	};
	// smartresize
	jQuery.fn[sr] = function(fn) {
		return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	};

})(jQuery, 'smartresize');

(function($, sr) {

	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function(func, threshold, execAsap) {
		var timeout;

		return function debounced() {
			var obj = this,
				args = arguments;

			function delayed() {
				if (!execAsap){
					func.apply(obj, args);
				}
				timeout = null;
			}

			if (timeout){
				clearTimeout(timeout);
			}else if (execAsap){
				func.apply(obj, args);
			}

			timeout = setTimeout(delayed, threshold || 100);
		};
	};
	// smartresize
	jQuery.fn[sr] = function(fn) {
		return fn ? this.bind('scroll', debounce(fn)) : this.trigger(sr);
	};

})(jQuery, 'smartscroll');

function readyFn(jQuery) {

	$('.question').popover();
	$('.checkout-fieldhint').click(function() {
		$(this).popover('show');
	});

	var setZendesk = zendesk(window.location.pathname)

	setZendesk.getZopim(function () {
		setZendesk.chatButton()
	})
}

$(document).ready(readyFn);

// Trigger voucher modal on landing page load

$(document).ready(function() {
	setTimeout(function() {
		$('#voucherModal').modal('show');
	}, 10);
});

// Open external links in a new window (not breaking Fancybox

$('a[href^="http:"], a[href^="https:"]').not('[href*="' + document.domain + '"]').attr('target', '_blank');

$('input, textarea').placeholder();

$(function() {
	$('[data-toggle="tooltip"]').tooltip();
});

$(document).on('click', '#back-to-top', function(e) {
	e.preventDefault();
	$('html,body').animate({
		scrollTop: 0
	});
});

function bindNewsletterSignup() {
	'use strict';
	var subscriberEmail, l;
	$(document).on('click', '.breadcrumbEmailSubmit', function(e) {
		var formid = $(this).closest('form');
		subscriberEmail = formid.find('.breadcrumbInputEmail:visible').val();
		l = Ladda.create(this);

		$('label.newslettererror').hide();
		$(formid).validate({
			onkeyup: false,
			onfocusout: false,
			messages: {
				EMAIL: {
					required: 'You must enter your e-mail address',
					email: 'Type a valid e-mail address'
				},
				FNAME: {
					required: 'You must enter your name'
				}
			},
			showErrors: function(errorMap, errorList) {
				$.each(this.successList, function(index, value) {
					return $(value).popover('hide');
				});
				return $.each(errorList, function(index, value) {
					$(value.element).popover({
						trigger: 'manual',
						placement: 'bottom',
						content: value.message,
						template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
					});
					$(value.element).popover('show');
					return setTimeout(function() {
						$(value.element).popover('hide');
					}, 3000);
				});
			},
			submitHandler: function(form) {
				e.preventDefault();
				l.start();
				$('.error').hide();
				$.ajax({
					type: 'POST',
					url: '/newsletter-subscriber?EMAIL=' + subscriberEmail,
					cache: false,
					dataType: 'json',
					contentType: 'application/json; charset=utf-8',
					error: function(err) {
						alert('Could not signup to the newsletter. Please try again later.');
					},
					success: function(data) {
						if (data.status !== 'ok' && data['error-details'] !== 'subscriber with that e-mail address already exists') {
							$('label.newsletterlab').css('color', 'red');
							$('label.newsletterlab').text('Error: ' + data['error-details']);
							$('label.newsletterlab').show();
						} else {
							$('label.newsletterlab').css('color', '#4F8A10');
							$('label.newsletterlab').show();
							$('label.newsletterlab')
								.text('Thank you for signing up to the Gousto newsletter!')
								.delay(4000).fadeOut();
							$(form).find('input').val('');
						}
					},
					complete: function() {
						l.stop();
					}
				});
			}
		});
	});
}

$(document).ready(bindNewsletterSignup());

//get url parameters - useful for campaigns and stuff
function GetURLParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}

// Open login modal when passed #m_login argument
$(document).ready(function() {
	if (window.location.pathname === '/checkout') {
		$('#loginModal').on('hidden.bs.modal', function () {
			if(window.location.hash === '#login') {
				window.location.hash = '';
			}
		})
		var loginModal = function(show) {
			$('#loginModal').modal({
				remote: '/form-login',
				show: show
			});
		}
		// If the parameter exists create login modal
		if (window.location.hash === '#login' && $('a[href="/my-gousto"]').length === 0) {
			$(window).load(function() {
				loginModal(true)
			});
		}
		window.onhashchange = function(){
			var hash = window.location.hash;
			if(hash === '#login') {
				loginModal(true)
			} else {
				loginModal(false)
			}
		}
	}
});


//Password reset form ajax handler
$('#password-reset').submit(function(e) {
	var postData = $(this).serializeArray();
	var formURL = $(this).attr('action');
	$.ajax({
		url: formURL,
		type: 'POST',
		data: postData,
		success: function(data, textStatus, jqXHR) {
			$('#password-reset').replaceWith('<div class="row text-center"><p>Please check your e-mail for instructions on resetting your password</p></div>');
		},
		error: function(jqXHR, textStatus, errorThrown) {
			$('#bad-email').removeClass('hidden');
		}
	});
	e.preventDefault();
});

$('#newpassword').submit(function(e) {
	var postData = $(this).serializeArray();
	var formURL = $(this).attr('action');
	$.ajax({
		url: formURL,
		type: 'POST',
		data: postData,
		error: function(data) {
			var reseterror = $('#reset-error');
			reseterror.show();
			if (typeof data.responseJSON.error !== 'undefined') {
				reseterror.html(data.responseJSON.error + ' Please ' +
					'<a href="/resetform"><span class="strong">request a new link</span></a>' +
					' to reset your password!');
			} else {
				reseterror.html('Sorry! Uknown error. Please try again by ' +
					'<a href="/resetform"><span class="strong">requesting a new link</span></a>.');
			}
		},
		success: function() {
			$(location).attr('href', '/my-account');
		}
	});
	e.preventDefault();
});

/******** Google Analytics *********/

// Product view (click on recipe)
$('.show-recipe-info').on('click', function(e) {
	var link = $(this);
	var recipeId = link.attr('data-recipe-id');
	var recipeName = link.attr('data-recipe-title');

	dataLayer = window.dataLayer || [];
	dataScienceDataLayer = window.dataScienceDataLayer || [];

	var impression = {
		'event': 'recipeClick',
		'ecommerce': {
			'detail': {
				'products': [{
					'id': recipeId,
					'productName': recipeName
				}]
			}
		}
	};
	dataLayer.push(impression);
	dataScienceDataLayer.push(impression);
});

$('#sort-options a').on('click', function() {
	var filterClicked = $(this).attr('data-sort-attr');
	dataLayer = window.dataLayer || [];
	dataLayer.push({
		'event': 'recipeFilterClick:' + filterClicked
	});
});
$('#user-balance  #form-submit').click(function(e) {
	form = $('#load-balance-form');
	e.preventDefault();
	$.get(form.attr('action'))
		.success(function(data) {
			if (data.status == 'ok') {
				$('#user-balance').html(data.html);
			}
		});
});

$('[data-toggle=popover]').popover();


$('a.show-nutrition').on('click', function() {
	$(this).closest('.itemgridchild').find('.padd').removeClass('hover').find('.nutritional-info').first().addClass('unslide');
});
$('a.close-ni').on('click', function() {
	$(this).closest('.nutritional-info').removeClass('unslide').find('.padd').addClass('hover');
});
$('a.close-i').on('click', function() {
	$(this).closest('.padd').removeClass('hover');
	if (typeof analytics !== 'undefined') {
		analytics.track('Recipe Info Closed', {
			'recipeId': AnalyticsUtils.getRecipeIdByChild(this),
			'deliveryDayId': AnalyticsUtils.getDeliveryDayId(),
			'spotPosition': AnalyticsUtils.getRecipePositionByChild(this)
		});
	}
});

/*** Bootstrap maxlength ***/
var exceptionsIds = '#cardnumber'; // list of inputs without Bootstrap-maxlength box

//Apply maxlength box to all inputs with maxlength ignoring exceptions
$('input[maxlength]:not(' + exceptionsIds + ')').maxlength({
	alwaysShow: true,
	limitReachedClass: 'label label-danger'
});
