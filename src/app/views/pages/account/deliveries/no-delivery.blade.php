<p>You currently don't have any deliveries scheduled, you can order a box now by choosing some meals from <a href="{{{ URL::route('menu') }}}">this week's menu</a>. We have {{{ Config::get('menu.size') }}} delicious recipes to choose from, if you wanted a delivery you could get:</p>
<div class="col-xs-12 no-delivery-col">
	<?php $count = 0; ?>
	@foreach($recipes as $recipe)
		@if($count > 3)
			<?php break; ?>
		@endif
		@if($subscription['box']['box_type'] === $recipe['type'])
			@include ('includes.recipesticker', array('recipe' => $recipe, 'no_modal' => true))
			<?php $count++; ?>
		@endif
	@endforeach
</div>
<div class="text-center">
	<a href="{{{ URL::route('menu') }}}" class="gbtn-primary">Take me to this week's recipes</a>
</div>
