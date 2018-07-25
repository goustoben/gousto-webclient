<div class="orders-list-item row {{{ $order['id'] === $next_delivery_ids['projected'] ? 'active' : ''}}}" data-order-id="{{{ $order['id'] }}}">
	<div class="content">
		<p class="delivery-date mobile-pull-left">
			<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
			@if($projected_delivery['alternate_delivery_day'])
				<span class="strikethrough-day text-danger">{{{ \Carbon\Carbon::parse($projected_delivery['date'])->format('jS F') }}}</span><br>{{{ $projected_delivery['alternate_delivery_day']['human_date'] }}},
			@else
				{{{ $projected_delivery['human_date'] }}},
			@endif
			<span class="delivery-time">{{{ HTML::twelveHourTime($projected_delivery['delivery_slot']['delivery_start']) }}} - {{{ HTML::twelveHourTime($projected_delivery['delivery_slot']['delivery_end']) }}}</span>
			<div class="clearfix desktop-hide"></div>
		</p>
		<button class="view-order-summary account-function pull-right desktop-hide">View<span class="glyphicon glyphicon-chevron-right"></span></button>
		<button class="hide-order-summary account-function pull-right desktop-hide hide-soft">Close<span class="glyphicon glyphicon-chevron-down"></span></button>
		<p class="delivery-portions">
			{{ svg_path('icon-fork-knife') }}
			{{{ $projected_delivery['num_recipes'] }}} meals for {{{ $projected_delivery['num_portions'] }}} people
		</p>
		<p class="delivery-info">
			<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
			@if($projected_delivery['unavailable_reason'])
				@if($projected_delivery['unavailable_reason'] === 'holiday')
					We've had to change your regular delivery day due to the bank holiday.
				@else
					{{{ $projected_delivery['unavailable_reason'] }}}
				@endif
			@else
				Recipes available from {{{ $projected_delivery['human_when_menu_live'] }}}
			@endif
		</p>
		<p class="corner-ribbon ribbon-grey delivery-skip-options {{{ $projected_delivery['active'] === '1' ? 'hide-soft' : '' }}}">
			Skipped
		</p>
	</div>
	@include('pages.account.includes.order-phase-strip', array('order' => $projected_delivery, 'number' => $number))
</div>
