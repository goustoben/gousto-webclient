<script type="text/javascript">
	function onLoadEvent(){
		document.downloadForm.submit();
	}
</script>
<body OnLoad="onLoadEvent();">
	<form name="downloadForm" action="{{{ $ACSURL }}}" method="POST">
        <input type="hidden" name="_token" value="{{ csrf_token(); }}">
		<input type="hidden" name="PaReq" value="{{{ $PAReq }}}"/>
		<input type="hidden" name="MD" value="{{{ $MD }}}"/>
		@if(strpos(URL::previous(), 'checkout') !== FALSE)
			<input type="hidden" name="TermUrl" value="{{{ Config::get('3dsecure.callback') . '?VendorTxCode=' . $VendorTxCode . '&FinishedCallbackRoute=order-summary' }}}"/>
		@else
			<input type="hidden" name="TermUrl" value="{{{ Config::get('3dsecure.callback') . '?VendorTxCode=' . $VendorTxCode . '&FinishedCallbackRoute=my-account' }}}"/>
		@endif
	</form>
</body>
