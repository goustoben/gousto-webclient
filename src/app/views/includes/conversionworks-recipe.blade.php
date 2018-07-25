@if(isset($recipes))
<script>
dataLayer.push ({
	'ecommerce': {
		'impressions': [
		@if(count($recipes) > 0)
			<?php $position = 1; ?>
			@foreach($recipes as $recipe_id => $recipe)
				{
				'name':'{{{ $recipe['title'] }}}',
				'id':'{{{ $recipe_id }}}',
				'category':'{{{ $recipe['type'] }}}',
				'list': 'This Weeks Recipes',
				'position': {{{ $position }}}
				},
			<?php $position++; ?>
			@endforeach
		@endif
		]
	}
});
</script>
@endif
