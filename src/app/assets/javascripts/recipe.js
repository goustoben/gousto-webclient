// Makes the comments plugin responsive as per http://goo.gl/0tFUxK
function fbCommentsWorkaround() {
	function resizeFacebookComments() {
		if ($('.fb-comments iframe').length) {
			var src = $('.fb-comments iframe').attr('src').split('width='),
				width = $('.fb-comments').parent().parent().width();
			$('.fb-comments iframe').attr('src', src[0] + 'width=' + width);
			$('.fb-comments iframe').css( {width: width} );
			$('.fb-comments span').css( {width: width} );
		}
	}

	FB.Event.subscribe('xfbml.render', resizeFacebookComments);
	$(window).on('resize', function() {
		resizeFacebookComments();
	});
	$('.fb-comments iframe').on('load', function() {
		resizeFacebookComments();
		$('.fb-comments iframe').unbind('load');
	});
}
window.fbAsyncInit = function() {
	FB.init({
		appId: '294160790674968',
		href: document.URL,
		status: true,
		cookie: true,
		oauth: true,
		xfbml: true,
		logging: false,
		version: 'v2.7'
	});
	fbCommentsWorkaround();
};
(function(d) {
	var js, id = 'facebook-jssdk';
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement('script');
	js.id = id;
	js.async = true;
	js.src = '//connect.facebook.net/en_US/all.js';
	d.getElementsByTagName('head')[0].appendChild(js);
}(document));

//Handle tabs click for mobile
$('#ingredients, #instructions, #nutrition').click(function(){
	if ($(this).hasClass('active')) {
		return;
	}

	//Handle menu color change
	var activeMenuBtn = $('.indivrecipe-tabs').find('.active');
	activeMenuBtn.removeClass('active');
	$(this).addClass('active');

	//Hide aactive tab and show clicked Tab
	$('#' + activeMenuBtn[0].id + '-tab').hide();
	$('#' + $(this)[0].id + '-tab').show();
});

//Add recipe to the wishlist
$('#reminder-form').submit(function(e) {
	var postData = $(this).serializeArray();
	var formURL = $(this).attr('action');
	$.ajax({
		url: formURL,
		type: 'POST',
		data: postData,
		success: function(data, textStatus, jqXHR) {
			$('#reminder-form').replaceWith('<p>Thank you. Your selection has been added to your wishlist.</p>');
		},
		error: function(jqXHR, textStatus, errorThrown) {}
	});
	e.preventDefault();
});

//Show more steps in the cooking instruction
$('#load-more-btn').click(function(){
	$('.indivrecipe-cooking-more').removeClass('indivrecipe-cooking-more');
	$(this).addClass('hide-soft');
});
