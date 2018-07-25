@extends('layouts.default')
<?php
	$meta_img = image_path('images/icons/product-placeholder.png');
?>
@if(isset($medias) && !empty($medias))
	@foreach ($medias as $media)
		<?php
			$meta_img = $media['secure_cdn_url'];
			break;
		?>
	@endforeach
@endif
<?php
	$meta_desc = 'A quick and easy ' . $recipe['title'] . ' recipe, from our authentic ' . $recipe['cuisine'] . ' cuisine collection. Find brilliant recipe ideas and cooking tips at Gousto';
	$meta = array_merge(
		array('keywords' => 'Gousto, recipe delivery, organic ingredients, fresh, healthy food, cooking'),
		array_fill_keys(array('title', 'og-title', 'twitter-title'), $recipe['title'] . ' Recipe | Gousto'),
		array_fill_keys(array('description', 'og-description', 'twitter-description'), $meta_desc),
		array_fill_keys(array('og-image', 'twitter-image'), $meta_img)
	);
?>
@include('includes.meta', array('meta' => $meta))
@section('bodyClass') class="indivrecipe-page" @stop
@section('content')
	@include ('pages.recipe.includes.structureddata')
	<div class="container" id="show-recipe-target">
		<div class="row cookbook-gap">
			<div class="col-sm-7 col-xs-12 indivrecipe-product-photo">
				<div class="content">
					@foreach($medias as $media)
						@if ($media['purpose']['slug'] === 'mood-image')
							<?php try { ?>
								{{ image_tag($media['secure_cdn_url'],
									array("lazy" => true, "alt" => $recipe['title'] ),
									array(
										320 => $media['scaled_urls'][350]['secure_cdn_url'],
										500 => $media['scaled_urls'][600]['secure_cdn_url'],
										767 => $media['scaled_urls'][750]['secure_cdn_url'],
										10000 => $media['scaled_urls'][750]['secure_cdn_url'],
										'1x 10000' => $media['scaled_urls'][400]['secure_cdn_url'],
										'2x 10000' => $media['scaled_urls'][800]['secure_cdn_url']
									)
								) }}
							<?php } catch (Exception $e) { ?>
								{{ image_tag($media['secure_cdn_url'], array("lazy" => true, "alt" => $recipe['title'] )) }}
							<?php } ?>
							<?php break; ?>
						@endif
					@endforeach
				</div>
			</div>
			<h1 class="indivrecipe-title">{{{ $recipe['title'] }}}</h1>
			<div class="col-sm-5 col-xs-12">
				@if($recipe['ratings']['average'] > 0)
					<div class="row">
						@if(isset($recipe['ratings']['average']) && isset($recipe['ratings']['count']) && $recipe['ratings']['average'] > 0)
							<div class="indivrecipe-product-rating">
								{{ image_tag(image_path('images/icons/stars-empty.png'), array("alt" => "Rating", "lazy" => true)) }}
								@if ($recipe['ratings']['average'] == 3.5)
									<?php $recipe['ratings']['average'] = 3.55; ?>
								@endif
								<div class="star-overflow" style="width:{{{ $recipe['ratings']['average'] / 5 * 100 }}}%;">
									{{ image_tag(image_path('images/icons/stars-full.png'), array("alt" => $recipe['ratings']['average'] . "rating out of 5", "lazy" => true, "class" =>"stars-full")) }}
								</div>
							</div>
							<p class="indivrecipe-product-rating-count mobile-hide">({{{ $recipe['ratings']['count'] }}} reviews from our customers)</p>
						@endif
					</div>
				@endif
			</div>
			<div class="desktop-hide col-xs-12">
				@include ('pages.recipe.includes.highlight')
			</div>
			<div class="indivrecipe-product-wishlist-left col-sm-5 col-xs-12">
				@if( Sentry::isLoggedIn() && !empty($user))
					<div class="row">
						<div class="col-sm-6">
							<form class="form-inline" role="form" name="reminder-form" id="reminder-form" action="/user/{{{ $user['user']['id'] }}}/wishlist/{{{ $recipe['id'] }}}" method="POST">
								<input type="hidden" name="_token" value="{{ csrf_token(); }}">
								<button type="submit" class="gbtn-primary btn-block">Add to wishlist</button>
							</form>
						</div>
						<div class="col-sm-6 indivrecipe-product-wishlist-right">
							<span class="indivrecipe-product-wishlist-info-icon pull-left">i</span>
							<p class="indivrecipe-product-wishlist-info-text">We'll let you know the next time it's on the menu to order.</p>
						</div>
					</div>
				@endif
				@if(isset($recipe_steps['introduction']))
					<p class="indivrecipe-product-description">{{{ $recipe_steps['introduction'] }}}</p>
				@elseif(isset($recipe['marketing_description']))
					<p class="indivrecipe-product-description">{{{ $recipe['marketing_description'] }}}</p>
				@endif
				<div class="mobile-hide">
					@include ('pages.recipe.includes.highlight')
				</div>
				@if( !Sentry::isLoggedIn() && empty($user))
					<div class="mobile-hide tablet-hide">
						@include ('pages.recipe.includes.trygousto')
					</div>
				@endif
			</div>
			@if( !Sentry::isLoggedIn() && empty($user))
				<div class="desktop-hide">
					@include ('pages.recipe.includes.trygousto')
				</div>
			@endif
		</div>

		<div class="row">
			<div class="col-sm-5 col-xs-12 indivrecipe-panel-wrapper">
				@if(!empty($ingredients))
					<div class="panel indivrecipe-panel" id="ingredients">
						<div class="panel-heading">In Your Box
							<div class="panel-subheading">Ingredients for 2 people <span class="text-danger">(double for 4)</span></div>
						</div>
						<div class="panel-body">
							@foreach($ingredients as $index => $ingredient)
								<div class="col-xs-4 text-center indivrecipe-ingredients">
									@if(empty($ingredient['media']))
											{{ svg_path('icon-vegs', '', ['viewBox' => '0 0 200 200']) }}
									@else
										<?php try { ?>
											{{ image_tag($ingredient['media']['secure_cdn_url'],
												array("lazy" => true, "class" => "indivrecipe-ingredients-img", "alt" => $ingredient['media']['title'] ),
												array(
													320 => $ingredient['media']['scaled_urls'][50]['secure_cdn_url'],
													500 => $ingredient['media']['scaled_urls'][200]['secure_cdn_url'],
													767 => $ingredient['media']['scaled_urls'][200]['secure_cdn_url'],
													10000 => $ingredient['media']['scaled_urls'][200]['secure_cdn_url'],
													'1x 10000' => $ingredient['media']['scaled_urls'][200]['secure_cdn_url'],
													'2x 10000' => $ingredient['media']['scaled_urls'][400]['secure_cdn_url']
												)
											) }}
										<?php } catch (Exception $e) { ?>
											{{ image_tag($ingredient['media']['secure_cdn_url'], array("lazy" => true, "alt" => $ingredient['media']['title'] )) }}
										<?php } ?>
									@endif
									<figcaption class="indivrecipe-ingredients-text">{{{ $ingredient['label'] }}} @if(!empty($ingredient['allergens']))&#8224;@endif</figcaption>
								</div>
							@endforeach
						</div>
						<div class="panel indivrecipe-panel">
							@include ('pages.recipes.equipment_needed')
						</div>
					</div>
				@endif

				<div class="panel indivrecipe-panel" id="nutrition">
					<div class="panel-heading">Nutritional Information&#42;</div>
					<div class="panel-body indivrecipe-nutrition">
						<p class="indivrecipe-nutrition-text">Percentages are based on an adult's daily intake</p>
						<div class="row">
							@include ('pages.recipes.ingredients')
							@include ('pages.recipes.nutritional_info')
							<div class="extra-nutritional-information">
								<span>&#42;Gousto’s nutritional information only applies to ingredients supplied by Gousto. The cooking process and additional ingredients added at home (listed under “What you’ll need”) will affect total values.</span>
							</div>
							@include ('pages.recipes.sub_ingredients')
							@include ('pages.recipes.allergens')
							@include ('pages.recipes.allergens_caveat')
						</div>
					</div>
				</div>
			</div>

			<div class="col-sm-7 col-xs-12 indivrecipe-panel-wrapper">
				@if(!empty($recipe_steps))
					<div class="panel indivrecipe-panel" id="instructions">
						<div class="panel-heading">Cooking Instructions
							<div class="panel-subheading">Instructions for 2 people <span class="text-danger">(double for 4)</span></div>
						</div>
						<div class="panel-body">
							<div class="indivrecipe-steps-container">
							<?php $i = 0; ?>
							@foreach($recipe_steps_img as $recipe_img)
								<div class="row <?php if ($i > 3) echo 'indivrecipe-cooking-more'?>">
									<div class="col-sm-5 col-xs-12 {{{ ($i === count($recipe_steps_img) - 1 && empty($recipe_img)) ? 'indivrecipe-share-step' : 'indivrecipe-cooking-img' }}}">
										<div class="content">
											<span class="indivrecipe-cooking-step step-{{{ $recipe_steps['recipe_steps'][$i]['number'] }}}">{{{ $recipe_steps['recipe_steps'][$i]['number'] }}}</span>
											@if($i === count($recipe_steps_img) - 1 && empty($recipe_img))
												<div class="indivrecipe-share-yours">
													<h2>Share Your Creations</h2>
													<p>Get social and share your best culinary Gousto creations on:</p>
													<ul>
														<li><a href="https://www.facebook.com/goustocooking" class="share"><span class="social-icon facebook">{{ svg_path('icon-facebook') }}</span><span class="text">goustocooking</span></a></li>
														<li><a href="https://www.twitter.com/goustocooking" class="share"><span class="social-icon twitter">{{ svg_path('icon-twitter') }}</span><span class="text">goustocooking</span></a></li>
														<li><a href="https://www.instagram.com/goustocooking" class="share"><span class="social-icon instagram">{{ svg_path('icon-instagram') }}</span><span class="text">Goustocooking</span></a></li>
													</ul>
												</div>
											@else
												@if(!empty($recipe_img))
													<?php try { ?>
														{{ image_tag($recipe_img[0]['secure_cdn_url'],
															array("lazy" => true, "alt" => $recipe_img[0]['title'] ),
															array(
																320 => $recipe_img[0]['scaled_urls'][350]['secure_cdn_url'],
																500 => $recipe_img[0]['scaled_urls'][600]['secure_cdn_url'],
																767 => $recipe_img[0]['scaled_urls'][750]['secure_cdn_url'],
																10000 => $recipe_img[0]['scaled_urls'][750]['secure_cdn_url'],
																'1x 10000' => $recipe_img[0]['scaled_urls'][400]['secure_cdn_url'],
																'2x 10000' => $recipe_img[0]['scaled_urls'][800]['secure_cdn_url']
															)
														) }}
													<?php } catch (Exception $e) { ?>
														{{ image_tag($recipe_img[0]['secure_cdn_url'], array("lazy" => true, "alt" => $recipe_img[0]['title'] )) }}
													<?php } ?>
												@else
													<div class="indivrecipe-cooking-placeholder">
														{{ svg_path('icon-pots-vegs') }}
													</div>
												@endif
											@endif
										</div>
									</div>
									<div class="col-sm-7 col-xs-12 indivrecipe-cooking-text-wrapper">
										<div class="indivrecipe-cooking-text">
											{{ $recipe_steps['recipe_steps'][$i]['instruction'] }}
										</div>
									</div>
								</div>
								<?php $i++; ?>
							@endforeach
							</div>
							<button class="gbtn-tertiary btn-block mobile-hide" id="load-more-btn">
								Load More
								<span class="glyphicon glyphicon-chevron-down"></span>
							</button>
						</div>
					</div>
				@endif

				<div class="panel indivrecipe-panel desktop-hide">
					<div class="panel-heading">Share this recipe</div>
					<div class="panel-body">
						<div class="addthis_toolbox addthis_default_style addthis_32x32_style">
							<a class="addthis_button_facebook"></a>
							<a class="addthis_button_twitter"></a>
							<a class="addthis_button_pinterest_share"></a>
							<a class="addthis_button_google_plusone_share"></a>
							<a class="addthis_button_email"></a>
						</div>
					</div>
				</div>

			</div>
		</div>

		{{-- TODO Similar recipe --}}
	</div>

	<!-- Used by addthis buttons -->
	<script type="text/javascript">var addthis_config = {"data_track_addressbar":false};</script>
	<script type="text/javascript">
		var addthis_share = { url: window.location.origin + "/cookbook/{{{$recipe['url']}}}" };
	</script>
	<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-534be2e32ac109be"></script>
@stop
