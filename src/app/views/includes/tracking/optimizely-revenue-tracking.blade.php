<script type="text/javascript">
(function(){
	'use strict';
	function poundsToPence(val) {
		return val * 100;
	}

	function trackRevenueUpdate(revenueInPounds) {
		var revenueInPence = poundsToPence(revenueInPounds);

		window.optimizely = window.optimizely || [];
		window.optimizely.push([
			'trackEvent',
			'eventName', {
				'revenue': revenueInPence
			}
		]);
	}

	if(typeof window.order !== 'undefined') {
		var revenueInPounds = window.order.prices.total;
		trackRevenueUpdate(revenueInPounds);
	}

	$(document).on('click', '#submit-product-choices', function() {
		var total = $('#ordersummary-grand-total').html();
		if(total) {
			var revenue = parseFloat(total).toFixed(2);
			trackRevenueUpdate(revenue);
		}
	});
})();
</script>
