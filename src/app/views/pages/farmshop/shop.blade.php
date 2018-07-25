@if(isset($products) && !empty($products))
	<div id="farm-shop" class="col-sm-8">
		{{ Form::open(['route' => ['order.update-products', $order['id']], 'user_id' => $user['id']]) }}
		<div style="display:none" data-bind="visible: true, foreach: sortedProducts">
			<div class="col-sm-6 col-md-3 product-item" data-bind="css: { notinbasket: (quantity() < 1) }, visible: (isForSale() === '1' || quantity() > 0), attr: { 'data-product-id': productId() }">
				<div class="cont">
					<div class="image-container">
						<div class="content">
							<span class="spinner-container"></span>
							<img data-bind="attr: { src : media, alt: title }">
						</div>
						<div class="stock-label" data-bind="visible: (numberAvailable() < 10)">
							<span data-bind="visible: (numberAvailable() > 0)">Only <span data-bind="text: numberAvailable()"></span> left!</span>
							<span data-bind="visible: (numberAvailable() < 1)">Out of stock</span>
						</div>
					</div>
					<div class="product-details">
						<h3 class="product-title" data-bind="text: title()"></h3>
						<p class="description">
							<span data-bind="text:marketingDescription()"></span>
							<br/>
							<span class="strong" data-bind="text:allergenInfo()"></span>
						</p>
						<p class="price" data-bind="text: formatCurrency(price())"></p>
						<span class="weight" data-bind="visible: weight() > 0, text: weight() + 'g'"></span>
					</div>
					<span class="qty" data-bind="visible:quantity() > 0, text: quantity()"></span>
					<span class="addtobasket minus" data-bind="click: function(){ decrementQuantity($parent.hasChanged(1)); } ">-</span>
					<span class="addtobasket plus" data-bind="attr: { id: ('addBtn-' + productId()) }, click: function(){ incrementQuantity($parent.hasChanged(1)); } , visible: true">+</span>
				</div>
			</div>
			{{ Form::hidden('selected_products[]')}}
		</div>
		{{ Form::submit('Update Order', array('class' => 'hide')); }}
		{{ Form::close() }}
	</div>
	<div class="col-xs-12 col-sm-4 ordersummary-box-wrapper">
		@include('includes.order-summary', array('page' => 'farmshop', 'order_info' => $order))
	</div>
@endif

<script>
	var allOrders =  {{{ json_encode($order['product_items']) }}};
	var allProducts = {{{ json_encode($products) }}};
	var allCategories = {{{ json_encode($categories) }}};
	var productLimit = {{{ $product_limit }}};
	if(typeof shopReady !== "undefined"){
		bindShop();
	}
</script>

<script>
	var recipeTotal = {{{ json_encode($order['prices']['recipe_total']) }}};
	var discountTotal = {{{ json_encode($order['prices']['recipe_discount']) }}};
	var deliveryTotal = {{{ json_encode($order['prices']['delivery_total']) }}};
	var accountBalance = {{{ isset($balance) ? json_encode($balance) : json_encode(0.00) }}};
	if(typeof shopReady !== "undefined"){
		bindShop();
	}
	$(function () {
		$('[data-toggle="popover"]').popover();
	})
</script>

<script>
	var ageVerified = {{{ !empty($user['age_verified']) ? json_encode($user['age_verified']) : json_encode(false) }}};
</script>
