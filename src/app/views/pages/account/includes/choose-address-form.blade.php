@foreach($shipping_addresses as $address)
	@include('pages.account.includes.address', array('can_edit' => true, 'for_delivery' => true, 'current_id' => $current_shipping_address_id ))
@endforeach
<div class="address-box add-new-address">
	<div class="row address-buttons">
		<button class="pull-left account-function new-address">
			<span class="glyphicon glyphicon-plus"></span>
			<span class="new-address-text" data-selid="add-new-address">Add New Address</span>
		</button>
		<button class="address-cancel address-cancel-new-address account-function pull-right hide-soft" href=""><span class="glyphicon glyphicon-remove"></span>Cancel</button>
	</div>
	<div class="row hide-soft address-form">
		@include('pages.account.includes.address-form', array('address' => null, 'for_delivery' => true, 'route' => ['user.address.store', 'current']))
	</div>
	{{ Form::open(['route' => ['user.address.render-address-box', 'current'], 'class' => 'build-new-address-form']) }}
	{{ Form::hidden('address_id', null) }}
	{{ Form::close() }}
</div>
