<script>
	var spriteFileName = {{ json_encode(asset_path('images/'.Config::get('assets.sprite_filename'))) }};
	var imageBaseURL = {{ json_encode(asset_path(Config::get('assets.base'))) }};
</script>
<!-- Bootstrap core JavaScript + required libraries
================================================== -->
{{ javascript_path("javascripts/legacy.js") }}
{{ javascript_path("javascripts/shared.js") }}

@yield('scripts')
