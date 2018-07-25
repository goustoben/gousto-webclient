<div class="modal-body">
	<p>We have updated your delivery address, from now on any orders you place will be sent to this address by default. If you would like to change the destination of individual orders, you can do so from your <a href="{{{ URL::route('my-deliveries') }}}">deliveries page</a>.</p>
	@if(!empty($pending_orders) || !empty($committed_orders))
		<p><span class="strong">What about my existing orders?</span></p>
	@endif
	@if(!empty($pending_orders))
		<p>The following orders are scheduled to be delivered to a different address, click the button below if you would like to update where they will be delivered.</p>
		@foreach($pending_orders as $order)
			@include('pages.account.modals.order-with-address')
		@endforeach
	@endif
	@if(!empty($committed_orders))
		<p>The following orders are also scheduled to be delivered to a different address, unfortunately it is too late to change where they will be delivered.</p>
		@foreach($committed_orders as $order)
			@include('pages.account.modals.order-with-address')
		@endforeach
	@endif
</div>
@if(!empty($pending_orders))
	<div class="modal-footer">
		<a class="gbtn-primary" href="{{{ URL::route('my-deliveries') }}}">Manage my deliveries</a>
	</div>
@endif
