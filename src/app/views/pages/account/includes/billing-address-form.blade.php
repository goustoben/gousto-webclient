<p>Choose one of your addresses to use as billing address</p>
@foreach($addresses as $address_name => $address)
	@include('pages.account.includes.address-button')
@endforeach
<div class="address-box add-new-address">
	<div class="row address-buttons">
		<button class="pull-left account-function new-address">
			<span class="glyphicon glyphicon-plus"></span>
			<span class="new-address-text" data-selid="add-new-address">Add New Address</span>
		</button>
		<button class="address-cancel account-function pull-right hide-soft"><span class="glyphicon glyphicon-remove"></span>Cancel</button>
	</div>
	<div class="row hide-soft address-form">
		@include('pages.account.includes.address-form', ['address' => null, 'for_delivery' => false, 'type' => 'billing', 'route' => ['user.address.store', 'current', $address['id']]])
	</div>
</div>
{{ Form::select('billing_default', $address_list, $default_billing_address_id, array('id' => 'default_billing_select', 'class' => 'hidden')) }}
