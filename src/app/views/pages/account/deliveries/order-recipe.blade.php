<div class="order-item">
	<div class="order-item-row row">
		<a href="{{{ URL::to('/cookbook') . '/' . $recipe['url'] }}} ">
			<div class="order-item-col col-xs-3 col-sm-12 one-to-one">
				<div class="content">
					@foreach($medias as $media)
						@if ($media['purpose']['slug'] === 'mood-image')
							<?php try { ?>
								{{ image_tag($media['secure_cdn_url'], array("class" => "recipe-image", "alt" => $recipe['title'], "lazy" => true), array(
									1 => $media['scaled_urls'][200]['secure_cdn_url'],
									767 => $media['scaled_urls'][300]['secure_cdn_url'],
									10000 => $media['scaled_urls'][300]['secure_cdn_url'],
									'1x 10000' => $media['scaled_urls'][300]['secure_cdn_url'],
									'2x 10000' => $media['scaled_urls'][600]['secure_cdn_url']
									)
								) }}
							<?php } catch (Exception $e) { ?>
								{{ image_tag($media['secure_cdn_url'], array("class" => "recipe-image product", "lazy" => true, "alt" => $recipe['title'] )) }}
							<?php } ?>
							<?php break; ?>
						@endif
					@endforeach
				</div>
			</div>
			<div class="order-item-col col-xs-9 col-sm-12">
				<p class="order-item-title"><span class="strong">{{{ $recipe['title'] }}}</span></p>
			</div>
			<div class="order-item-col col-xs-3 col-sm-12">
				<p class="order-item-price mobile-pull-right">&nbsp;</p>
			</div>
		</a>
	</div>
</div>
