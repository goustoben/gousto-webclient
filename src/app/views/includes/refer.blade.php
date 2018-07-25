<div class="padd">
	<div class="referblock-wrapper">
		<h3>Share The Love</h3>
		<p>If you love Gousto, share it with your friends</p>
		@if(isset($display_referral_code))
			<p>Your personal invite code is: <span class="strong text-danger">{{{ $user['referral-code'] }}}</span></p>
		@endif
		<hr/>
		<p>They get {{{ Config::get('referral.whats_for_them') }}}&#37; off their first 2 boxes!</p>
		<p>You get <span class="strong">&pound;{{{ Config::get('referral.whats_for_you') }}} OFF</span> your next box for every buddy that signs up. WIN!</p>
	</div>
	<div class="summary">
		<div id="share-buttons" class="refersocial-rectangle">
			@include ('includes.refer-social-links', array( 'referral-code' => $user['referral-code'] ) )
		</div>
	</div>
</div>
