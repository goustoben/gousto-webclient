<div class="modal fade gmodal" id="subscription-hold-success-modal" tabindex="-1" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content" id="default-subscription-hold">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">Hold on!</h4>
			</div>
			<div class="modal-body">
				{{-- There is committed order(s) --}}
				@if(isset($cutoff_orders_data) && !empty($cutoff_orders_data))
					<p>It is too late to cancel your box{{{ (count($cutoff_orders_data) > 1) ? 'es' : '' }}} arriving on
					@foreach($cutoff_orders_data as $index => $order)
						@if(count($cutoff_orders_data) > 1 && $index == count($cutoff_orders_data) -1 )
							and {{{ \Carbon\Carbon::parse($order['delivery_date'] )->format('l jS F') }}}
						@elseif($index > 0)
							{{{ \Carbon\Carbon::parse($order['delivery_date'] )->format('l jS F') }}},
						@else
							{{{ \Carbon\Carbon::parse($order['delivery_date'] )->format('l jS F') }}}
						@endif
					@endforeach
					and {{{ (count($cutoff_orders_data) > 1) ? 'these' : 'this' }}} will be delivered as normal.</p>
				@endif
				{{-- There is pending order(s) --}}
				@if(isset($open_orders_data) && !empty($open_orders_data))
					<p>You have already chosen recipes for {{{ (count($open_orders_data) > 1) ? 'these boxes below' : 'this box' }}} :</p>
					<ul>
						@foreach($open_orders_data as $order)
							<li>Box with {{{ $order['box']['num_recipes'] }}} meals for {{{ $order['box']['num_portions'] }}} people for delivery on {{{ \Carbon\Carbon::parse($order['delivery_date'] )->format('l jS F')}}}</li>
						@endforeach
					</ul>
					<p>Do you wish to keep this order?</p>
				@endif
			</div>
			@if(isset($open_orders_data) && !empty($open_orders_data))
				<div class="modal-footer">
					@include('pages.account.includes.modal-order-buttons')
				</div>
			@endif
		</div>
		<div class="modal-content hide-soft hold-order-confirm" id="keep-orders-confirm">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">These boxes will be delivered soon</h4>
			</div>
			<div class="modal-body">
				<ul>
					@foreach($open_orders_data as $order)
						<li>Box with {{{ $order['box']['num_recipes'] }}} meals for {{{ $order['box']['num_portions'] }}} people for delivery on {{{ \Carbon\Carbon::parse($order['delivery_date'] )->format('l jS F')}}}</li>
					@endforeach
				</ul>
				<p>
					Did you know you can now order one-off boxes without turning on your subscription!
					Simply check out <a href="{{{ URL::route('menu') }}}">This Week's Recipes</a> and choose your meals.
				</p>
			</div>
		</div>
		<div class="modal-content hide-soft hold-order-confirm" id="cancel-orders-confirm">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Your boxes have been cancelled</h4>
			</div>
			<div class="modal-body">
				<p>
					Did you know you can now order one-off boxes without turning on your subscription!
					Simply check out <a href="{{{ URL::route('menu') }}}">This Week's Recipes</a> and choose your meals.
				</p>
			</div>
		</div>
	</div>
</div>
