@extends('layouts.account')
@section('bodyClass')class="account deliveries"@stop
@section('content')
@include('pages.account.modals.billing-modal')
@include('pages.account.modals.remove-premium-delivery-address-modal')
@include('pages.account.includes.account-message-banner', array('show_nth_box_banner' => true))
<div id="skipped-all-modal" class="modal fade gmodal" tabindex="-1" role="dialog" aria-hidden="true" data-refresh-url="{{{ URL::route('subscription-delivery-next') }}}">
	@include('pages.account.modals.skipped-all-modal', array('orders' => $orders))
</div>
<div class="container account-content-container">
	<div class="account-heading row">
		<div class="row addbox">
			<a class="gbtn-secondary pull-right" href="{{{ URL::route('menu') }}}">
				+ add box
			</a>
		</div>
	</div>
	@if(!empty($orders) || !empty($projected_deliveries))
		<div id="deliveries-content-row" class="row">
			<div id="orders-sidebar" class="account-block-outer col-sm-5 col-md-4 mobile-hide">
				<div class="account-block-inner">
					@foreach($orders as $index => $order)
						@include('pages.account.deliveries.order-sidebar-item', ['number' => $order['number']])
					@endforeach
					@foreach($projected_deliveries as $index => $order)
						<?php
							$number = 0;
							foreach($orders as $pending_order) {
								$number = $pending_order['number'];
							}
							
							if ($number > 0) {
								$number = $number + ($index +1);
							}
						?>
						@include('pages.account.deliveries.projected-order-sidebar-item', array('projected_delivery' => $order, 'number' => $number))
					@endforeach
				</div>
			</div>
			<div id="order-summary-container" class="account-block-outer col-xs-12 col-sm-7 col-md-8">
				@foreach($orders as $order)
					<div class="order-container autoheight account-block-inner has-details {{{ $order['id'] === $next_delivery_ids['order'] ? 'displayed' : '' }}}" data-order-id="{{{ $order['id'] }}}" data-premium-delivery="{{{ $order['premium_delivery'] ? 1 : 0 }}}">
						@include('pages.account.deliveries.order-summary')
						@include('pages.account.deliveries.order-details')
					</div>
				@endforeach
				@foreach($projected_deliveries as $index => $order)
					<div class="order-container autoheight account-block-inner {{{ $order['id'] === $next_delivery_ids['projected'] ? 'displayed' : '' }}}" data-order-id="{{{ $order['id'] }}}">
						<?php
							$number = 0;
							foreach($orders as $pending_order) {
								$number = $pending_order['number'];
							}
							
							if ($number > 0) {
								$number = $number + ($index +1);
							}
						?>
						@include('pages.account.deliveries.projected-delivery', ['number' => $number])
					</div>
				@endforeach
			</div>
		</div>
	@else
		<div class="no-delivery-row row">
			@include('pages.account.deliveries.no-delivery')
		</div>
	@endif
</div>
<script type="text/javascript">
	var pageData = {
		user: {
			token: {{ json_encode(Sentry::getAccessToken()) }}
		},
	}
</script>
@include('includes.existing-subscriber-tracking')
@include('includes.changeurl')
@stop
