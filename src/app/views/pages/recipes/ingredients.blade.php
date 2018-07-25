@if (isset($recipe['ingredients']['items']) && $recipe['ingredients']['items'])
	<ul class="ingredients">
		@foreach ($recipe['ingredients']['items'] as $ingredient)
			<li class="ingredient">{{{ $ingredient['name'] }}}{{{ ($ingredient['has_allergens'] ? '<span class="strong">&dagger;</span>' : '') }}}</li>
		@endforeach
	</ul>
@endif
