@extends('layouts.default')
@section('bodyClass') class=""@stop
@section('content')

<div class="container">
	<h1 class="text-center">Payment Failed</h1>
	<div id="billingdetails">
		<div class="gmodal" id="retry-payment">
			@include('includes.payment-method-form')
		</div>
	</div>
</div>

@stop
