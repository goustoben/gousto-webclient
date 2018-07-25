@if(in_array($order['phase'], ['awaiting_choices', 'open']))
	@if($order['default'] && count($order['recipe_items']) === 0)
		You have until noon on {{{ $order['human_cutoff_date'] }}} to choose meals for this order
	@else
		You have until noon on {{{ $order['human_cutoff_date'] }}} to <a href="{{{ URL::to('menu', [$order['id']]) }}}"> edit this order </a>
	@endif
@endif
