<div class="modal fade gmodal" id="good-rating-modal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content" id="original-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<p class="modal-title">Thanks!</p>
			</div>
			<div class="modal-body">
				<p><span class="strong">Thanks so much for the feedback! It's great to know you're enjoying Gousto!</span><br/>
					Why not help us spread the word?</p>
				<h5>Refer a friend</h5>
				{{ image_tag(image_path('images/photos/refer.jpg'), array("class" => "mobile-hide", "alt" => "You get £" . Config::get('referral.whats_for_you') . ", they get " . Config::get('referral.whats_for_them') . "% off their first 2 boxes!", "lazy" => true)) }}
				{{ image_tag(image_path('images/photos/refer-mobile.jpg'), array("class" => "desktop-hide", "alt" => "You get £" . Config::get('referral.whats_for_you') . ", they get " . Config::get('referral.whats_for_them') . "% off their first 2 boxes!", "lazy" => true)) }}
				<p>When your friends sign up using your personal invite code – <b class="text-danger">{{{ $user['referral-code'] }}}</b>  - we'll pop £15 into your account to redeem on your next box!</p>
				<div class="share-buttons refersocial-rectangle">
					@include ('includes.refer-social-links', array('user' => $user))
				</div>
				<br/>
				<h5>Leave us a review</h5>
				<p>We're passionate about making home cooking simple so that more people can benefit from good food. If you can spare 1 minute, please write a quick review.</p>
			</div>
			<div class="modal-footer">
				<a class="gbtn-primary" href="https://www.trustpilot.co.uk/evaluate/gousto.co.uk" target="_blank">Write a Review</a>
			</div>
		</div>
	</div>
</div>
