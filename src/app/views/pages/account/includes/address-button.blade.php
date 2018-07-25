<div class="address-box button-style billing-address-button" data-address-id="{{{ $address['id'] }}}">
	<div class="address-buttons">
		<button class="address-check-box account-function">
			<span class="address-name pull-left">{{{ $address['name'] }}}</span>
		</button>
	</div>
	<div class="address-text">
		<p>
			{{{ HTML::renderAddress($address) }}}
		</p>
	</div>
	{{ Form::open(['route' => ['user.address.store', 'current']]) }}
	{{ Form::hidden('type', 'billing') }}
	{{ Form::hidden('name', $address['name']) }}
	{{ Form::hidden('delivery_instructions', $address['delivery_instructions']) }}
	{{ Form::hidden('line1', $address['line1']) }}
	{{ Form::hidden('line2', $address['line2']) }}
	{{ Form::hidden('line3', $address['line3']) }}
	{{ Form::hidden('town', $address['town']) }}
	{{ Form::hidden('county', $address['county']) }}
	{{ Form::hidden('postcode', $address['postcode']) }}
	{{ Form::close() }}
</div>
