<?php
	$number = $order['number'];
	$isFirstPendingWithNoRecipes = isset($order['phase']) && $order['phase'] === 'awaiting_choices' && $number == 1;
	$isFirstPendingWithRecipes = isset($order['phase']) && $order['phase'] === 'open' && $number == 1;
	$isSecondPendingWithNoRecipes = isset($order['phase']) && ($order['phase'] === 'awaiting_choices' || $order['phase'] === 'pre_menu') && $number == 2;
	$isSecondPendingWithRecipes = isset($order['phase']) && $order['phase'] === 'open' && $number == 2;
	$isThirdPendingWithNoRecipes = isset($order['phase']) && ($order['phase'] === 'awaiting_choices' || $order['phase'] === 'pre_menu') && $number == 3;
	$isThirdPendingWithRecipes = isset($order['phase']) && $order['phase'] === 'open' && $number == 3;
	$isFourthPendingWithNoRecipes = isset($order['phase']) && ($order['phase'] === 'awaiting_choices' || $order['phase'] === 'pre_menu') && $number == 4;
	$isFourthPendingWithRecipes = isset($order['phase']) && $order['phase'] === 'open' && $number == 4;
	$isPendingWithNoRecipes = isset($order['phase']) && ($order['phase'] === 'awaiting_choices' || $order['phase'] === 'pre_menu') && $number > 4;
	$isPendingWithRecipes = isset($order['phase']) && $order['phase'] === 'open' && $number > 4;


	$states = [
		'isFirstPendingWithNoRecipes' => $isFirstPendingWithNoRecipes,
		'isFirstPendingWithRecipes'=> $isFirstPendingWithRecipes,
		'isSecondPendingWithNoRecipes' => $isSecondPendingWithNoRecipes,
		'isSecondPendingWithRecipes' => $isSecondPendingWithRecipes,
		'isThirdPendingWithNoRecipes' => $isThirdPendingWithNoRecipes,
		'isThirdPendingWithRecipes' => $isThirdPendingWithRecipes,
		'isFourthPendingWithNoRecipes' => $isFourthPendingWithNoRecipes,
		'isFourthPendingWithRecipes' => $isFourthPendingWithRecipes,
		'isPendingWithNoRecipes' => $isPendingWithNoRecipes,
		'isPendingWithRecipes' => $isPendingWithRecipes,
	];

	$state = '';
	foreach($states as $id => $condition) {
		if ($condition) {
			$state = $id;
			break;
		}
	}
?> 

<div class="order-options">
	<div class="order-option-buttons">
		<div class="skip-order col-xs-5">
			<a class="gbtn-cancel btn-block order-cancel" data-selid="cancel-order" cancel-handler="{{{ $state }}}" href="{{{ URL::route('order-cancel', ['order_id' => $order['id']]) }}}">Cancel Order</a>
		</div>
		@if($order['phase'] !== 'pre_menu' && $order['box']['sku'] !== 'SKU-XMS-8-8')
			<div class="edit-order col-xs-7">
				@if($order['is_current_period'])
					<a class="gbtn-primary btn-block" href="{{{ URL::route('menu', [$order['id']]) }}}">
						@if($order['phase'] === 'awaiting_choices')
							Choose Recipes Now
						@else
							Edit Box
						@endif
					</a>
				@else
					<a class="gbtn-primary btn-block" href="{{{ URL::route('menu', [$order['id']]) }}}">
						@if($order['phase'] === 'awaiting_choices')
							Choose Recipes Now
						@else
							Edit Box
						@endif
					</a>
				@endif
			</div>
		@endif
	</div>
</div>
