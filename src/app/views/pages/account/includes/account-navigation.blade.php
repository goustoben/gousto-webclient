<div class="navContainer" id="account-nav">
	<div class="navInner">
		<ul class="nav">
			<li class="account-nav-tab text-center {{{ Request::is('my-gousto') ? 'active' : '' }}}">
				<a class="link" href="{{{ URL::to('my-gousto') }}}">My Gousto</a>
			</li>
			<li class="account-nav-tab text-center {{{ Request::is('my-deliveries', 'my-account') ? 'active' : '' }}}">
				<a class="link" href="{{{ URL::to('my-deliveries') }}}" data-selid="my-deliveries-tab">Deliveries</a>
			</li>
			<li class="account-nav-tab text-center {{{ Request::is('my-subscription') ? 'active' : '' }}}">
				<a class="link" data-selid="my-subscription-tab" href="{{{ URL::to('my-subscription') }}}">Subscription</a>
			</li>
			<li class="account-nav-tab text-center no-border-right {{{ Request::is('my-details') ? 'active' : '' }}}">
				<a class="link" data-selid="my-details-tab" href="{{{ URL::to('my-details') }}}">Details</a>
			</li>
			<li class="account-nav-tab text-center mobile-hide {{{ Request::is('my-referrals') ? 'active' : '' }}}">
				<a class="link" data-selid="my-referrals-tab" href="{{{ URL::to('my-referrals') }}}">Give &amp; Get &pound;15</a>
			</li>
			<li class="account-nav-tab text-center mobile-hide {{{ Request::is('rate-my-recipes') ? 'active' : '' }}}">
				<a class="link" data-selid="rate-my-recipes-tab" href="{{{ URL::route('user.rate-my-recipes.show') }}}">Rate <span class="mobile-hide tablet-hide">My </span>Recipes
					<span class="badge" id="ratings-badge">{{{ $num_recipes_to_rate !== 0 ? $num_recipes_to_rate : '' }}}</span>
				</a>
			</li>
		</ul>
	</div>
</div>

<div class="banner desktop-hide">
	<div class="bannerInner">
		<h1>
			@if(Request::is('my-gousto'))
				My Gousto
			@elseif(Request::is('my-deliveries'))
				Your Deliveries
			@elseif(Request::is('my-subscription'))
				My Subscription
			@elseif(Request::is('my-details'))
				My Details
			@elseif(Request::is('my-referrals'))
				Give &amp; Get &pound;15
			@elseif(Request::is('rate-my-recipes'))
				Rate My Recipes
			@endif
		</h1>
	</div>
</div>
<div class="banner mobile-hide">
	<div class="bannerInner">
		<h1>
			@if(Request::is('my-gousto'))
				My Gousto
			@elseif(Request::is('my-deliveries'))
				Your Next Deliveries
			@elseif(Request::is('my-subscription'))
				My Subscription
			@elseif(Request::is('my-details'))
				My Details
			@elseif(Request::is('my-referrals'))
				Give &amp; Get &pound;15
			@elseif(Request::is('rate-my-recipes'))
				Rate My Recipes
			@endif
		</h1>
	</div>
</div>
