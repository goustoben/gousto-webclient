@if($page === 'twr')
	<a href="javascript:void(0);" class="desktop-hide ordersummary-fixedbottom-openbtn withcontent" data-selid="open-summary-mobile" data-bind="click: function(){ basket.previewBasket(); }">
		Open Box<span class="glyphicon glyphicon-chevron-up"></span>
	</a>
	<div id="twr-ordersummary-container" class="ordersummary-fixedbottom-wrapper withcontent" data-bind="css: { ready: true }">
@endif
@if($page === 'checkout' || $page === 'farmshop')
	<a href="javascript:void(0);" class="desktop-hide ordersummary-fixedbottom-openbtn ordersummary-fixedbottom-click" >
		Open Box<span class="glyphicon glyphicon-chevron-up"></span>
	</a>
	<div class="ordersummary-fixedbottom-wrapper">
@endif

	@if($page === 'checkout')
		<div id="ordersummary-box" class="ordersummary-box-border checkout">
	@elseif($page === 'twr')
		<div id="ordersummary-box" class="ordersummary-box-border twr">
	@elseif($page === 'confirmation')
		<div id="ordersummary-box" class="ordersummary-box-border confirmation">
	@else
		<div id="ordersummary-box" class="ordersummary-box-border">
	@endif
		@if($page !=='twr')
			<p class="ordersummary-box-title">Order Summary</p>
		@endif
		<div class="ordersummary-box-content">
			@if($page !=='twr')
				<hr class="ordersummary-box-hr" />
			@endif
			@if($page === 'twr')
				<div class="desktop-hide">
					<div class="ordersummary-fixedbottom-box"></div>
					<a href="javascript:void(0);" class="ordersummary-fixedbottom-closebtn" style="display:none" data-bind="visible: basket.preview(), click: function(){ basket.previewBasket(); }">
						Close box <span class="glyphicon glyphicon-remove"></span>
					</a>
					<div data-bind="visible: !basket.preview(), click: function(){ basket.previewBasket(); }">
						<div class="row">
							<div class="col-xs-7 ordersummary-recipe-icons">
								@foreach($recipes as $recipe)
									<span class="ordersummary-minirecipe" style="display:none" data-bind="visible: basket.qtyInBasket({{{$recipe['id']}}}) > 0">
										<?php try {
											$media = $medias[$recipe['id']];
										?>
											{{ image_tag($media['secure_cdn_url'],
												array("lazy" => true, "alt" => $recipe['title'] ),
												array(
													320 => $media['scaled_urls'][50]['secure_cdn_url'],
													500 => $media['scaled_urls'][50]['secure_cdn_url'],
													767 => $media['scaled_urls'][50]['secure_cdn_url'],
													10000 => $media['scaled_urls'][50]['secure_cdn_url'],
													'1x 10000' => $media['scaled_urls'][50]['secure_cdn_url'],
													'2x 10000' => $media['scaled_urls'][50]['secure_cdn_url']
												)
											) }}
										<?php } catch (Exception $e) { ?>
											{{ image_tag($media['secure_cdn_url'], array("lazy" => true, "alt" => $recipe['title'] )) }}
										<?php } ?>
									</span>
								@endforeach
								<span class="ordersummary-minirecipe placeholder" data-bind="visible: basket.items().length === 0">1</span>
								<span class="ordersummary-minirecipe placeholder" data-bind="visible: basket.items().length < 2">2</span>
								<span class="ordersummary-minirecipe placeholder" data-bind="visible: basket.items().length < 3">3</span>
								<span class="ordersummary-minirecipe placeholder" data-bind="visible: basket.items().length < 4">4</span>
							</div>
							<div class="col-xs-5 ordersummary-nextbtn">
								<button data-bind="css:(basket.items().length >= basket.minSize) ? '' : 'disabled'" class="gbtn-primary btn-block" autocomplete="off">
									Checkout <span class="glyphicon glyphicon-chevron-right"></span>
								</button>
							</div>
						</div>
					</div>
				</div>
			@endif
			@if($page === 'checkout' || $page === 'farmshop')
				<div class="ordersummary-fixedbottom-box"></div>
				<a href="javascript:void(0);" class="desktop-hide hide-soft ordersummary-fixedbottom-closebtn ordersummary-fixedbottom-click">
					Close box <span class="glyphicon glyphicon-remove"></span>
				</a>
			@endif
			<div class="ordersummary-lines text-center {{{ $page === 'twr' ? 'mobile-hide col-sm-12' : ''}}}">
				<p class="ordersummary-box-section-title {{{ $page === 'twr' ? 'text-center' : 'pull-left'}}}">Servings Per Meal</p>
				@if($page === 'twr')
					<a href="#" class="ordersummary-num-portions" data-selid="portion-qty-2" data-bind="click: function(){ setNumPortions(2); }, css:{active: (numPortions()==2)}">
						<p data-bind="css:{ 'active' : basket.numPortions() === 2 }"><span class="ordersummary-num-portions-num">2</span></p>
					</a>
					<a href="#" class="ordersummary-num-portions" data-selid="portion-qty-4" data-bind="click: function(){ setNumPortions(4); }, css:{active: (numPortions()==4)}">
						<p data-bind="css:{ 'active' : basket.numPortions() === 4 }"><span class="ordersummary-num-portions-num">4</span></p>
					</a>
				@else
					<p class="ordersummary-num-portions active pull-right">
						<span class="ordersummary-num-portions-num">{{{ $order_info['box']['num_portions'] }}}</span>
					</p>
				@endif
			</div>
			@if($page === 'twr')
				<div class="desktop-hide">
					@if(Sentry::isLoggedIn())
						<button data-bind="css:(basket.items().length >= basket.minSize) ? 'active' : 'disabled', text: basket.submitText" class="gbtn-primary btn-block ordersummary-submit-checkout-form" autocomplete="off"></button>
					@else
						<button data-bind="css:(basket.items().length >= basket.minSize) ? 'active' : 'disabled', text: (basket.items().length >= basket.minSize) ? 'Continue with Checkout' : 'Add ' + (basket.minSize - basket.items().length) + ' or more meals to continue'" class="gbtn-primary btn-block ordersummary-submit-checkout-form" autocomplete="off"></button>
					@endif
					<h5 class="text-center text-heading">Your box summary</h5>
					<a href="#" class="ordersummary-num-portions pull-right" data-bind="click: function(){ setNumPortions(4); }, css:{active: (numPortions()==4)}">
						<p data-bind="css:{ 'active' : basket.numPortions() === 4 }"><span class="ordersummary-num-portions-num">4</span></p>
					</a>
					<a href="#" class="ordersummary-num-portions pull-right" data-bind="click: function(){ setNumPortions(2); }, css:{active: (numPortions()==2)}">
						<p data-bind="css:{ 'active' : basket.numPortions() === 2 }"><span class="ordersummary-num-portions-num">2</span></p>
					</a>
					<h6 class="ordersummary-num-portions-title">Servings Per Meal</h6>
				</div>
			@endif
			<div class="clearfix"></div>
			<ul class="ordersummary-recipes">
				@foreach($recipes as $recipe)
					@if($page === 'twr')
						<li class="ordersummary-recipe" style="display:none" data-bind="visible: basket.qtyInBasket({{{$recipe['id']}}}) > 0">
					@else
						<li class="ordersummary-recipe">
					@endif
					<?php try {
						$media = $medias[$recipe['id']];
					?>
						{{ image_tag($media['secure_cdn_url'],
							array("class" => "ordersummary-recipe-img", "lazy" => true, "alt" => $recipe['title'] ),
							array(
								320 => $media['scaled_urls'][50]['secure_cdn_url'],
								500 => $media['scaled_urls'][50]['secure_cdn_url'],
								767 => $media['scaled_urls'][50]['secure_cdn_url'],
								10000 => $media['scaled_urls'][50]['secure_cdn_url'],
								'1x 10000' => $media['scaled_urls'][50]['secure_cdn_url'],
								'2x 10000' => $media['scaled_urls'][50]['secure_cdn_url']
							)
						) }}
						<?php } catch (Exception $e) { ?>
							{{ image_tag($media['secure_cdn_url'], array("class" => "recipe-img", "lazy" => true, "alt" => $recipe['title'] )) }}
						<?php } ?>
						<div class="ordersummary-recipe-overview">
							<p>{{{ $recipe['title'] }}}</p>
							@if( isset($recipe['range']) && $recipe['range'] === 'fine_dine_in')
							<p class="fine-dine-in">
								Fine Dine In
							</p>
							@endif
							<p>
								@if($page === 'twr')
									<span class="ordersummary-recipe-portions" data-bind="text: qtyInBasket({{{ $recipe['id'] }}}) * numPortions() + ' Servings'">{{{ $order_info['box']['num_portions'] }}} Servings</span> <br />
									<a href="#" class="ordersummary-recipe-double" data-selid="double-portion" data-bind="text: '+ Add ' + basket.numPortions() + ' More', visible: !basket.isFull(), click: function(data, e){ basket.addToBasket({{{$recipe['id']}}}, '{{{addslashes($recipe['title'])}}}', '{{{ $recipe['slug'] }}}'); }">+ Add 2 More</a>
								@else
									<span class="ordersummary-recipe-portions">{{{ $order_info['box']['num_portions'] }}} Servings</span>
								@endif
							</p>
						</div>
						@if($page === 'twr')
							<a href="#" class="ordersummary-remove-recipe" data-selid="remove-recipe" data-bind="click: function(data, e){ basket.removeFromBasket({{{$recipe['id']}}}, '{{{addslashes($recipe['title'])}}}'); }">
								<span class="glyphicon glyphicon-remove mobile-hide"></span>
								<span class="glyphicon glyphicon-remove-circle desktop-hide"></span>
							</a>
						@endif
					</li>
				@endforeach
				@if($page === 'twr')
					<li class="ordersummary-recipe placeholder" data-selid="box-empty-slot" data-bind="visible: basket.items().length === 0, css: { 'active' : (basket.items().length === 0) }, click: function(){ basket.previewBasket(); }">+ Add your first meal</li>
					<li class="ordersummary-recipe placeholder" data-selid="box-empty-slot" data-bind="visible: basket.items().length < 2, css: { 'active' : (basket.items().length === 1) }, click: function(){ basket.previewBasket(); }">+ Add a second meal to check out</li>
					<li class="ordersummary-recipe placeholder" data-selid="box-empty-slot" data-bind="visible: basket.items().length < 3, css: { 'active' : (basket.items().length === 2) }, click: function(){ basket.previewBasket(); }">+ Add another meal to save money</li>
					<li class="ordersummary-recipe placeholder" data-selid="box-empty-slot" data-bind="visible: basket.items().length < 4, css: { 'active' : (basket.items().length === 3) }, click: function(){ basket.previewBasket(); }">+ Add another meal to save money</li>
					<li class="ordersummary-change-choices">
						<a href="javascript:void(0);" class="text-dulled desktop-hide" data-bind="click: function(){ basket.previewBasket(); }">Change Choices &gt;</a>
					</li>
				@endif
				@if($page === 'checkout')
					<li class="ordersummary-change-choices">
						<a class="text-dulled" href="{{{ $twr_url }}}">Change Choices &gt;</a>
					</li>
				@endif
			</ul>
			@if($page === 'twr')
				<div style="display:none" data-bind="visible: basket.items().length > 0">
					<p class="pull-right"><span data-bind="text: basket.numPortions() * basket.items().length">{{{ $order_info['box']['num_recipes'] * $order_info['box']['num_portions'] }}}</span> Servings</p>
					<p>Total servings</p>
				</div>
			@else

				<div id="order-summary-products-thumbnail"></div>

				<p class="pull-right"><span>{{{ $order_info['box']['num_recipes'] * $order_info['box']['num_portions'] }}}</span> Servings</p>
				<p>Total servings</p>
			@endif
			<div class="clearfix"></div>
			<div class="ordersummary-lines">
				@if($page === 'checkout')
					<p class="pull-right" id="ordersummary-delivery-date" data-delivery-day-id="{{{ $order_info['delivery_day']['id'] }}}" data-delivery-slot-id="{{{ $order_info['order']['delivery_slot_id'] }}}">{{{ \Carbon\Carbon::parse($order_info['delivery_day']['date'])->format('D jS F Y') }}}</p>
				@elseif($page === 'twr')
					<p class="pull-right" data-bind="text: basket.humanDate()">{{{ Carbon\Carbon::parse($order_info['delivery_date'])->format('D jS F Y') }}}</p>
				@else
					<p class="pull-right">{{{ Carbon\Carbon::parse($order_info['delivery_date'])->format('D jS F Y') }}}</p>
				@endif
				<p>Delivery date</p>
				@if($page === 'twr')
				<div class="slots" data-bind="foreach: basket.availableDeliverySlots()">
					<p data-bind="visible: basket.availableDeliverySlots().length > 1">
						<span class="imitate-link" data-bind="attr: { 'for': 'slot-choice-' + id }, click: function() {basket.deliverySlotId(parseInt(id, 10));}">
							<span data-bind="if: premium">Evening</span>
							<span data-bind="ifnot: premium">Standard</span>
							delivery
							<span data-bind="text: human_delivery_start"></span>
							-
							<span data-bind="text: human_delivery_end"></span>
							<span class="text-danger" data-bind="visible: delivery_price === '0.00'">(FREE)</span>
						</span>
						<input class="pull-right"
							name="delivery_slot"
							type="radio"
							data-bind="attr: { 'value': id }, checked: basket.deliverySlotId, checkedValue: parseInt(id, 10)"
						/>
					</p>
				</div>
				@endif
			</div>

			<div id="ordersummary-box-price">
				<hr class="ordersummary-box-hr" id="ordersummary-box-price-hr"/>
				<div class="ordersummary-lines">
					<p class="hidden" id="price-per-portion-ref" >&pound;{{{ $order_info['prices']['price_per_portion'] }}}</p>
					<p class="pull-left">Price per serving</p>
					@if($page === 'twr')
						<p class="pull-right ordersummary-line ordersummary-priceportion"><span data-bind="ifnot: basket.isMinimumSelected()">from </span><span data-bind="text: formatCurrency(basket.getPricePerMealDiscounted((basket.items().length > 1 ? basket.items().length : 4)))">&pound;{{{ $order_info['prices']['price_per_portion_discounted'] }}}</span></p>
						<div class="clearfix"></div>
						<p class="pull-right ordersummary-line" id="original-total" data-bind="text:formatCurrency(boxPrice())">&pound;{{{ $order_info['prices']['recipe_total'] }}}</p>
					@else
						<p class="pull-right ordersummary-line ordersummary-priceportion">&pound;{{{ $order_info['prices']['price_per_portion_discounted'] }}}</p>
						<div class="clearfix"></div>
						<p class="pull-right ordersummary-line" id="original-total">&pound;{{{ $order_info['prices']['recipe_total'] }}}</p>
					@endif
					<p>Box price</p>
					<div class="{{{ $page === 'checkout' ? 'ordersummary-discount-box' : '' }}}">
						@if($page === 'twr')
							<p id="promo-discount-line" data-bind="visible: (discountValue() > 0)">
								<b class="text-success">Discount<span class="mobile-hide tablet-hide"> applied</span></b> <br class="desktop-hide"/>
								@if(!Sentry::isLoggedIn())
									<span class="text-dulled">(<a class="checkout-form-bottom-price-edit imitate-link" href="#" class="checkout-form-bottom-price-change" data-toggle="modal" data-target="#promo-apply-modal" data-step="step-existing-voucher" data-save="basket">edit &gt;</a>)</span>
								@endif
								<b class="text-success"><span id="discount-value" class="pull-right">-<span data-bind="text: formatCurrency(discountValue())">&pound; 0.00</span></span></b>
							</p>
							@if(!Sentry::isLoggedIn())
								<p data-bind="visible: (discountValue() <= 0)">
									<a class="checkout-form-bottom-price-gotdiscount imitate-link" data-toggle="modal" data-target="#promo-apply-modal" data-step="step-enter-voucher" data-save="basket">Got a <span class="mobile-hide tablet-hide">gift </span>voucher<span class="mobile-hide tablet-hide">/referral code</span>?</a><br/>
									<span class="text-dulled">(<a class="checkout-form-bottom-price-defaultdiscount imitate-link get-default-voucher" data-toggle="modal" data-target="#promo-apply-modal" data-step="stepConfirmation" data-save="basket"><span class="mobile-hide">if not</span><span class="tablet-hide desktop-hide">or</span> get {{{ Config::get('promotion.default_code_value') }}} gift here</a>)</span>
								</p>
							@endif
						@elseif($page === 'checkout')
							@if($order_info['prices']['recipe_discount'] == 0)
								<div class="ordersummary-discount-wrapper">
									<button type="button" class="gbtn-secondary btn-block ordersummary-discount-btn">Add Voucher/Referral Code</button>
									<div class="text-center">
										<a href="#" class="ordersummary-discount-default text-dulled">(if not click here and get £15 gift)</a>
									</div>
								</div>
							@endif
							<div class="ordersummary-lines ordersummary-discount hide-soft">
								<p>
									Got a gift voucher/referral code?
								</p>
								<input id="promocode-input" class="ordersummary-promocode" name="promocode-input" type="text" autocomplete="off" data-valid-code="false" value="{{{ Input::get('promocode') }}}" placeholder="Insert code here" />
								<p for="promocode-input" class="ordersummary-promoerror hide-soft">This code is invalid.</p>
							</div>
							<div class="ordersummary-voucher-applied hide-soft">
								<p class="pull-right ordersummary-line ordersummary-discount-line">-&pound;{{{ $order_info['prices']['recipe_discount'] }}}</p>
								<p>Discount applied <a href="javascript:void(0);" class="imitate-link {{{ $page === 'checkout' || $page === 'twr' ? 'ordersummary-change-discount' : 'hide-soft' }}} ">(Edit &gt;)</a></p>
							</div>
						@else
							@if ($order_info['prices']['recipe_discount'] > 0)
								<div class="ordersummary-voucher-applied">
									<p class="pull-right ordersummary-line ordersummary-discount-line">-&pound;{{{ $order_info['prices']['recipe_discount'] }}}</p>
									<p>Discount applied <a href="javascript:void(0);" class="imitate-link {{{ $page === 'checkout' || $page === 'twr' ? 'ordersummary-change-discount' : 'hide-soft' }}} ">(Edit &gt;)</a></p>
								</div>
							@endif
						@endif
					</div>
					<div class="clearfix"></div>
					@if(isset($order_info['prices']['surcharge_total']) && $order_info['prices']['surcharge_total'] > 0)
						<p class="pull-left">
							Recipe surcharges
							@if(isset($order_info['surcharges']))
								({{{ count($order_info['surcharges']) }}})
							@endif
						</p>
						<p class="pull-right ordersummary-line">&pound;{{{ $order_info['prices']['surcharge_total'] }}}</p>
						<div class="clearfix"></div>
					@endif
					@if($page !== 'twr')


						<div id="order-summary-products-list"></div>



						<div style="display:none;" data-bind="visible: productsTotal() > 0">
							<p>Extras</p>
							<ul class="summary-products" data-bind="foreach: shop.products">
								<li data-bind="visible: quantity() > 0">
										<span data-bind="text: title()"></span>
										<b data-bind="visible: chargeVAT() > 0">*</b>
										<span class="pull-right product-sub-total" data-bind="text:formatCurrency(total())"></span>
										<br/>
										Quantity: <span data-bind="text: quantity()"></span>
										<a href="javascript:void(0);" class="pull-right" data-bind="click: function(){ quantity(0) };"><span class="glyphicon glyphicon-remove"></span>Remove</a>
								</li>
							</ul>
						</div>
						<div class="clearfix"></div>
					@endif
					@if($page === 'twr')
						<p class="pull-left">Delivery cost</p>
						<div data-bind="if: basket.deliveryCost() > 0">
							<p class="pull-right" data-bind="text: formatCurrency(basket.deliveryCost())"></p>
						</div>
						<p class="pull-right" data-bind="ifnot: basket.deliveryCost() > 0">FREE</p>
					@elseif($page === 'checkout')
						<p class="pull-left">Delivery cost</p>
						@if($order_info['prices']['delivery_total'] > 0)
							<p class="pull-right">&pound;{{{ $order_info['prices']['delivery_total'] }}}</p>
						@else
							<p class="pull-right">FREE</p>
						@endif
					@elseif($page === 'confirmation')
						<p class="pull-left">Delivery cost
						@if ($order_info['prices']['delivery_total'] > 0) * @endif
						</p>
						<p class="pull-right" id="delivery-cost">{{{ ($order_info['prices']['delivery_total'] > 0) ? '£' . $order_info['prices']['delivery_total'] : 'FREE' }}}</p>
					@else
						<p class="pull-left">Delivery cost<b data-bind="visible: (shop.deliveryTotal() > 0 && hasVATitem())">*</b></p>
						<div data-bind="if: shop.deliveryTotal() > 0">
							<p class="pull-right" data-bind="text: formatCurrency(shop.deliveryTotal())"></p>
						</div>
						@if($order_info['prices']['delivery_total'] > 0)
							<p class="pull-right">&pound;{{{ $order_info['prices']['delivery_total'] }}}</p>
						@else
							<p class="pull-right">FREE</p>
						@endif
					@endif
					<div class="clearfix"></div>
					<b>
						<p class="pull-left">Total to pay</p>
						@if($page === 'twr')
							<p class="pull-right ordersummary-line ordersummary-total"><span data-bind="text: formatCurrency(grandTotal());">&pound;0.00</span></p>
						@else
							<p class="pull-right ordersummary-line ordersummary-total">&pound;<span data-bind="text: boxTotal()" id="ordersummary-grand-total">{{{ $order_info['prices']['total'] }}}</span></p>
						@endif
					</b>
					@if($page !== 'twr')
						<div class="clearfix"></div>
						<p class="{{{ $page === 'checkout' || $page === 'twr' ? 'hide': '' }}} ordersummary-vat">* These items include VAT at 20%</p>
					@endif
					<div class="clearfix"></div>
					@if($page === 'twr')
						@if(Sentry::isLoggedIn())
							<button
								data-bind="css:(basket.items().length >= basket.minSize) ? 'active' : 'disabled', text: basket.submitText"
								data-selid="box-checkout" class="gbtn-primary btn-block ordersummary-submit-checkout-form ordersummary-submit-large" autocomplete="off">
							</button>
						@else
							<button
								data-bind=" css:(basket.items().length >= basket.minSize) ? 'active' : 'disabled', text: (basket.items().length >= basket.minSize) ? 'Continue with Checkout' : 'Add ' + (basket.minSize - basket.items().length) + ' or more meals to continue'"
								data-selid="box-checkout" class="gbtn-primary btn-block ordersummary-submit-checkout-form ordersummary-submit-large" autocomplete="off">
							</button>
						@endif
					@endif
				</div>
			</div>
			@if($page === 'checkout')
				<hr class="ordersummary-box-hr" />
				<div class="mobile-hide">
					<p class="ordersummary-box-section-title text-center">About Your First Box</p>
					<p><span class="strong">How frequently would you like Gousto?</span></p>
					<p>Your first scrummy Gousto box is scheduled to arrive on {{{ \Carbon\Carbon::parse($order_info['delivery_day']['date'])->format('l jS F Y') }}}.</p>
					<p>Relax, you have until {{{ \Carbon\Carbon::parse($order_info['delivery_day']['when_cutoff'])->addWeek()->format('l jS F Y') }}} to decide whether you want a 2nd box or not. Once you've placed your order, you'll have the chance to select the frequency of your deliveries via the 'My Account' section of our website. It's really easy, no lock-in or nonsense.</p>
					<p>Gousto is designed to work around your timetable and fit in with your lifestyle. You can order boxes on demand, or at a frequency you pre-set. Once you've placed your order, you'll have the chance to select the frequency of your deliveries via the 'My Account' section of our website.</p>
					<p><span class="strong">Why do we do this?</span></p>
					<p>At Gousto we're passionate about reducing our carbon footprints and cutting down on food waste. Pre-selecting how frequently you would like us to deliver helps us to work effectively with our farmers, so that we only source as much food as you are likely to order.</p>
				</div>
				<div class="text-center desktop-hide">
					<a href="javascript:void(0);" class="gbtn-secondary ordersummary-fixedbottom-click">Continue with Checkout</a>
				</div>
			@endif
			@if($page === 'confirmation')
				<hr class="ordersummary-box-hr" />
				<p>
					You have until {{{ \Carbon\Carbon::parse($order_info['when_cutoff'])->format('l jS F H:i:s') }}} to amend your order.<br/>
					@if($order_info['is_current_period'])
						<a class="link" href="{{{ URL::route('menu', [$order_info['id']]) }}}">Click here</a>
					@else
						<a class="link" href="{{{ URL::route('menu', [$order_info['id']]) }}}">Click here</a>
					@endif
					to amend your order now.
				</p>
			@endif
			@if($page === 'farmshop')
				<div id="order-summary-products-submit"></div>
			@endif
		</div>
	</div>
@if($page === 'twr' || $page === 'checkout' || $page === 'farmshop')
	</div>
@endif

<script type="text/javascript">
	var defaultDiscountCode = {{ json_encode(Config::get('promotion.default_code')) }};
</script>
