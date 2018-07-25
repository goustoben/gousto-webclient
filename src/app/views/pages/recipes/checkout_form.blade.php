<form id="choices" method="post" action="/checkout" class="{{{ (Sentry::isLoggedIn()) ? 'user-logged-in' : '' }}}">
    <input type="hidden" name="_token" value="{{ csrf_token(); }}">
    @include('includes.modals.promo-apply')
	{{ Form::hidden('current_order_id', (isset($order['id'])) ? $order['id'] : false) }}
	{{ Form::hidden('deliverypostcode', Input::get('postcode')) }}
	<div id="build">
		@include('pages.recipes.date-selection')
		<div style="display: none" class="step four col-md-1 col-sm-12" data-step-id="4" data-bind="css:{ visible: true, maxified: items().length == maxSize }">
			<div class="container container-wrapper">
				<div class="col-md-7 col-sm-7 col-xs-12 choices">
					<div class="mobile-hide col-md-5 col-sm-4 text-left basket-summary" style="padding: 10px 0;">
						<div id="your-recipes" data-bind="visible: items().length > 0 ">
							<div class="padd">
								Your recipes<a href="javascript:void(0)" class="pull-right toggle-choices-link" data-bind="click: previewBasket"><span class="glyphicon glyphicon-remove"></span></a>
								<hr>
								<div data-bind="foreach: items">
								{{ Form::hidden('when_cutoff', $next_delivery_day['when_cutoff']) }}
									<div class="item">
										<img class="tablet-hide" data-bind="attr: { src: $parent.getRecipeImage(recipeId), alt: recipeName }"/>
										<p class="text-left" data-bind="text: recipeName"></p>
										<a href="#" class="remove-choice" data-bind="click: function(data, e) { $parent.removeFromBasket(data.recipeId, data.recipeName);}"><span class="glyphicon glyphicon-remove"></span></a>
										{{ Form::hidden('recipes[]') }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-md-7 col-sm-8 recipe-pricing text-center" id="recipe-pricing">
						<div class="col-xs-4 col-md-4 price" data-bind="css: (items().length == 2) ? 'active' : ''">
							<p>for 2 recipes<br/>
							<p class="price-per-meal"><span data-bind="text: formatCurrency(getPricePerMealDiscounted(2))">&pound;7.49</span>/<br />portion</p>
						</div>
						<div class="col-xs-4 col-md-4 price" data-bind="css: (items().length == 3) ? 'active' : ''">
							<p>for 3 recipes<br/>
							<p class="price-per-meal"><span data-bind="text: formatCurrency(getPricePerMealDiscounted(3))">&pound;5.83</span>/<br />portion</p>
						</div>
						<div class="col-xs-4 col-md-4 price" data-bind="css: (items().length == 4) ? 'active' : ''">
							<p>for 4 recipes<br/>
							<p class="price-per-meal"><span data-bind="text: formatCurrency(getPricePerMealDiscounted(4))">&pound;4.99</span>/<br />portion</p>
						</div>
					</div>
				</div>
				<div class="col-md-5 col-sm-5 col-xs-12 checkout-form-bottom-price-wrapper">
					<div class="col-md-8 col-sm-8 col-xs-6 text-left">
						<p class="mobile-hide">
							Box value
							<span class="pull-right" data-bind="text:formatCurrency(boxPrice())"></span>
						</p>
						@if( !Sentry::isLoggedIn() )
							<p id="promo-discount-line" data-bind="visible: (discountValue() > 0)">
								<b class="text-success">Discount<span class="mobile-hide tablet-hide"> applied</span></b> <br class="desktop-hide"/>
								<span class="text-dulled">(<a class="checkout-form-bottom-price-edit imitate-link" href="#" class="checkout-form-bottom-price-change" data-toggle="modal" data-target="#promo-apply-modal" data-step="step-existing-voucher" data-save="basket">edit &gt;</a>)</span>
								<b class="text-success"><span id="discount-value" class="pull-right">-<span data-bind="text: formatCurrency(discountValue())">&pound; 0.00</span></b>
							</p>
							<p data-bind="visible: (discountValue() <= 0)">
								<a class="checkout-form-bottom-price-gotdiscount imitate-link" data-toggle="modal" data-target="#promo-apply-modal" data-step="step-enter-voucher" data-save="basket">Got a <span class="mobile-hide tablet-hide">gift </span>voucher<span class="mobile-hide tablet-hide">/referral code</span>?</a><br/>
								<span class="text-dulled">(<a class="checkout-form-bottom-price-defaultdiscount imitate-link get-default-voucher" data-toggle="modal" data-target="#promo-apply-modal" data-step="stepConfirmation" data-save="basket"><span class="mobile-hide">if not</span><span class="tablet-hide desktop-hide">or</span> get {{{ Config::get('promotion.default_code_value') }}} gift here</a>)</span>
							</p>
						@else
							<p id="promo-discount-line" data-bind="visible: (discountValue() > 0)">Discount<span class="mobile-hide"> applied</span><span id="discount-value" class="pull-right">-<span data-bind="text: formatCurrency(discountValue())">&pound; 0.00</span></p>
						@endif
						<p><b>Total cost<span class="pull-right" data-bind="text: formatCurrency(grandTotal());">&pound; 0.00</span></b></p>
					</div>

					<div id="loginhint" class="col-md-4 col-sm-4 col-xs-6">
						@if( !Sentry::isLoggedIn() )
							<button data-bind="css: (items().length >= minSize) ? 'active' : 'inactive'" type="submit" id="checkout-btn" class="gbtn-primary btn-block validatechoices" role="button">Check<br class="mobile-hide desktop-hide"/>out &gt;</button>
						@else
							<button data-bind="css: (items().length >= minSize) ? 'active' : 'inactive'" type="submit" id="save-choices-btn" class="gbtn-primary btn-block validatechoices" role="button">Save <br class="mobile-hide desktop-hide"/>Choices &gt;</button>
						@endif
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
