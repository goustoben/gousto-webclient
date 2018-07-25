@if ( Sentry::isLoggedIn() && (Request::is('my-*') || Request::is('rate-my-recipes')) && isset($user) && $user['card']['expiring'] && empty($_COOKIE['hide_card_banner']) )
	<div class="card-banner">
		<span class="highlight-links">Hi there! your card ending in {{{ $user['card']['last_four_digits'] }}} will expire at the end of the month. To prevent disruption of service, please update your payment information
			@if (!Request::is('my-details'))
				in <a href="{{{ URL::to('my-details') }}}">My Details</a>
			@endif
		</span>
		<a href="javascript:void(0);" id="card-banner-close" class="pull-right"><span class="glyphicon glyphicon-remove"></span></a>
	</div>
@endif

<script type="text/javascript">
	$('#card-banner-close').on('click', function() {
		$('.card-banner').hide();
		document.cookie="hide_card_banner=true";
	});
</script>
