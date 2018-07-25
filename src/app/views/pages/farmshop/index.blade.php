@extends('layouts.default')
@section('bodyClass') class="summary farmshop"@stop
@section('content')

<div id="gousto-market-header" class="gousto-market-header">
</div>
<div class="col-md-12 wrap gousto-market clearfix">

	<div class="col-md-12 gousto-market-categories" id="gousto-market-categories">
	</div>

	<div id="gousto-market-products" class="col-sm-8 gousto-market-products clearfix">
	</div>

	<div class="col-xs-12 col-sm-4 ordersummary-box-wrapper">
		@include('includes.order-summary', array('page' => 'farmshop', 'order_info' => $order))
	</div>

	<div class="col-xs-12 col-sm-4 refer text-center">
		@include('includes.refer', array('display_referral_code' => true))
	</div>
</div>
@include('includes.email-friends-modal', array('user' => $user['user']))
@include('includes.modals.age-restriction')

<script type="text/javascript">
	var user_name = '{{{$user['user']['name_first']}}}';
	var referral_code = '{{{isset($user['referral-code']) ? $user['referral-code'] : ''}}}';
</script>

@include('includes.new-order-tracking', array('recipes' => $recipes))

{{-- REACT APP --}}

<script type="text/javascript">
	var productServiceData = {
		showConfirmation: {{{ !empty($from_twr) ? json_encode((bool) $from_twr) : json_encode(false) }}},
		userChoices: {{ json_encode($order['product_items']) }},
		gifts: {{ json_encode($order['gift_items']) }},
		order: {
			id: {{{ $order['id'] }}},
			periodId: {{{ $order['period_id'] }}},
			deliveryDate: {{  json_encode($order['delivery_date']) }},
			deliveryStart: {{ json_encode($order['delivery_slot']['delivery_start']) }},
			deliveryEnd: {{ json_encode($order['delivery_slot']['delivery_end']) }},
			whenCutoff: {{ json_encode($order['when_cutoff']) }}
		},
		user: {
			ageVerified: {{{ !empty($user['user']['age_verified']) ? json_encode((bool) $user['user']['age_verified']) : json_encode(false) }}},
			id: {{{ $order['user_id'] }}},
			token: {{ json_encode(Sentry::getAccessToken()) }}
		},
		totalPrice: {{{ bcsub($order['prices']['total'], $order['prices']['product_total'], 3) }}}
	};
	var spriteFileName = {{ json_encode(asset_path('images/'.Config::get('assets.sprite_filename'))) }};

</script>
@section('scripts')
	{{ javascript_path('javascripts/products.js' ) }}
@stop
@stop
	