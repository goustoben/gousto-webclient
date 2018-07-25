<div class="modal-dialog">
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			<h4 class="modal-title text-center">Login</h4>
		</div>
		<div class="modal-body">
			<form id="loginForm" class="form-inline" role="form" action="/login" method="post" data-url ="{{{Session::get('url.intended', '/my-gousto')}}}">
                <input type="hidden" name="_token" value="{{ csrf_token(); }}">
                <div id="login-error" class="alert alert-danger" style="display:none"><span class="strong">Error: </span>Incorrect email or password</div>
				<div id="login-success" class="alert alert-success" style="display:none"><span class="strong">Success!</span></div>
				<div id="checkout-error" class="alert alert-warning @if(!Session::has('modal_error_message'))hide@endif">
					@if(Session::has('modal_error_message'))
						{{{ Session::get('modal_error_message') }}}
					@endif
				</div>
				<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						<label class="sr-only" for="email">Email address</label>
						<input type="email" class="form-control login-input" id="email" name="email" placeholder="Enter email">
						<label class="sr-only" for="password">Password</label>
						<input type="password" class="form-control login-input" id="password" name="password" placeholder="Password">
						<input type="checkbox" name="rememberme" id="rememberme"> <label for="rememberme" class="remeberme-label">Keep me logged in (not recommended if you are using a public or shared device)</label>
						<button id="loginBtn" type="submit" class="gbtn-primary pull-right ladda-button" data-style="slide-left" data-selid="login-go">Go</button>
						<div id="password-reset" class="highlight-links">
							<a href="{{{ URL::to('/') }}}/resetform">Forgot your password?</a>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
