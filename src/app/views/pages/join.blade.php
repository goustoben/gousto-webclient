@extends('layouts.homepage-d')
@include('includes.meta', array('meta' => Config::get('meta.main.home')))
@section('bodyClass')class="homepage-d"@stop

@section('content')
	{{ Form::open(array('route' => 'promotion.set-session', 'role' => 'form', 'id' => 'voucher-form')) }}
		@include('includes.modals.promo-apply')
	{{ Form::close() }}
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
			<a href="{{{ URL::to('signup') }}}?steps=boxSize,postcode,delivery" class="gbtn-primary gbtn--lg" data-selid="homepage-hero-see-menu">
				Get Started <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>
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
			<a href="{{{ URL::to('signup') }}}?steps=boxSize,postcode,delivery" class="gbtn-primary gbtn--lg">
				Get Started <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>
			</a>
		</div>
	</div>

	<section class="container home-deliver">
		<h2 class="home-section-title">Over 1 million meals delivered</h2>
		<p class="home-howitworks-subtitle">
			Here are a <span class="text-success">happy</span> few:
		</p>
		<div class="flex-center-all">
			{{ svg_path('icon-hearts') }}
		</div>
		<div class="row">
			<div class="col-xs-12 col-md-6 text-center">
				<blockquote class="gquote">
					<p>
						Exceptionally high quality ingredients, superb meat, great big portions.
						No waste - one of the best bits - and a significant saving on our weekly
						food bill. Super excited when the box arrives each week!
					</p>
					<span class="strong author">Rachel, Leeds</span>
				</blockquote>
			</div>
			<div class="col-xs-12 col-md-6 text-center">
				<blockquote class="gquote">
					<p>
						Our boring meals are once again adventurous! Food bill is reduced as I
						no longer buy veg and meat that I don't use. On to our third week of
						orders now - delicious!
					</p>
					<span class="strong author">Alison, St Albans</span>
				</blockquote>
			</div>
		</div>
		<div id="StoryStreamWidgetApp" class="row stry-widget"></div>
		<div class="text-center">
			<a href="{{{ URL::to('signup') }}}?steps=boxSize,postcode,delivery" class="gbtn-primary gbtn--lg">
				Get Started <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>
			</a>
		</div>
	</section>

	<section class="home-deliver home-deliver-everything container">
		<h2 class="home-section-title">We deliver everything you need</h2>
		<div class="row home-deliver-box-join">
			<div class="col-xs-12 col-md-6">
				<ul class="home-deliver-list">
					<li>
						{{ svg_path('icon-freshness-guaranteed') }}
						<span class="home-deliver-list-text">Freshness guaranteed</span>
					</li>
					<li>
						{{ svg_path('icon-britishmeat') }}
						<span class="home-deliver-list-text">High welfare British meat</span>
					</li>
				</ul>
			</div>
			<div class="col-xs-12 col-md-6">
				<ul class="home-deliver-list">
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
		</div>
		<div class="text-center">
			<a href="{{{ URL::to('signup') }}}?steps=boxSize,postcode,delivery" class="gbtn-primary gbtn--lg">
				Get Started <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>
			</a>
		</div>
	</section>

	<div class="container-fluid home-partners-wrapper-join">
		<section class="container">
			<div class="col-md-12">
				<h2 class="home-partners-title">Tested and loved by</h2>

				<div id="partners-carousel" class="carousel slide" data-ride="carousel">
					<div class="carousel-inner" role="listbox">
						{{-- TODO: use the right icons --}}
						<div class="item active">
							<div class="col-md-4 home-partners-logo mobile-hide">
								{{ image_tag(image_path('images/icons/hello-logo.png'), array("alt" => "Hello!", "lazy" => true)) }}
							</div>
							<div class="col-xs-12 col-md-4 home-partners-logo">
								{{ image_tag(image_path('images/icons/bbc-logo.png'), array("alt" => "BBC", "lazy" => true)) }}
							</div>
							<div class="col-md-4 home-partners-logo mobile-hide">
								{{ image_tag(image_path('images/icons/sunday-times-logo.png'), array("alt" => "The Sunday Times", "lazy" => true)) }}
							</div>
						</div>
						<div class="item">
							<div class="col-md-4 home-partners-logo mobile-hide">
								{{ image_tag(image_path('images/icons/the-times-logo.png'), array("alt" => "The Times", "lazy" => true)) }}
							</div>
							<div class="col-xs-12 col-md-4 home-partners-logo">
								{{ image_tag(image_path('images/icons/cosmo-logo.png'), array("alt" => "Cosmopolitan", "lazy" => true)) }}
							</div>
							<div class="col-md-4 home-partners-logo mobile-hide">
								{{ image_tag(image_path('images/icons/woman-and-home-logo.png'), array("alt" => "Woman & Home", "lazy" => true)) }}
							</div>
						</div>
						<div class="item">
							<div class="col-md-4 home-partners-logo mobile-hide">
								{{ image_tag(image_path('images/icons/hello-logo.png'), array("alt" => "Hello!", "lazy" => true)) }}
							</div>
							<div class="col-xs-12 col-md-4 home-partners-logo">
								{{ image_tag(image_path('images/icons/the-times-logo.png'), array("alt" => "The Times", "lazy" => true)) }}
							</div>
							<div class="col-md-4 home-partners-logo mobile-hide">
								{{ image_tag(image_path('images/icons/sunday-times-logo.png'), array("alt" => "The Sunday Times", "lazy" => true)) }}
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

@section('scripts')
	<script type="text/javascript" src="https://s3-eu-west-1.amazonaws.com/apps.storystream.it/widget/js/677867864.js"></script>
@stop
