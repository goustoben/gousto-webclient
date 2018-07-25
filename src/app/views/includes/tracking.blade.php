@if (Session::get('authId') !== null)
	<script type="text/javascript">
		window.dataLayer.push({
			'GOUID': '{{{ Session::get('authId') }}}',
			'event': 'GTM_ready'
		});
	</script>
@endif

<script type="text/javascript">
	window.dataLayer.push({
		'Gousto_GTM_ready': true,
		'event': 'GTM_ready'
	});
</script>
