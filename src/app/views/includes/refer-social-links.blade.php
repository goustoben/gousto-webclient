{{--
	Wrap this include with with one of the following
	.refersocial-rectangle
	.refersocial-circle
	.refersocial-square
--}}

@if(isset($user['referral-code']))
	<?php $referral = $user['referral-code']; ?>
@endif
@if(isset($user['user']))
	<?php $user['name_first'] = $user['user']['name_first']; ?>
@endif

<a id="email" class="btn refersocial-btn refersocial-btn--email" data-toggle="modal" data-target="#emailFriendsModal">
	{{ svg_path('icon-email') }}
	<span>Email</span>
</a>
<a id="facebook" class="btn refersocial-btn refersocial-btn--facebook"
	data-referralcode="{{{$referral}}}"
	data-username="{{{isset($user['name_first']) ? $user['name_first'] : 'Your friend'}}}"
	data-whatsforthem="{{{ Config::get('referral.whats_for_them') }}}"
	data-image="{{{ image_path('images/photos/gousto-raf-facebook-opengraph.jpg') }}}">
	{{ svg_path('icon-facebook') }}
	<span>Facebook</span>
</a>
<a id="facebook-messenger" class="btn refersocial-btn refersocial-btn--facebook-messenger"
	data-referralcode="{{{$referral}}}"
	data-username="{{{isset($user['name_first']) ? $user['name_first'] : 'Your friend'}}}">
	{{ svg_path('icon-facebook-messenger') }}
	<span>Messenger</span>
</a>
