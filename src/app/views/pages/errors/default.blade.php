@extends('layouts.default')
@section('bodyClass') class="error-page" @stop
@section('content')
<div class="row">
	<div id="errorwrap" class="container text-center">
		<div class="row">
			<h1 class="text-heading">Oh crumbs!</h1>
		</div>
		<div class="row">
			<h2 class="text-heading">That wasn't meant to happen. Please try again or get in touch with our Customer Care team.</h2>
		</div>
		<div class="row">
			<h2 class="text-heading">T: {{{ Config::get('company.telephone') }}}</h2>
			<h2 class="text-heading">E: <a class="error-page-link" href="mailto:info@gousto.co.uk">info@gousto.co.uk</a></h2>
		</div>
	</div>
</div>
<script>
	dataLayer = window.dataLayer || [];
	dataLayer.push ({
		'event':'error',
		'errorType':'[Unknown Error]'
	});
</script>
@stop
