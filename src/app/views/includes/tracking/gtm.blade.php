<script>
	dataLayer = window.dataLayer || [];
</script>

@if(Config::has('gtm-blacklist.user_agents'))
	@if(!preg_match(Config::get('gtm-blacklist.user_agents'), Request::server('HTTP_USER_AGENT')))
		<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-MKZ8XN"
		height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-MKZ8XN');</script>
	@endif
@endif

{{-- DATA SCIENCE DATALAYER MUST BE BEFORE GTM SCRIPT --}}
<script>
	dataScienceDataLayer = [{{ json_encode($data_layer) }}];
</script>
{{-- END DATA SCIENCE DATALAYER --}}

{{-- DATA SCIENCE GTM MUST BE AT START OF BODY --}}
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-M59C2X"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataScienceDataLayer','GTM-M59C2X');</script>
{{-- END DATA SCIENCE GTM --}}
