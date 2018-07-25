$(document).ready(function() {
	var allAccordions = $('.faq-category-content');
	$('.faq-category-accordion').click(function() {
		$(this).find('.faq-plus').toggle();
		$(this).find('.faq-minus').toggle();
		allAccordions.slideUp('normal');
		if ($(this).next().is(':hidden') === true) {
			$(this).next().slideDown('normal');
		}
	});
	allAccordions.hide();
});
