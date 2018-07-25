@if (isset($recipe['ingredients']['allergens']) && $recipe['ingredients']['allergens'])
	<div class="text-heading">Allergens</div>
	<ul class="allergens">
		<li><span>Allergens highlighted by &#8224; </span>({{{ $recipe['ingredients']['allergens'] }}})</li>
	</ul>
@endif
