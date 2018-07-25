<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<!-- ********************************************************************
		Well hello there. Like html, do ya? How about PHP? AWS? git? Laravel?
		We're always looking for talented developers. Email us!
		workintech [at] gousto.co.uk
	******************************************************************** -->
	<title>@yield('title', 'Choose recipes and get fresh ingredients delivered to your door. Our award-winning food boxes include FREE delivery. Enjoy a new menu each week!')</title>
	<meta charset="utf-8">
	<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<meta name="description" content="@yield('description', 'Choose recipes and get fresh ingredients delivered to your door. Our award-winning food boxes include FREE delivery. Enjoy a new menu each week!')">
	<meta name="keywords" content="@yield('keywords', 'Gousto, recipe delivery, ingredients, fresh, healthy food, cooking')">

	<meta property="og:description" content="@yield('og-description', 'Gousto')">
	<meta property="og:image" content="@yield('og-image', image_path('images/photos/gousto-share-box.jpg'))">
	<meta property="og:image:height" content="766">
	<meta property="og:image:width" content="1267">
	<meta property="og:site_name" content="Gousto">
	<meta property="og:title" content="@yield('og-title', 'Gousto')">
	<meta property="og:type" content="website">
	<meta property="og:url" content="{{{ URL::current() }}}">

	<meta property="fb:app_id" content="294160790674968"/>
	<meta property="fb:admins" content="100008548455745, 537082922, 793975323"/>

	<meta name="twitter:card" content="summary">
	<meta name="twitter:creator" content="@goustocooking">
	<meta name="twitter:description" content="@yield('twitter-description', 'Choose recipes and get fresh ingredients delivered to your door. Our award-winning food boxes include FREE delivery. Enjoy a new menu each week!')">
	<meta name="twitter:image" content="@yield('twitter-image', image_path('images/photos/gousto-share-box.jpg'))">
	<meta name="twitter:image:height" content="766">
	<meta name="twitter:image:width" content="1267">
	<meta name="twitter:site" content="@goustocooking">
	<meta name="twitter:title" content="@yield('twitter-title', 'Choose recipes and get fresh ingredients delivered to your door. Our award-winning food boxes include FREE delivery. Enjoy a new menu each week!')">
	<meta name="twitter:url" content="{{{ URL::current() }}}">

	<meta name="google-site-verification" content="2LR6aswBr89XdHItDL1nqmhjTBXYKiBykE9drKU5SMo"/>
	<meta name="p:domain_verify" content="adfa0b85592a79dcce9f843e17825583"/>

	@if(Config::get('mobileapp.show_smart_banner', false))
		<meta name="apple-itunes-app" content="app-id={{{ Config::get('mobileapp.app_store_id') }}}">
	@endif

	<link href="{{{ image_path('images/favicons/favicon.ico') }}}" rel="icon">
	<link href="{{{ image_path('images/favicons/favicon-152.png') }}}" rel="apple-touch-icon-precomposed">
	<link href="{{{ image_path('images/favicons/favicon-152.png') }}}" rel="apple-touch-icon-precomposed" sizes="152x152">
	<link href="{{{ image_path('images/favicons/favicon-120.png') }}}" rel="apple-touch-icon-precomposed" sizes="120x120">
	<link href="{{{ image_path('images/favicons/favicon-76.png') }}}" rel="apple-touch-icon-precomposed" sizes="76x76">
	<link href="https://plus.google.com/+GoustoCoUk" rel="publisher"/>

	@if(isset($canonical_url))
		<link rel="canonical" href="{{{ $canonical_url }}}" />
	@elseif (Request::segment(1) === 'cookbook')
		@if (isset($next))
			<link rel="next" href="{{{ URL::to('/cookbook') . '?page=' . $next }}}" />
		@endif
		@if (isset($prev))
			<link rel="prev" href="{{{ URL::to('/cookbook') . '?page=' . $prev }}}" />
		@endif
	@endif

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" ></script>

	{{-- start optimizely snippet --}}
	<script src="//cdn.optimizely.com/js/{{{ Config::get('optimizely.account') }}}.js"></script>
	{{-- end optimizely snippet --}}

	<link href="https://fonts.googleapis.com/css?family=Comfortaa:700" rel="stylesheet">
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">

	<!--[if lt IE 9]>
		<script src="https://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
	<![endif]-->

@if(Config::get('segment.apikey'))
<script type="text/javascript">
	!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.0.1";
		analytics.load('{{{Config::get('segment.apikey')}}}');
		analytics.page();
	}}();
</script>
@endif
{{-- only do pingdom RUM 10% of the time--}}
@if(10 > mt_rand(0,99))
	@include('includes.pingdom-user-monitoring')
@endif

</head>

<body @yield('bodyClass')>
@include('includes.tracking.gtm')
@include('includes.tracking.fb')
@include('includes.gousto-manifest')
