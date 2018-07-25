@extends('layouts.recipe')
@section('bodyClass') class="indivrecipe-page twr-recipe" @stop
@section('content')
	<div class="container" id="show-recipe-target">
		<div class="row top-strip col-xs-12 desktop-hide">
			<a href="javascript:void(0);" class="indivrecipe-back"><span>&lt;</span>Recipes</a>
			<a href="javascript:void(0);" data-recipe-id="{{{ $recipe['id'] }}}" data-recipe-title="{{{ $recipe['title'] }}}" data-recipe-slug="{{{ $recipe['slug'] }}}" data-selid="info-box-add-recipe" class="gbtn-primary pull-right indivrecipe-add">Add To Box</a>
		</div>
		<div class="row">
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
			<h1 class="indivrecipe-title desktop-hide">{{{ $recipe['title'] }}}</h1>
			<div class="desktop-hide">
				@include ('pages.recipe.includes.highlight')
			</div>
			<div class="col-sm-5 col-xs-12">
				<h1 class="indivrecipe-title mobile-hide">{{{ $recipe['title'] }}}</h1>
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
							<p class="indivrecipe-product-rating-count">({{{ $recipe['ratings']['count'] }}} reviews from our customers)</p>
						@endif
					</div>
				@endif
				<div class="mobile-hide">
					@include ('pages.recipe.includes.highlight')
				</div>
				<a href="javascript:javascript:void(0);" data-recipe-id="{{{ $recipe['id'] }}}" data-recipe-title="{{{ $recipe['title'] }}}" data-recipe-slug="{{{ $recipe['slug'] }}}" data-selid="info-box-add-recipe" class="row gbtn-primary btn-block mobile-hide indivrecipe-add">Add To Box</a>
				@if(isset($recipe_steps['introduction']))
					<p class="indivrecipe-product-description">{{{ $recipe_steps['introduction'] }}}</p>
				@elseif(isset($recipe['marketing_description']))
					<p class="indivrecipe-product-description">{{{ $recipe['marketing_description'] }}}</p>
				@endif
			</div>
		</div>

		<div class="row">
			<div class="col-sm-7 col-xs-12 indivrecipe-panel-wrapper">
				@if(!empty($ingredients))
					<div class="panel indivrecipe-panel" id="ingredients">
						<div class="panel-heading">In Your Box
							<div class="panel-subheading">Ingredients for 2 people <span class="text-danger">(double for 4)</span></div>
						</div>
						<div class="panel-body">
							@foreach($ingredients as $ingredient)
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
					</div>
					<div class="panel indivrecipe-panel">
						@include ('pages.recipes.equipment_needed')
					</div>
				@endif
			</div>
			<div class="col-xs-12 col-sm-5">
				<div class="panel indivrecipe-panel" id="nutrition">
					<div class="panel-heading">Nutritional Information</div>
					<div class="panel-body indivrecipe-nutrition">
						<p class="indivrecipe-nutrition-text">Percentages are based on an adult's daily intake</p>
						<div class="row">
							@include ('pages.recipes.ingredients')
							@include ('pages.recipes.nutritional_info')
							@include ('pages.recipes.sub_ingredients')
							@include ('pages.recipes.allergens')
							@include ('pages.recipes.allergens_caveat')
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
@stop
