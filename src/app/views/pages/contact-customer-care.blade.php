@extends('layouts.default')
@section('bodyClass') class="error-page" @stop
@section('content')
<div id="billingModal" class="modal fade gmodal" tabindex="-1" role="dialog" aria-labelledby="modalBillingLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content"></div>
	</div>
</div>
<div class="row text-center">
	<div id="errorwrap" class="container">
		<div class="row">
			<h1 class="text-heading">Oops! Something went wrong. We are very sorry. Please try again</h1>
		</div>
		<div class="row">
			<h2 class="text-heading">alternatively you can contact customer care on</h2>
		</div>
		<div class="row">
			<div class="col-md-6">
				<h2 class="text-heading">T: {{{ Config::get('company.telephone') }}}</h2>
			</div>
			<div class="col-md-6">
				<h2 class="text-heading">E: <a href="mailto:info@gousto.co.uk">info@gousto.co.uk</a></h2>
			</div>
		</div>
		<div class="row">
			<h3 class="text-heading">Error details: {{{ $error_details or 'No details provided' }}}</h3>
		</div>
	</div>
</div>
@if(isset($error) && $error === 'no-payment-method')
	<script>
		window.onload = function(){
			$('#billingModal').modal({
				remote: '{{{'/billing-modal/'.$user['user']['id'].'/'.$user['user']['name_first'].'/new'}}}',
				show:true
			});
		}
	</script>
@endif
@stop
