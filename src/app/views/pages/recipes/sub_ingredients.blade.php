@if(!empty($recipe['ingredients']['items']))
	<div class="text-heading">Ingredients contain</div>
	<dl class="sub-ingredients">
		@foreach ($recipe['ingredients']['items'] as $ingredient)
			<dt class="ingredient-name">
				{{{ $ingredient['name'] }}}
			</dt>
			@if(!empty($ingredient['sub_ingredients']))
				<dl class="ingredient-description">
					{{{ $ingredient['sub_ingredients'] }}}
				</dl>
			@endif
		@endforeach
	</dl>
@endif
