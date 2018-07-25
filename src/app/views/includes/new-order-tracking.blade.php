<?php
$trackingCookieVal = Cookie::get('v1_goustoStateStore_tracking');

if (!empty($trackingCookieVal)) {
	$trackingCookieVal = json_decode($trackingCookieVal, true);

	if (!empty($trackingCookieVal)) {
		// Cookie value, if set, is double encoded in state...
		$trackingCookieVal = json_decode($trackingCookieVal, true);
	}
}
?>

<script>
dataLayer = window.dataLayer || [];
var products = [];
var order = {{ json_encode($order) }};
var recipes = {{ json_encode($recipes) }};

for (var i = 0; i < recipes.length; i++){
	products.push({
		'name' : recipes[i]['title'],
		'id' : recipes[i]['id'],
		'price' : order['prices']['price_per_portion'],
		'category' : recipes[i]['type']['slug'],
		'quantity' : 1
	});
}
dataLayer.push({
	'ecommerce': {
		'purchase': {
			'actionField': {
				'id' : order['id'],
				'revenue' : order['prices']['total'],
				'coupon' : order['prices']['promo_code'] + " | " + order['prices']['recipe_discount'],
				'affiliation' : order['box']['erp_reference']
			},
		'products': products
		}
	}
});
</script>

@if(isset($order) && isset($user))
	@if(isset($order['prices']['promo_code']))
		<?php $voucher = $order['prices']['promo_code']; ?>
	@else
		<?php $voucher = "" ?>
	@endif
	{{-- AWin --}}
	@if(!empty($trackingCookieVal['asource']) && $trackingCookieVal['asource'] === 'awin')
		<img src="https://www.awin1.com/sread.img?tt=ns&tv=2&merchant=5070&amount={{ $order['prices']['total']; }}&cr=GBP&ref={{{ $order['id'] }}}&parts=FIRSTPURCHASE:{{{ $order['prices']['total'] }}}&vc={{{ $voucher }}}&testmode=0&customer={{{ $user['user']['gousto_reference'] }}}"/>
	@endif

	{{-- LinkingMobile --}}
	<img src="https://max.linkingmobile.com/trackid/action/1453/1" border="0" alt="" />
@endif

@include('includes.tracking.optimizely-revenue-tracking')
