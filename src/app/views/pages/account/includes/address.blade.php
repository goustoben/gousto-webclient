<div class="address-box {{{ ($address['id'] === $current_id) ? 'active' : '' }}}" data-address-id="{{{ $address['id'] }}}">
	<div class="address-buttons">
		<button class="address-check-box account-function">
			<span class="glyphicon glyphicon-{{{ ($address['id'] === $current_id)  ? 'check' : 'unchecked' }}} pull-left"></span>
			<span class="address-name pull-left">{{{ $address['name'] }}}</span>
		</button>
		{{ Form::open(['route' => ['user.address.set-default-shipping', 'current', $address['id']], 'class' => 'address-checkbox-form hide-soft']) }}
		{{ Form::close() }}
		@if($can_edit)
			<button class="address-delete account-function pull-right" data-selid="delete-address" {{{ ($address['id'] === $current_id)  ? 'disabled' : '' }}}><span class="glyphicon glyphicon-trash"></span>Delete</button>
			<button class="address-edit account-function pull-right" data-selid="edit-address" data-form-number="{{{ $address['id'] }}}"><span class="glyphicon glyphicon-edit"></span>Edit</button>
			<button class="address-cancel account-function pull-right hide-soft" data-form-number="{{{ $address['id'] }}}"><span class="glyphicon glyphicon-remove"></span>Cancel</button>
		@endif
	</div>
	<div class="address-text">
		<p>
			{{{ HTML::renderAddress($address) }}}
		</p>
	</div>
	<div class="address-form hide-soft">
		@include('pages.account.includes.address-form', ['route' => ['user.address.update', 'current', $address['id']]])
	</div>
	{{ Form::open(['route' => ['user.address.delete', 'current', $address['id']], 'class' => 'address-delete-form hide-soft']) }}
	{{ Form::close() }}
</div>
