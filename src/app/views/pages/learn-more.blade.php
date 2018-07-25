@extends('layouts.default')
@include('includes.meta', array('meta' => Config::get('meta.main.learn-more')))
@section('bodyClass') class="faq"@stop
@section('content')
<div class="row">
	<h1 data-selid="main-title" class="text-center text-heading">How can we help you?</h1>
</div>
<div class="row">
	<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
		{{ Form::open(array('route' => 'faqs', 'method' => 'get', 'class' => 'form-inline', 'id' => 'form-inline', 'role' => 'form')) }}
			<h4 class="text-heading">Search FAQs</h4>
			{{ Form::submit('&gt;', array('class' => 'gbtn-primary input-group-rightbtn')) }}
			{{ Form::text('q', Input::get('q', ''), array('class' => 'form-control input-group-field', 'id' => 'InputText', 'placeholder' => 'Search')) }}
		{{ Form::close() }}
	</div>
</div>
<div class="row">
	<div class="col-sm-6 faq-category-wrapper">
		@foreach($categories as $category)
			@if($category['column'] === '1')
				@include('includes.faq-category')
			@endif
		@endforeach
	</div>
	<div class=" col-sm-6 faq-category-wrapper">
		@foreach($categories as $category)
			@if($category['column'] === '2')
				@include('includes.faq-category')
			@endif
		@endforeach
	</div>
	<div class="clear"></div>
</div>
<div class="row">
	<div id="haveaquestion-container">
		<div class="row">
			<div class="col-md-6">
				<h4 class="text-heading">Can't find what you're looking for?</h4>
				<p>Ask us a question.</p>
				<a class="gbtn-primary" href="{{ Config::get('zendesk.contact_form_url') }}">
					Get in touch
				</a>
			</div>
		</div>
	</div>
</div>
@stop
