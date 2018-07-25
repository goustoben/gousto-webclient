<div class="address-box {{{ ($address['id'] === $current_id) ? 'active' : '' }}}" data-address-id="{{{ $address['id'] }}}" data-premium-delivery="{{{ $address['premium_delivery'] ? 1 : 0 }}}">
	<div class="address-buttons">
		<button class="address-check-box account-function" {{{ isset($editable) && !$editable ? 'disabled="disabled"' : '' }}}>
			<span class="glyphicon glyphicon-{{{ ($address['id'] === $current_id)  ? 'check' : 'unchecked' }}} pull-left"></span>
			<span class="address-name pull-left">{{{ $address['name'] }}}</span>
		</button>
		{{ Form::open(['route' => ['order.change-address', $order_id, $address['id']], 'class' => 'address-checkbox-form hide-soft']) }}
		{{ Form::close() }}
	</div>
	<div class="address-text">
		<p>
			{{{ HTML::renderAddress($address) }}}
		</p>
	</div>
</div>
