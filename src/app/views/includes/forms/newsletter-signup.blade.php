<form class="form-inline breadcrumb-signup-form" role="form">
	<input type="hidden" name="_token" value="{{ csrf_token(); }}">
	<input type="hidden" name="u" value="8a9db11b4d499171c2700ab43" />
	<input type="hidden" name="id" value="3d7d20140d" />
	<input type="email" name="EMAIL" class="form-control email breadcrumbInputEmail mobile-hide" placeholder="{{{ isset($email_placeholder) ? $email_placeholder : 'Enter your email for FREE recipe cards' }}}" required autocomplete="off">
	<input type="email" name="EMAIL" class="form-control email breadcrumbInputEmail desktop-hide" placeholder="{{{ isset($email_placeholder_mobile) ? $email_placeholder_mobile : 'Enter your email for FREE recipe cards' }}}" required autocomplete="off">
	<button id="newsletter-sign-up" type="submit" class="gbtn-primary breadcrumbEmailSubmit ladda-button" data-style="slide-left">
		<span class="ladda-label">
			<span class="mobile-hide">Sign Up <span class="glyphicon glyphicon-chevron-right"></span></span>
			<span class="desktop-hide">OK</span>
		</span>
	</button>
	<label class="newsletterlab"></label>
	<label class="newslettererror"></label>
</form>
