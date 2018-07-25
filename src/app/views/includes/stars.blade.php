@if(isset($recipe['ratings']['average']) && isset($recipe['ratings']['count']))
	@if($recipe['ratings']['average'] > 0)

	<div class="reciperating">
		<img class="empty" src="{{{ image_path('images/icons/stars-empty.png') }}}" alt="Rating"/>
		@if ($recipe['ratings']['average'] == 3.5)
			<?php $recipe['ratings']['average'] = 3.55; ?>
		@endif
		<div class="staroverflow" style="width:{{{$recipe['ratings']['average']/5 * 100}}}%;">
			<img class="stars-full" src="{{{ image_path('images/icons/stars-full.png') }}}" alt="{{{$recipe['ratings']['average']}}} rating out of 5"/>
		</div>
	</div>
	<p class="numrating">({{{$recipe['ratings']['count']}}})</p>
	@elseif(isset($recipe['chef']['celebrity']))
		@if($recipe['chef']['celebrity'])
			<div class="stocklabel" data-bind="visible: !showingBadge({{{ $recipe['id'] }}})">
				Celebrity chef
			</div>
		@endif
	@else
		<div class="stocklabel" data-bind="visible: !showingBadge({{{ $recipe['id'] }}})">
				New
		</div>
	@endif
@endif
