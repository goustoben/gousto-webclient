@section('bodyClass') class="signup-body" @stop
@include('includes.meta', array('meta' => Config::get('meta.signup')))
@include('includes.head')
	<div id="signup"></div>

	<script>
		var spriteFileName = {{ json_encode(asset_path('images/'.Config::get('assets.sprite_filename'))) }};
		var imageBaseURL = {{ json_encode(asset_path(Config::get('assets.base'))) }};
		window.referrer = {{ json_encode(Request::server('HTTP_REFERER')) }};
	</script>
	{{ stylesheet_path('stylesheets/application.css') }}
	{{ javascript_path('javascripts/shared.js') }}
	{{ javascript_path('javascripts/signup.js') }}

</body>
</html>
