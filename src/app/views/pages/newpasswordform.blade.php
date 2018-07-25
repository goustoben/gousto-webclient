@extends('layouts.text')
@section('bodyClass') class="static-pages"@stop
@section('content')
<div class="container">
	<h1>Reset your Password</h1>
	<div class="row">
		<form action="/newpassword" method="post" role="form" id="newpassword">
			<input type="hidden" name="_token" value="{{ csrf_token(); }}">
			<div class="col-md-12" style="padding:30px 30px 0 30px;">
				<div id="reset-error" class="alert alert-danger" style="display:none"></div>
				<div class="form-group">
					<label class="sr-only" for="password">New Password</label>
					<input type="hidden" name="token" value="{{{ $token }}}"/>
					<input type="password" name="password" class="form-control input-lg" placeholder="Please enter a new password"/>
				</div>
				<div class="form-group">
					<input type="submit" class="gbtn-primary validatebd" value="Reset password"/>
				</div>
			</div>
		</form>
	</div>
</div>
@stop
