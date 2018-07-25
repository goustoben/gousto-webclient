@if(isset($order['active']))
	<div class="col-xs-7 col-sm-6 {{{ ($button_type == 'links') ? '' : 'col-md-4' }}} pull-right delivery-skip-options {{{ $order['active'] !== '1' ? 'hide-soft' : '' }}}">
		{{ Form::open(['route' => ['disable-projected-delivery', 'user_id' => 'current', 'delivery_day_id' => $order['id']]]) }}
			{{ Form::button('Skip Order', array('data-selid' => 'skip-order', 'data-style' => 'slide-left', 'skip-handler-order-number' => $number, 'class' => ($button_type == 'links') ?  'delivery-skip-links ladda-button' : 'gbtn-secondary btn-block delivery-skip-btns ladda-button')) }}
		{{ Form::close() }}
	</div>

	<div class="col-xs-7 col-sm-6 {{{ ($button_type == 'links') ? '' : 'col-md-4' }}} pull-right delivery-skip-options {{{ $order['active'] === '1' ? 'hide-soft' : '' }}}">
		{{ Form::open(['route' => ['enable-projected-delivery', 'user_id' => 'current', 'delivery_day_id' => $order['id']]]) }}
			{{ Form::button('Restore Order', array('data-selid' => 'restore-order', 'data-style' => 'slide-left', 'class' => ($button_type == 'links') ?  'delivery-skip-links skipped-count ladda-button' : 'gbtn-primary btn-block delivery-skip-btns skipped-count ladda-button')) }}
		{{ Form::close() }}
	</div>
@elseif($order['phase'] === 'pre_menu' || $order['phase'] === 'awaiting_choices' || $order['phase'] === 'open')

	<div class="col-xs-7 col-sm-6 pull-right delivery-skip-options" style="padding-bottom: 20px;"></div>
@endif
