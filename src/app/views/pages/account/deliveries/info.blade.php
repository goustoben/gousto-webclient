@if(isset($summary) && $summary)
	<p class="delivery-info">
		@if($order['phase'] === 'pre_menu')
			<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
			Choose recipes from {{{ $order['live'] }}}
		@elseif($order['phase'] === 'awaiting_choices')
			<span class="desktop-hide text-success">
				<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
				Choose recipes now
			</span>
		@elseif($order['phase'] === 'open')
			<span class="desktop-hide">
				<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
				You can edit this box until noon on {{{ $order['human_cutoff_date'] }}}
			</span>
		@else
			<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
			It's just too late for some things to change, like this Gousto box. It's now being lovingly packed and will be delivered fresh to you on <span class="strong">{{{ $order['human_delivery_date']}}} between {{{ HTML::twelveHourTime($order['delivery_slot']['delivery_start']) }}} and {{{ HTML::twelveHourTime($order['delivery_slot']['delivery_end']) }}}</span>
		@endif
	</p>
@else
<p class="delivery-info">
	@if($order['phase'] === 'pre_menu')
		<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
		@if($order['original_delivery_day'])
			@if($order['original_delivery_day']['unavailable_reason'] === 'holiday')
				We've had to change your regular delivery day due to the bank holiday.
			@endif
		@else
			Choose recipes from {{{ $order['live'] }}}
		@endif
	@elseif($order['phase'] === 'awaiting_choices')
		@if($order['original_delivery_day'])
			@if($order['original_delivery_day']['unavailable_reason'] === 'holiday')
				We've had to change your regular delivery day due to the bank holiday.
			@endif
		@else
			@if($order['is_current_period'])
				<a class="choose-now" data-selid="choose-this-weeks" href="{{{ URL::route('menu', [$order['id']]) }}}">
			@else
				<a class="choose-now" data-selid="choose-next-weeks" href="{{{ URL::route('menu', [$order['id']]) }}}">
			@endif
				Choose recipes now
			</a>
		@endif
	@elseif($order['phase'] === 'open')
		<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
		You can edit this box until noon on {{{ $order['human_cutoff_date'] }}}
	@elseif($order['phase'] === 'cutoff' || $order['phase'] === 'picking')
		<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
		Sourcing your farm fresh ingredients
	@elseif($order['phase'] === 'packing')
		<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
		Your box is being lovingly packed
	@elseif($order['phase'] === 'delivery')
		<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
		Your order is out for delivery
	@endif
</p>
@endif
