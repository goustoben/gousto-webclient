@extends('layouts.text')
@include('includes.meta', array('meta' => Config::get('meta.main.contact')))
@section('bodyClass') class="contact-us"@stop
@section('content')
<div id="map-canvas" class="gousto-map mobile-hide">{{-- leave me alone --}}</div>

<div class="container contact-container">
	<div class="row text-center">
		<h1 data-selid="main-title" class="text-heading">Contact Gousto</h1>
		<h2 class="contact-text">We're here for you!</h2>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-3 contact-office">
		<h3 class="contact-text">Our Office</h3>
		<p>
			{{{ Config::get('company.address_line_1') }}}<br/>
			{{{ Config::get('company.postcode') }}}, {{{ Config::get('company.address_line_2') }}}
		</p>
		<p>
			<span class="strong">Phone:</span> {{{ Config::get('company.telephone') }}}<br/>
			9:30AM to 7:30PM, Monday to Friday<br/>
			10:30AM to 7PM, Saturday and Sunday
		</p>
		<p><span class="strong">Email:</span> <a href="mailto:info@gousto.co.uk" class="contact-link">info@gousto.co.uk</a></p>

		<ul class="contact-socials">
			<li><a href="http://www.facebook.com/goustocooking" class="footer-icon">{{ svg_path('icon-facebook')}}</a></li>
			<li><a href="https://twitter.com/goustocooking" class="footer-icon">{{ svg_path('icon-twitter')}}</a></li>
			<li><a href="https://www.youtube.com/UKGousto/" class="footer-icon">{{ svg_path('icon-youtube')}}</a></li>
			<li><a href="http://instagram.com/goustocooking" class="footer-icon">{{ svg_path('icon-instagram')}}</a></li>
			<li><a href="https://plus.google.com/108410015391305217990" class="footer-icon">{{ svg_path('icon-gplus')}}</a></li>
			<li><a href="http://www.pinterest.com/goustocooking" class="footer-icon">{{ svg_path('icon-pinterest')}}</a></li>
		</ul>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-9">
		<div id="haveaquestion-container">
			<div class="col-xs-12">
				<h3 class="contact-text">Contact Us</h3>
			</div>
			<p class="hide error-msg text-danger col-xs-12 col-sm-12 col-md-12"></p>
			{{ Form::open(array('route' => 'enquiry.question', 'id' => 'haveaquestion')) }}
				{{ Form::hidden('page', 'contact'); }}
				<div class="col-xs-12 col-sm-12 col-md-6">
					<div class="form-group">
						{{ Form::select('contact_type', array('' => 'Contact me via...', 'phone' => 'Phone', 'email' => 'Email'), '', array('class' => 'form-control', 'required' => true)) }}
					</div>
					<div class="form-group">
						{{ Form::label('email', 'Email address', array('class' => 'sr-only')) }}
						{{ Form::text('email', '', array('class' => 'form-control', 'placeholder' => 'Email*', 'required' => true)) }}
					</div>
					<div class="form-group">
						{{ Form::label('phone', 'Phone number', array('class' => 'sr-only')) }}
						{{ Form::text('phone', '', array('class' => 'form-control', 'placeholder' => 'Phone*', 'required' => true)) }}
					</div>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-6">
					{{ Form::textarea('details', '', array('class' => 'form-control', 'placeholder' => 'Message', 'required' => true)) }}
					<div class="row">
						{{ Form::submit('Contact Us', array('class' => 'gbtn-primary pull-right')) }}
					</div>
				</div>
			{{ Form::close() }}
		</div>
	</div>
</div>
@stop
