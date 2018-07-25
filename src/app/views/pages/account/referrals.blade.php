@extends('layouts.account')
@section('bodyClass')class="account free-boxes"@stop
@section('content')
<div class="container account-content-container">
	<div id="referral-image-container-desktop" class="row mobile-hide">
		{{ image_tag(image_path('images/photos/refer.jpg'), array("id" => "referral-image", "alt" => "You get £" . Config::get('referral.whats_for_you') . ", they get " . Config::get('referral.whats_for_them') . "% off their first 2 boxes!", "lazy" => true)) }}
	</div>
	<div id="referral-container-mobile" class="row desktop-hide">
		{{ image_tag(image_path('images/photos/refer-mobile.jpg'), array("id" => "referral-image", "alt" => "You get £" . Config::get('referral.whats_for_you') . ", they get " . Config::get('referral.whats_for_them') . "% off their first 2 boxes!", "lazy" => true)) }}
	</div>
	<div class="row">
		<div id="referral-text">
			<p class="standout-text">Refer a friend – you get &pound;{{{ Config::get('referral.whats_for_you') }}}, they get {{{ Config::get('referral.whats_for_them') }}}&#37; off their first 2 boxes!</p>
			<p class="account-text">
				Your &pound;{{{ Config::get('referral.whats_for_you') }}} credit shows up in your account once your friend's first box is delivered. Make sure they use your link or promo code.
			</p>
		</div>
	</div>
	<div id="referral-container-bottom" class="row">
		<p class="account-text">Send this unique link to your friends.</p>
		<div class="col-xs-12 col-sm-6" id="referral-code-container">
			<div id="referral-code-box" class="flex-center-v" data-clipboard-text="https://www.gousto.co.uk/join?promo_code={{{ $user['referral-code'] }}}">
				<span id="referral-code">
					<span class="mobile-hide">https://www.</span>gousto.co.uk/join?promo_code={{{ $user['referral-code'] }}}</span>
			</div>
			<div id="referral-code-copied"></div>
		</div>
		<div class="col-xs-12 col-sm-5" id="referral-share-links">
			<p class="refersocial-rectangle">
				@include ('includes.refer-social-links', array('user' => $user))
			</p>
		</div>
	</div>
</div>
@include('includes.email-friends-modal', array('user' => $user))

@include('includes.existing-subscriber-tracking', ['referral_count' => $referral])
@include('includes.changeurl')
@stop
