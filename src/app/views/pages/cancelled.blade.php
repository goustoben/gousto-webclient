@extends('layouts.default')
@section('bodyClass') class="" @stop
@section('content')
	<div class="row">
		<h1 class="text-center text-heading">Parting is such sweet sorrow</h1>
	</div>
	<div class="row">
		<p class="text-center">
			Your account has been cancelled, and
			@if($previous_order)
				you will not recieve further deliveries after the one arriving on <span class="strong text-danger">{{{ $delivery_date->format('l jS F') }}}</span>.
			@else
				you will not receive any further deliveries.
			@endif
			<br />
			Thank you for trying us, our doors are always open should you decide to return!
		</p>
	</div>
	<div class="row">
		<p class="text-center"><a href="/" class="gbtn-primary">Return to Homepage</a></p>
	</div>
@stop
