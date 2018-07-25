(function() {
	'use strict';

	var $slidingCanvas = $('.row-offcanvas');
	var $body = $('body');
	var $htmlBody = $('html, body');
	var prevScrollTop;

	$(document).on('click', '[data-toggle=offcanvas]', function() {
		prevScrollTop = $(window).scrollTop();
		$slidingCanvas.addClass('active');
		$body.addClass('close-sidebar-click');
		$htmlBody.scrollTop(0);
	});

	$(document).on('click', '#mainsidebar', function(e) {
		e.stopPropagation();
	});

	$(document).on('click', 'body.close-sidebar-click, ul.nav li.current', function(e) {
		e.preventDefault();
		$slidingCanvas.removeClass('active');
		$body.removeClass('close-sidebar-click');
		$htmlBody.scrollTop(prevScrollTop);
	});
})();
