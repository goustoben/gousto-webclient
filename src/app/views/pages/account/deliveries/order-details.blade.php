<div class="order-details">
	@if(in_array($order['phase'], ['open']) && $order['box']['sku'] !== 'SKU-XMS-8-8')
		<div class="order-row clearfix choose-address-section mobile-hide">
			<div class="row">
				<p class="pull-left selected-order-recipes">
					You have until noon on
					<span class="order-details-when_cutoff">
						{{{ \Carbon\Carbon::parse($order['when_cutoff'])->format('jS F') }}}
					</span>
					to make changes to your order
				</p>

				<a class="update-order-recipes" href="{{{ URL::route('menu', [$order['id']]) }}}">
					Edit Recipes
				</a>
			</div>
		</div>
	@endif
	<div class="order-row clearfix order-address choose-address-section mobile-hide">
		<div class="row">
			<p class="pull-left">
				<span class="selected-address-name">
					{{{ HTML::renderAddress($order['shipping_address'], ', ', ['name', 'line1', 'town', 'postcode']) }}}
				</span>
			</p>
			@include('pages.account.deliveries.address-buttons')
		</div>
		<div class="order-choose-address row hide-soft">
			@include('pages.account.deliveries.choose-address-form', ['current_shipping_address_id' => $order['shipping_address']['id'], 'order_id' => $order['id']])
		</div>
	</div>
	@if(!in_array($order['phase'], ['pre_menu', 'awaiting_choices']))
	<div class="order-row clearfix order-items">
		<div class="order-item-grid row">
			<div class="flex-container flex-wrap flex-justify-around">
				@foreach($order['recipe_items'] as $recipe_item)
					<div class="flex-eq-321">
						@include('pages.account.deliveries.order-recipe', ['recipe_item' => $recipe_item])
					</div>
				@endforeach
				@foreach($order['product_items'] as $product_item)
					<div class="flex-eq-321">
						@include('pages.account.deliveries.order-product', ['product_item' => $product_item])
					</div>
				@endforeach
				@foreach($order['gift_items'] as $gift_item)
					@if($gift_item['itemable_type'] === 'Product' && $gift_item['is_gift'] === 0)
						<div class="flex-eq-321">
							@include('pages.account.deliveries.order-product', ['product_item' => $gift_item, 'is_gift' => true])
						</div>
					@endif
				@endforeach
				@if(in_array($order['phase'], ['pre_menu', 'awaiting_choices', 'open']))
					@if($order['box']['sku'] === 'SKU-XMS-8-8')
						<div class="flex-eq-321 empty">&nbsp;</div>
					@else
						<div class="flex-eq-321 flex-container text-center order-item-upsell">
							<div class="flex-self-center">
								@include('pages.farmshop.upsell')
							</div>
						</div>
						{{-- keep 3 empty flexboxes to justify and left align final element --}}
						<div class="flex-eq-321 empty">&nbsp;</div>
						<div class="flex-eq-321 empty">&nbsp;</div>
						<div class="flex-eq-321 empty">&nbsp;</div>
					@endif
				@endif
			</div>
		</div>
	</div>
	@endif
	<div class="order-row clearfix col-xs-12 col-md-6 col-md-offset-6">
		<div class="row">
			<div class="order-pricing">
				@if($order['box']['sku'] !== 'SKU-XMS-8-8')
					<div class="row price-per-portion">
						<p class="pull-left">Price Per Serving</p>
						<p class="pull-right">&pound;{{{ $order['prices']['price_per_portion_discounted'] }}}</p>
					</div>
				@endif
				<div class="discount-info row {{{ $order['prices']['recipe_discount'] === '0.00' ? 'hide' : '' }}}">
					<p class="pull-left">Discount:</p>
					<p class="pull-right">&pound;{{{ $order['prices']['recipe_discount'] }}}</p>
				</div>
				<div class="products-total row {{{ $order['prices']['product_total'] === '0.00' ? 'hide' : '' }}}">
					<p class="pull-left"><span class="strong">Extra Products:</span></p>
					<p class="pull-right"><span class="strong">&pound;{{{ $order['prices']['product_total'] }}}</span></p>
				</div>
				<div class="delivery-charge row {{{ $order['delivery_charge'] === '0.00' ? 'hide' : '' }}}">
					<p class="pull-left"><strong>Premium Delivery:</strong></p>
					<p class="pull-right"><strong>&pound;{{{ $order['delivery_charge'] }}}</strong></p>
				</div>
				<div class="box-price row">
					<p class="pull-left">Total Box Price</p>
					<p class="pull-right">&pound;{{{ explode('.', $order['prices']['total'])[0] }}}.<span class="box-price-pence">{{{ explode('.', $order['prices']['total'])[1] }}}</span></p>
				</div>
			</div>
		</div>
		<div class="order-address row desktop-hide">
			<p class="pull-left">Deliver to: <span class="address-name">{{{ HTML::renderAddress($order['shipping_address'], ', ', ['name', 'line1', 'town', 'postcode']) }}}</span></p>
			@include('pages.account.deliveries.address-buttons')
			<div class="order-choose-address row hide-soft">
				@include('pages.account.deliveries.choose-address-form', ['current_shipping_address_id' => $order['shipping_address']['id']])
			</div>
		</div>
		@if(in_array($order['phase'], ['pre_menu', 'awaiting_choices', 'open']))
			@if($order['box']['sku'] !== 'SKU-XMS-8-8')
				<div class="row desktop-hide">
					<p class="order-time-message">
						@include('pages.account.deliveries.order-time')
					</p>
				</div>
			@endif
			<div class="row">
				@include('pages.account.deliveries.order-edit-buttons')
			</div>
		@endif
	</div>
</div>
