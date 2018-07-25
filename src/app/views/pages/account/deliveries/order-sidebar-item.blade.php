<div class="orders-sidebar-item row {{{ $order['id'] === $next_delivery_ids['order'] ? 'active' : ''}}}" data-order-id="{{{ $order['id'] }}}">
	<div class="content">
		<div class="order-discount-info pull-right" data-order="{{{ htmlentities(json_encode($order)) }}}"></div>
		<p class="delivery-date mobile-pull-left">
			<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
			@if($order['original_delivery_day'])
				<span class="strikethrough-day text-danger">{{{ \Carbon\Carbon::parse($order['original_delivery_day']['date'])->format('jS F') }}}</span><br>{{{ $order['date'] }}},
			@else
				{{{ $order['date'] }}},
			@endif
			<span class="delivery-time">{{{ HTML::twelveHourTime($order['delivery_slot']['delivery_start']) }}} - {{{ HTML::twelveHourTime($order['delivery_slot']['delivery_end']) }}}</span>
			<div class="clearfix desktop-hide"></div>
		</p>
		<button class="view-order-summary account-function pull-right desktop-hide">View<span class="glyphicon glyphicon-chevron-right"></span></button>
		<button class="hide-order-summary account-function pull-right desktop-hide hide-soft">Close<span class="glyphicon glyphicon-chevron-down"></span></button>
		<p class="delivery-portions">
			{{ svg_path('icon-fork-knife') }}
			{{{ $order['box']['num_recipes'] }}} meals for {{{ $order['box']['num_portions'] }}} people
		</p>
		@include('pages.account.deliveries.info')
		<hr/>
	</div>
	@include('pages.account.includes.order-phase-strip', array('order' => $order))
	<div class="order-options row">
		<div class="order-option-buttons">
			@include('pages.account.deliveries.skip-order-buttons', ['order' => $order, 'number' => $number, 'button_type' => 'btns'])
		</div>
	</div>
</div>
