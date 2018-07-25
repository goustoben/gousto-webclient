@if($order['shipping_address']['deleted'])
	@include('pages.account.deliveries.address', ['address' => $order['shipping_address'], 'current_id' => $current_shipping_address_id, 'order_id' => $order['id'], 'editable' => false])
@endif
@foreach($shipping_addresses as $address)
	@include('pages.account.deliveries.address', ['current_id' => $current_shipping_address_id, 'order_id' => $order['id']])
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
		@include('pages.account.includes.address-form', array('address' => null, 'for_delivery' => true, 'route' => ['user.address.store', 'current']))
	</div>
	{{ Form::open(['route' => ['user.order.address.render-address-box', 'current', $order['id']], 'class' => 'build-new-address-form']) }}
	{{ Form::hidden('address_id', null) }}
	{{ Form::close() }}
</div>
