<div class="order-row clearfix order-summary" data-order-id="{{{ $order['id'] }}}">
	<p class="delivery-date">
		<span class="glyphicon glyphicon-calendar"></span>
		@if($order['alternate_delivery_day'])
			<span class="strikethrough-day text-danger">{{{ \Carbon\Carbon::parse($order['date'])->format('jS F') }}}</span>&nbsp;{{{ $order['alternate_delivery_day']['human_date'] }}},
		@else
			{{{ $order['human_date'] }}},
		@endif
		<span class="delivery-time">{{{ HTML::twelveHourTime($order['delivery_slot']['delivery_start']) }}} - {{{ HTML::twelveHourTime($order['delivery_slot']['delivery_end']) }}}</span>
		<button class="view-order-summary account-function pull-right desktop-hide">View<span class="glyphicon glyphicon-chevron-right"></span></button>
		<button class="hide-order-summary account-function pull-right desktop-hide hide-soft">Close<span class="glyphicon glyphicon-chevron-down"></span></button>
	</p>
	<p class="delivery-info">
		<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
		<span class="mobile-order-status active-order {{{ $order['active'] !== '1' ? 'hide-soft' : 'active' }}} desktop-hide">Active</span>
		<span class="mobile-order-status skipped-order {{{ $order['active'] === '1' ? 'hide-soft' : 'active' }}} desktop-hide">Skipped</span>
		Recipes available from {{{ $order['human_when_menu_live'] }}}
	</p>
	<div class="order-details">
		<p class="projected-delivery-message {{{ $order['active'] !== '1' ? 'hide-soft' : 'active' }}}">
			The recipes for this week will be available from {{{ $order['human_when_menu_live'] }}}, you will then have until noon on {{{ $order['human_cutoff_date'] }}} to select your recipes. We will send you an email nearer the time to remind you to choose your recipes.
		</p>
		<p class="projected-delivery-message {{{ $order['active'] === '1' ? 'hide-soft' : 'active' }}}">
			You have chosen to skip this delivery, if you have changed your mind simply click below to receive a box on this date.
		</p>
		<div class="order-options row">
			<div class="order-option-buttons">
				@include('pages.account.deliveries.skip-order-buttons', array('number' => $number, 'button_type' => 'btns'))
			</div>
		</div>
	</div>
</div>
