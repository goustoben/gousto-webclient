<script type="text/javascript">
	$(document).ready(function() {
		var csrf_token = "{{ csrf_token(); }}";
		$.ajaxPrefilter(function(options, originalOptions, jqXHR){
			if (options.type.toLowerCase() === "post" && !options.crossDomain) {
				// initialize `data` to empty string if it does not exist
				options.data = options.data || "";
				// add leading ampersand if `data` is non-empty
				options.data += options.data ? "&" : "";
				options.data += "_token=" + csrf_token;
			}
		});

	});
</script>
