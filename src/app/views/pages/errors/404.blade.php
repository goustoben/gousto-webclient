@extends('layouts.default')
@include('includes.meta', array('meta' => Config::get('meta.errors.404')))
@section('bodyClass') class="error-page" @stop
@section('content')
<div class="row">
	<div id="errorwrap-small" class="container text-center clearfix">
		<div class="row">
			<h2 class="text-heading">Oh crumbs!</h2>
			<h3>We can't find the page you're looking for. Please try again or get in touch with our Customer Care team.</h3>
			<div class="error-page-container">
				<h3 class="error-page-contact">
					<span class="glyphicon glyphicon-earphone"></span>
					<a href="tel:{{{ Config::get('company.telephone_link') }}}">{{{ Config::get('company.telephone') }}}</a>
				</h3>
				<h3 class="error-page-contact">
					{{ svg_path('icon-email', 'error-page-email') }}
					<a class="error-page-link" href="mailto:{{{Config::get('company.email')}}}">{{{Config::get('company.email')}}}</a>
				</h3>
			</div>
		</div>
		<div class="row">
			{{ svg_path('icon-gousto-iso', 'error-page-isotype mobile-hide') }}
		</div>
	</div>
</div>
<script>
	dataLayer = window.dataLayer || [];
	dataLayer.push ({
		'event':'error',
		'errorType':'[404]'
	});
</script>
@stop
