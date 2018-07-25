<div class="order-item">
	<div class="order-item-row row">
		<div class="order-item-col col-xs-3 col-sm-12 one-to-one">
			<div class="content">
				@foreach($medias as $media)
					@if ($media['purpose']['slug'] === 'product-image')
					<?php try { ?>
						{{ image_tag($media['secure_cdn_url'], array("class" => "recipe-image product", "alt" => $product['title'], "lazy" => true), array(
							1 => $media['scaled_urls'][200]['secure_cdn_url'],
							767 => $media['scaled_urls'][300]['secure_cdn_url'],
							10000 => $media['scaled_urls'][300]['secure_cdn_url'],
							'1x 10000' => $media['scaled_urls'][300]['secure_cdn_url'],
							'2x 10000' => $media['scaled_urls'][600]['secure_cdn_url']
							)
						) }}
					<?php } catch (Exception $e) { ?>
						{{ image_tag($media['secure_cdn_url'], array("class" => "recipe-image product", "lazy" => true, "alt" => $product['title'] )) }}
					<?php } ?>
					<?php break; ?>
					@endif
				@endforeach
			</div>
		</div>
		<div class="order-item-col col-xs-6 col-sm-12">
			<p class="order-item-title"><span class="strong">{{{ $product['title'] }}}</span> x {{{ $product_item['quantity'] }}}</p>
		</div>
		<div class="order-item-col col-xs-3 col-sm-12">
			@if(isset($is_gift))
				<p class="order-item-price mobile-pull-right">Free Gift</p>
			@else
				<p class="order-item-price mobile-pull-right">&pound;{{{ $product['list_price'] }}}/item</p>
			@endif
		</div>
	</div>
</div>
