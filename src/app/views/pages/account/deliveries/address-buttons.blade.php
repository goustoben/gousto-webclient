@if(in_array($order['phase'], ['pre_menu', 'awaiting_choices', 'open']))
	<button class="pull-right account-function update-order-address">Update Address</button>
	<button class="pull-right account-function hide-soft cancel-order-address">Cancel</button>
@endif
