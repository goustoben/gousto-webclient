<div id="footer-strip" class="row">
	<nav class="footer-nav container text-center">
		@if (!isset($simplePage) || !$simplePage || !Cookie::get('from_join'))
			<div class="row mobile-hide">
				@include ('includes.footer-appstore-links')
				<span class="pipe"></span>
				<ul class="footer-links">
					<li><a data-selid="footer-facebook" href="http://www.facebook.com/goustocooking" class="footer-icon">{{ svg_path('icon-facebook')}}</a></li>
					<li><a data-selid="footer-twitter" href="https://twitter.com/goustocooking" class="footer-icon">{{ svg_path('icon-twitter')}}</a></li>
					<li><a data-selid="footer-youtube" href="https://www.youtube.com/UKGousto/" class="footer-icon">{{ svg_path('icon-youtube')}}</a></li>
					<li><a data-selid="footer-instagram" href="http://instagram.com/goustocooking" class="footer-icon">{{ svg_path('icon-instagram')}}</a></li>
					<li><a data-selid="footer-google-plus" href="https://plus.google.com/108410015391305217990" class="footer-icon">{{ svg_path('icon-gplus')}}</a></li>
				</ul>
				<span class="pipe"></span>
				<a href="tel:{{{ Config::get('company.telephone_link') }}}"><span class="glyphicon glyphicon-earphone"></span>{{{ Config::get('company.telephone') }}}</a>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 newsletter-container">
				<p class="tasty">Tasty News<span class="desktop-hide">letter</span>:</p>
				@include ('includes/forms/newsletter-signup', array('email_placeholder' => 'Enter email address to sign up to our newsletter', 'email_placeholder_mobile' => 'Enter email address'))
			</div>
			<div class="row col-xs-12 desktop-hide">
				<hr />
				<a href="tel:{{{ Config::get('company.telephone_link') }}}">
					<span class="glyphicon glyphicon-earphone"></span>{{{ Config::get('company.telephone') }}}
				</a>
				<span class="pipe"></span>
				<ul class="footer-links">
					<li><a data-selid="footer-facebook" href="http://www.facebook.com/goustocooking" class="footer-icon">{{ svg_path('icon-facebook')}}</a></li>
					<li><a data-selid="footer-twitter" href="https://twitter.com/goustocooking" class="footer-icon">{{ svg_path('icon-twitter')}}</a></li>
					<li><a data-selid="footer-youtube" href="https://www.youtube.com/UKGousto/" class="footer-icon">{{ svg_path('icon-youtube')}}</a></li>
					<li><a data-selid="footer-instagram" href="http://instagram.com/goustocooking" class="footer-icon">{{ svg_path('icon-instagram')}}</a></li>
					<li><a data-selid="footer-google-plus" href="https://plus.google.com/108410015391305217990" class="footer-icon">{{ svg_path('icon-gplus')}}</a></li>
				</ul>
				<div>
					@include ('includes.footer-appstore-links')
				</div>
				<hr />
			</div>
		@endif
		<div class="row col-xs-12">
			<ul>
				@if (!isset($simplePage) || !$simplePage || !Cookie::get('from_join'))
					<li class="mobile-hide"><a data-selid="footer-home" href="{{{ URL::to('/') }}}" title="Home">Home</a></li>
					<li class="mobile-hide"><a data-selid="footer-this-weeks-recipes" href="{{{ URL::route('menu') }}}" title="Menu">Menu</a></li>
					<li><a data-selid="footer-learn-more" href="{{{ URL::to('learn-more') }}}" title="FAQ">FAQ</a></li>
					<li class="contact"><a data-selid="footer-contact" href="{{{ URL::to('contact') }}}" title="Contact">Contact</a></li>
					<li>Terms (<a data-selid="footer-terms-of-use" href="{{{ URL::to('terms-of-use') }}}" title="Terms &amp; Conditions">Website</a>) (<a data-selid="footer-terms-and-conditions" href="{{{ URL::to('terms-and-conditions') }}}" title="Terms &amp; Conditions for Sale of Goods">Sale</a>)</li>
					<li><a data-selid="footer-cookbook" href="{{{ URL::to('cookbook') }}}" title="Cookbook">Cookbook</a></li>
					<li><a data-selid="footer-jobs" href="{{{ URL::to('jobs') }}}" title="Jobs">Jobs</a></li>
					<li><a data-selid="footer-we-care" href="{{{ URL::to('values') }}}" title="We Care">We Care</a>
					<li><a data-selid="footer-blog" href="{{{ URL::to('blog') }}}" title="Blog">Blog</a></li>
					<li class="mobile-hide"><a data-selid="footer-our-suppliers" href="{{{ URL::to('our-suppliers') }}}" title="Our Suppliers">Our Suppliers</a></li>
					<li><a data-selid="footer-privacy-statement" href="{{{ URL::to('privacy-statement') }}}" title="Privacy Policy">Privacy Policy</a></li>
				@else
					<li>Terms (<a data-selid="footer-terms-of-use" href="{{{ URL::to('terms-of-use') }}}" title="Terms &amp; Conditions">Website</a>) (<a data-selid="footer-terms-and-conditions" href="{{{ URL::to('terms-and-conditions') }}}" title="Terms &amp; Conditions for Sale of Goods">Sale</a>)</li>
					<li><a data-selid="footer-privacy-statement" href="{{{ URL::to('privacy-statement') }}}" title="Privacy Policy">Privacy Policy</a></li>
				@endif
			</ul>
		</div>
		<div class="row col-xs-12 copyright">
			<p>&copy; Gousto {{{ Carbon\Carbon::now()->year }}}. All rights reserved.</p>
		</div>
	</nav>
</div>
