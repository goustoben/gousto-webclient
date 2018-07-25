<div class="recipe-rating-outer col-xs-6 {{{ $order['num_unique_recipes'] === 4 ? 'col-sm-6 col-md-3' : 'col-md-4' }}} ">
	<div class="recipe-rating-inner">
		<div class="recipe-rating-image">
			@foreach($recipe['media'] as $media)
				@if ($media['purpose']['slug'] === 'mood-image')
						<?php try { ?>
						{{ image_tag($media['secure_cdn_url'], array("alt" => $recipe['title'], "lazy" => true), array(
							485 => $media['scaled_urls'][500]['secure_cdn_url'],
							767 => $media['scaled_urls'][400]['secure_cdn_url'],
							10000 => $media['scaled_urls'][400]['secure_cdn_url'],
							'1x 10000' => $media['scaled_urls'][400]['secure_cdn_url'],
							'2x 10000' => $media['scaled_urls'][700]['secure_cdn_url']
							)
						) }}
					<?php } catch (Exception $e) { ?>
						{{ image_tag($media['secure_cdn_url'], array("lazy" => true, "alt" => $recipe['title'] )) }}
					<?php } ?>
					<?php break; ?>
				@endif
			@endforeach
		</div>
		<div class="recipe-rating-title flex-center-all text-center">
			<p>{{{ $recipe['title'] }}}</p>
		</div>
		@if(isset($recipe['rating']))
			<div class="stored-rating">
				<div class="recipe-rating-stars text-center">
					@for ($i = 0; $i < $recipe['rating']; $i++)
						<span class="glyphicon glyphicon-star gold"></span>
					@endfor
				</div>
				<p class="recipe-rating-meaning text-center">{{{ $meanings[$recipe['rating']] }}}</p>
				<div class="recipe-rating-comments text-center">
					<p class="saved-rating-text">{{{ $recipe['comment'] }}}</p>
				</div>
			</div>
		@else
			<div class="recipe-rating-form">
				{{ Form::open(array('url' => '/order/' . $order_id . '/rating/' . $recipe_id, 'method' => 'POST', 'name' => 'rating' . $recipe_id, 'data-recipe-id' => $recipe_id, 'class' => 'rating')) }}
					<div class="recipe-rating-stars text-center">
						@foreach($meanings as $value => $meaning)
							<button data-content="{{{ $meaning }}}" data-value="{{{ $value }}}" data-recipe="{{{ $recipe_id }}}" class="imitate-link star"><span class="glyphicon glyphicon-star"></span></button>
						@endforeach
					</div>
					<p class="recipe-rating-meaning text-center"></p>
					<div class="recipe-rating-comments">
						{{ Form::textarea('recipe-review', NULL, array('class' => 'form-control', 'placeholder' => 'Please tell us a bit more about your rating...', 'rows' => '5', 'maxlength' => '240', 'id' => 'recipe-review-' . $recipe_id, 'data-recipeid' => $recipe_id))}}
						<p class="saved-rating-text hide-soft">
						</p>
					</div>
					{{ Form::hidden('recipe-rating','3',array())}}
					<button type="submit" class="gbtn-secondary btn-block recipe-rating-btn ladda-button" id="submit-rating-{{{ $order_id . '-' . $recipe_id }}}" data-style="slide-left" disabled="disabled">
						Rate this recipe
					</button>
				{{ Form::close() }}
			</div>
		@endif
	</div>
</div>
