<div class="row">
	<div class="col-sm-4 col-xs-4 recipehighlight-box">
		<div class="recipehighlight-box-icon">
			{{ svg_path('icon-cooking-pot') }}
		</div>
		<p class="recipehighlight-box-title">Time</p>
		<p class="recipehighlight-box-value">{{{$recipe['preparation_time_minutes']}}} min</p>
	</div>
	<div class="col-sm-4 col-xs-4 recipehighlight-box">
		<div class="recipehighlight-box-icon">
			{{ svg_path('icon-card-info') }}
		</div>
		<p class="recipehighlight-box-title">Calories</p>
		<p class="recipehighlight-box-value">{{{$recipe['nutritional_info']['calories_kcal']}}} kcal</p>
	</div>
	@if(!empty($recipe['nutritional_info']['five_a_day']) && $recipe['nutritional_info']['five_a_day'] > 1)
		<div class="col-sm-4 col-xs-4 recipehighlight-box">
			<div class="recipehighlight-box-icon">
				{{ svg_path('icon-basket') }}
			</div>
			<p class="recipehighlight-box-title">5-a-day</p>
			<div class="recipehighlight-box-value">
				<?php for($i = 0; $i < $recipe['nutritional_info']['five_a_day']; $i++) { ?>
					{{ svg_path('icon-carrot') }}
				<?php } ?>
				(/pers)
			</div>
		</div>
	@endif
</div>
