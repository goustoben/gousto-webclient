<div class="row">
	<div class="col-sm-4 col-xs-4 recipehighlight-box">
		<div class="recipehighlight-box-icon">
			{{ svg_path('icon-clock') }}
		</div>
		<p class="recipehighlight-box-title">Prep Time</p>
		<p class="recipehighlight-box-value">{{{$recipe['preparation_time_minutes']}}} min</p>
	</div>
	<div class="col-sm-4 col-xs-4 recipehighlight-box">
		<div class="recipehighlight-box-icon">
			{{ svg_path('icon-pin') }}
		</div>
		<p class="recipehighlight-box-title">Cuisine</p>
		<p class="recipehighlight-box-value">{{{ isset($recipe['cuisine']) ? $recipe['cuisine'] : '' }}}</p>
	</div>
	<div class="col-sm-4 col-xs-4 recipehighlight-box">
		<div class="recipehighlight-box-icon">
			{{ svg_path('icon-thumb-up') }}
		</div>
		<p class="recipehighlight-box-title">Use within</p>
		<p class="recipehighlight-box-value">{{{$recipe['shelf_life_days']}}} days</p>
	</div>
</div>
