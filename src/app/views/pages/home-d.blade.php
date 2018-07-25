@extends('layouts.homepage-d')
@include('includes.meta', array('meta' => Config::get('meta.main.home')))
@section('bodyClass')class="homepage-d"@stop

@section('content')
	<section class="home-hero">
		{{ image_tag(image_path($hero_img['desktop']),
				array("class" => "home-hero-bg", "lazy" => true, "alt" => "Gousto Box" ),
				array(
					767 => image_path($hero_img['mobile']),
					10000 => image_path($hero_img['desktop'])
		)) }}
		<div class="col-xs-12 col-sm-8 col-sm-offset-4 home-hero-fly">
			<h1 class="home-hero-title">{{{ $hero_img['title'] }}}</h1>
			<p class="home-hero-subtitle">{{ $hero_img['description'] }}</p>
			<a href="{{{ (isset($simplePage) && $simplePage)? URL::to('signup') : URL::route('menu') }}}" class="gbtn-primary gbtn--lg" data-selid="homepage-hero-see-menu">
				{{{ (isset($simplePage) && $simplePage)? 'Get Started' : 'See Menu' }}} <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>
			</a>
			@if( !isset($simplePage) || !$simplePage )
				<div class="home-hero-voucher" data-bind-local-session="promo">
					<a href="#" id="home-no-voucher" data-toggle="modal" data-target="#promo-apply-modal" data-step="step-enter-voucher" data-save="localSession">
						<span class="glyphicon glyphicon-gift" aria-hidden="true"></span> Have a special code?
					</a>
					<p id="home-valid-voucher"></p>
				</div>
			@endif
			@if ($hero_img['show_celebrity_chef'])
				@foreach($recipes as $index => $recipe)
					@if(isset($recipe['chef_id']))
						<div class="home-hero-celebrity">
							{{ image_tag($recipe['chef']['headshot_url'], array("alt" => $recipe['chef']['name'], "class" => "pull-left home-hero-celebrity-photo", "lazy" => true)) }}
							<div class="text-center">
								<h4 class="home-hero-celebrity-title">{{{ $recipe['chef']['name'] }}}</h4>
								<p class="home-hero-celebrity-body">is this week's</p>
								<p class="home-hero-celebrity-body">Celebrity Guest Chef</p>
							</div>
						</div>
					@endif
				@endforeach
			@endif
		</div>
	</section>

	@include('includes.how-it-works')

	<div class="container-fluid home-inspiration-wrapper">
		<h2 class="home-section-title">This week you could be cooking...</h2>

		<div class="relative">
			<a id="arrow-left" class="mobile-hide" href="#dinner-inspiration" data-slide="prev">
				<span class="glyphicon glyphicon-chevron-left"></span>
			</a>
			<section id="dinner-inspiration" class="carousel slide home-inspiration-carousel" data-pause="hover" data-interval="5000" data-ride="carousel">
				<div class="carousel-inner home-inspiration-carousel-inner">
					@foreach($recipes as $index => $recipe)
						<div class="item {{{ $index === 0 ? 'active':'' }}}">
							<div class="col-sm-3 col-xs-12 home-inspiration-item home-inspiration-sideoverlay">
								<a href="{{{ (isset($simplePage) && $simplePage)? URL::to('signup') : URL::route('menu') }}}" class="home-inspiration-recipelink">
									<?php try { ?>
										{{ image_tag($recipe['media'][0]['secure_cdn_url'],
											array("class" => "home-inspiration-recipeimg", "lazy" => true, "alt" => $recipe['title'] ),
											array(
												320 => $recipe['media'][0]['scaled_urls'][350]['secure_cdn_url'],
												500 => $recipe['media'][0]['scaled_urls'][500]['secure_cdn_url'],
												767 => $recipe['media'][0]['scaled_urls'][750]['secure_cdn_url'],
												10000 => $recipe['media'][0]['scaled_urls'][350]['secure_cdn_url'],
											)
										) }}
									<?php } catch (Exception $e) { ?>
										{{ image_tag($recipe['media'][0]['secure_cdn_url'], array("class" => "home-inspiration-recipeimg", "lazy" => true, "alt" => $recipe['title'] )) }}
									<?php } ?>
									<span class="home-inspiration-recipetitle">{{{ $recipe['title'] }}}</span>
								</a>
							</div>
						</div>
					@endforeach
				</div>
			</section>
			<a id="arrow-right" class="mobile-hide" href="#dinner-inspiration" data-slide="next">
				<span class="glyphicon glyphicon-chevron-right"></span>
			</a>
		</div>

		<div class="text-center">
			<a href="{{{ (isset($simplePage) && $simplePage)? URL::to('signup') : URL::route('menu') }}}" class="gbtn-primary gbtn--lg">
				{{{ (isset($simplePage) && $simplePage)? 'Get Started' : 'See Menu' }}} <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>
			</a>
		</div>
	</div>

	<section class="home-deliver container">
		@if(isset($promoCode) || (isset($simplePage) && $simplePage))
			<h2 class="home-section-title">Delivered to you</h2>
		@else
			<h2 class="home-section-title">Over 1 Million Meals Delivered</h2>
		@endif
		<div class="row home-deliver-box">
			<div class="col-xs-12 col-md-6">
				@if(isset($promoCode) || (isset($simplePage) && $simplePage))
					<p class="home-deliver-body">Everything you need to cook up to 4 delicious meals for 2 or 4 people.</p>
				@else
					<p class="home-deliver-body">Our recipe boxes contain everything you need to cook up to 4 delicious meals for 2 or 4 people.</p>
				@endif
				<ul class="home-deliver-list">
					<li>
						{{ svg_path('icon-freshness-guaranteed') }}
						<span class="home-deliver-list-text">Freshness guaranteed</span>
					</li>
					<li>
						{{ svg_path('icon-britishmeat') }}
						<span class="home-deliver-list-text">High welfare British meat</span>
					</li>
					<li>
						{{ svg_path('icon-recipe-card') }}
						<span class="home-deliver-list-text">Easy to follow recipe cards</span>
					</li>
					<li>
						{{ svg_path('icon-woolcool') }}
						<span class="home-deliver-list-text">Woolcool packaging that keeps your food fresh even when you're not at home</span>
					</li>
				</ul>
			</div>
			<div class="col-xs-12 col-md-6 text-center">
				<div id="home-deliver-carousel" class="carousel slide home-deliver-carousel" data-ride="carousel">
					<ol class="carousel-indicators">
						<li data-target="#home-deliver-carousel" data-slide-to="0"></li>
						<li data-target="#home-deliver-carousel" data-slide-to="1" class="active"></li>
						<li data-target="#home-deliver-carousel" data-slide-to="2"></li>
						<li data-target="#home-deliver-carousel" data-slide-to="3"></li>
						<li data-target="#home-deliver-carousel" data-slide-to="4"></li>
					</ol>
					<div class="carousel-inner" role="listbox">
						<div class="item">
							{{ image_tag(image_path('images/poster/homepage-deliver-1.jpg'), array("alt" => "Packing a gousto box", "lazy" => true, "class" => "bg")) }}
						</div>
						<div class="item active">
							{{ image_tag(image_path('images/poster/homepage-deliver-2.jpg'), array("alt" => "Box on the door Steps", "lazy" => true, "class" => "bg")) }}
						</div>
						<div class="item">
							{{ image_tag(image_path('images/poster/homepage-deliver-3.jpg'), array("alt" => "Box unpacking", "lazy" => true, "class" => "bg")) }}
						</div>
						<div class="item">
							{{ image_tag(image_path('images/poster/homepage-deliver-4.jpg'), array("alt" => "Recipe cooking", "lazy" => true, "class" => "bg")) }}
						</div>
						<div class="item">
							{{ image_tag(image_path('images/poster/homepage-deliver-5.jpg'), array("alt" => "Final touch on the recipe", "lazy" => true, "class" => "bg")) }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="text-center">
			<a href="{{{ (isset($simplePage) && $simplePage)? URL::to('signup') : URL::route('menu') }}}" class="gbtn-primary gbtn--lg">
				{{{ (isset($simplePage) && $simplePage)? 'Get Started' : 'See Menu' }}} <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>
			</a>
		</div>
	</section>

	<div class="container-fluid home-partners-wrapper mobile-hide">
		<section class="container">
			<div class="col-md-12 col-lg-6 text-center">
				<div class="fb-page" data-href="https://www.facebook.com/goustocooking" data-width="500" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" data-show-posts="false"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/goustocooking"><a href="https://www.facebook.com/goustocooking">Gousto</a></blockquote></div></div>
			</div>
			<div class="col-md-12 col-lg-6">
				<h4 class="home-partners-title">Tested and loved by</h4>

				<div id="partners-carousel" class="carousel slide" data-ride="carousel">
					<div class="carousel-inner" role="listbox">
						{{-- TODO: use the right icons --}}
						<div class="item active">
							<div class="col-sm-4 home-partners-logo">
								{{ image_tag(image_path('images/icons/hello-logo.png'), array("alt" => "Hello!", "lazy" => true)) }}
							</div>
							<div class="col-sm-4 home-partners-logo">
								{{ image_tag(image_path('images/icons/bbc-logo.png'), array("alt" => "BBC", "lazy" => true)) }}
							</div>
							<div class="col-sm-4 home-partners-logo">
								{{ image_tag(image_path('images/icons/sunday-times-logo.png'), array("alt" => "The Sunday Times", "lazy" => true)) }}
							</div>
						</div>
						<div class="item">
							<div class="col-sm-4 home-partners-logo">
								{{ image_tag(image_path('images/icons/the-times-logo.png'), array("alt" => "The Times", "lazy" => true)) }}
							</div>
							<div class="col-sm-4 home-partners-logo">
								{{ image_tag(image_path('images/icons/cosmo-logo.png'), array("alt" => "Cosmopolitan", "lazy" => true)) }}
							</div>
							<div class="col-sm-4 home-partners-logo">
								{{ image_tag(image_path('images/icons/woman-and-home-logo.png'), array("alt" => "Woman & Home", "lazy" => true)) }}
							</div>
						</div>
					</div>

					<a id="partner-arrow-right" href="#partners-carousel" data-slide="prev" class="home-partners-chevron home-partners-chevron--left">
						<span class="glyphicon glyphicon-chevron-left"></span>
					</a>
					<a id="partner-arrow-right" href="#partners-carousel" data-slide="next" class="home-partners-chevron home-partners-chevron--right">
						<span class="glyphicon glyphicon-chevron-right"></span>
					</a>
				</div>

				<div class="home-partners-stars">
					@for($i = 0; $i < 4; $i++)
						{{ svg_path('icon-star', 'home-partners-star-full') }}
					@endfor
					{{ svg_path('icon-star', 'home-partners-star-empty') }}
				</div>
				@if (isset($simplePage) && $simplePage)
					<div class="home-partners-trustpilot-title">
				@else
					<a href="https://uk.trustpilot.com/review/gousto.co.uk" class="home-partners-trustpilot-title" target="_blank">
				@endif
					<h4>
							Our customers rave about us on
							{{ image_tag(image_path('images/icons/trustpilot-logo.png'), array("alt" => "TrustPilot", "lazy" => true, "class" => "home-partners-trustpilot-logo")) }}
					</h4>
				@if (isset($simplePage) && $simplePage)
					</div>
				@else
					</a>
				@endif
		</section>
	</div>
@stop

@include('includes.modals.refer')

@if(Session::has('modal_error_message'))
	<script type="text/javascript">
		window.onload = function(){
			$('.loginbutton').click();
		};
	</script>
@endif
