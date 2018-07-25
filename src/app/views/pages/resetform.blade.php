@extends('layouts.text')
@include('includes.meta', array('meta' => Config::get('meta.main.reset-password')))
@section('bodyClass') class="static-pages" @stop
@section('content')
<div class="container">
	<h1>Reset your Password</h1>
	<div class="row">
		<form action="/reset" method="post" role="form" id="password-reset">
			<input type="hidden" name="_token" value="{{ csrf_token(); }}">
			<div class="col-sm-6 col-sm-offset-3">
				<div id="bad-email" class="alert alert-danger hidden">
					Your email address was not recognised, please check and try again.
				</div>
				<div class="form-group">
					<label class="sr-only" for="exampleInputEmail2">Email address</label>
					<input type="text" name="email" id="email" class="form-control input-lg" placeholder="Enter your email address" value="" autofocus >
				</div>
				<div class="form-group text-center">
					<input type="submit" class="gbtn-primary validatebd" value="Reset password"/>
				</div>
			</div>
		</form>
	</div>
</div>
@stop
