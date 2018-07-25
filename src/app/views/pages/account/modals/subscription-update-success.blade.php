<div class="modal fade gmodal" id="subscription-update-success-modal" tabindex="-1" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-selid="close-sub-modal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">By the way...</h4>
			</div>
			<div class="modal-body">
				@if(isset($open_orders_data) && !empty($open_orders_data))
					<p>You have already chosen recipes for {{{ (count($open_orders_data) > 1) ? 'these boxes below' : 'this box' }}} :</p>
					<ul>
						@foreach($open_orders_data as $order)
							<li>Box with {{{ $order['box']['num_recipes'] }}} meals for {{{ $order['box']['num_portions'] }}} people for delivery on {{{ \Carbon\Carbon::parse($order['delivery_date'] )->format('l jS F')}}}</li>
						@endforeach
					</ul>
					<p class="highlight-links">You can still edit {{{ (count($open_orders_data) > 1) ? 'these orders' : 'this order' }}} in <a href="{{{URL::route('my-deliveries')}}}">My Deliveries</a></p>
				@endif
			</div>
		</div>
	</div>
</div>
