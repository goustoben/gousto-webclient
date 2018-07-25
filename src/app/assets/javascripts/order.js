/**
 * @fileoverview order.js Order specific application logic
 */

(function() {
	'use strict';

	$('form#choices').on('submit', function() {
		$('.recipe').each(function() {
			$('[name="recipes[]"]').filter(function() {
				return $(this).val() === '';
			}).first().val($(this).data('recipe-id'));
		});

		$('[name="num_portions"]').val($('.dateselection-cooking-btn.active').data('size'));
	});
})();
