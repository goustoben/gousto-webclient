@foreach($medias as $media)
	@if ($media['purpose']['slug'] === 'mood-image')
		@if($menu['featured_id'] === $recipe['id'])
		<?php try { ?>
			{{ image_tag($media['secure_cdn_url'],
				array("class" => "recipe-img", "lazy" => true, "alt" => $recipe['title'] ),
				array(
					320 => $media['scaled_urls'][350]['secure_cdn_url'],
					500 => $media['scaled_urls'][600]['secure_cdn_url'],
					767 => $media['scaled_urls'][750]['secure_cdn_url'],
					10000 => $media['scaled_urls'][1000]['secure_cdn_url'],
					'1x 10000' => $media['scaled_urls'][1000]['secure_cdn_url'],
					'2x 10000' => $media['scaled_urls'][1500]['secure_cdn_url']
				)
			) }}
		<?php } catch (Exception $e) { ?>
			{{ image_tag($media['secure_cdn_url'], array("class" => "recipe-img", "lazy" => true, "alt" => $recipe['title'] )) }}
		<?php } ?>
		@else
		<?php try { ?>
			{{ image_tag($media['secure_cdn_url'],
				array("class" => "recipe-img", "lazy" => true, "alt" => $recipe['title'] ),
				array(
					320 => $media['scaled_urls'][350]['secure_cdn_url'],
					500 => $media['scaled_urls'][600]['secure_cdn_url'],
					991 => $media['scaled_urls'][750]['secure_cdn_url'],
					10000 => $media['scaled_urls'][600]['secure_cdn_url'],
					'1x 10000' => $media['scaled_urls'][600]['secure_cdn_url'],
					'2x 10000' => $media['scaled_urls'][800]['secure_cdn_url']
				)
			) }}
		<?php } catch (Exception $e) { ?>
			{{ image_tag($media['secure_cdn_url'], array("class" => "recipe-img", "lazy" => true, "alt" => $recipe['title'] )) }}
		<?php } ?>
		@endif
		<?php break; ?>
	@endif
@endforeach

@include( 'includes/stars', array( 'recipe' => $recipe ) )
@include( 'includes/stock')
