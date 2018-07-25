<div class="order-rating-row row" id="order-{{{ $order_id }}}">
	<div class="order-rating-details">
		<p class="pull-left">
			Your box of <span class="strong">{{{ $order['box']['num_recipes'] }}} meals</span> for <span class="strong">{{{ $order['box']['num_portions'] }}} people</span>, delivered on <span class="strong">{{{ $order['human_delivery_date'] }}}</span>.
		</p>
		<button class="view-order-rating account-function pull-right desktop-hide">View<span class="glyphicon glyphicon-chevron-right"></span></button>
		<button class="hide-order-rating account-function pull-right desktop-hide hide-soft">Close<span class="glyphicon glyphicon-chevron-down"></span></button>
	</div>
	<div class="order-rating-recipes mobile-collapse closed">
		@foreach($order['recipes'] as $recipe_id => $recipe)
			@include('pages.account.ratings.recipe-rating')
		@endforeach
	</div>
</div>
