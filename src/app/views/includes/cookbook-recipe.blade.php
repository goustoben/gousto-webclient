<div class="cookbook-recipe-header">
	<h3>{{{ $recipe['title'] }}} @if ($recipe['type'] == 'vegetarian' && !$recipe['fish']) (V)@endif</h3>
	@if(isset($recipe['has_taste_award']) && $recipe['has_taste_award'] == 1)
		<div class="taste-award"></div>
	@endif
</div>
@foreach($recipe['media'] as $media)
	@if (isset($media['purpose']['slug']) && $media['purpose']['slug'] === 'mood-image')
		<?php try { ?>
			{{ image_tag($media['secure_cdn_url'],
				array("class" => "recipe-img",
					"lazy" => true,
					"alt" => $recipe['title']
				),
				array(
					320 => $media['scaled_urls'][350]['secure_cdn_url'],
					500 => $media['scaled_urls'][600]['secure_cdn_url'],
					767 => $media['scaled_urls'][750]['secure_cdn_url'],
					10000 => $media['scaled_urls'][800]['secure_cdn_url'],
					'1x 10000' => $media['scaled_urls'][800]['secure_cdn_url'],
					'2x 10000' => $media['scaled_urls'][1500]['secure_cdn_url']
				)
			) }}
		<?php } catch(Exception $e) { ?>
			{{ image_tag($media['secure_cdn_url'],
				array("class" => "recipe-img",
					"lazy" => true,
					"alt" => $recipe['title']
				)
			) }}
		<?php } ?>
	@endif
@endforeach

<p class="readmore"><span><a href="{{{ URL::route('recipe.page.url', array('url' => $recipe['url'])) }}}">Read more</a></span></p>

<div class="cookbook-recipecard-description">
	{{{ $recipe['marketing_description'] }}}
</div>
