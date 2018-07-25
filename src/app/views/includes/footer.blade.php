		</div>
	</div> <!-- /container -->
	<?php
		$nodeserver_host = Config::get('nodeserver.host');
		$node_url = "http://$nodeserver_host/footer";
		if ((isset($simplePage) && $simplePage) || Cookie::get('from_join')) {
			$node_url .= '?simple=true';
		}
		$nodeFooter = NodeServer::fetch($node_url, 200);
		if (count($nodeFooter) > 0) {
			$nodeFooter = $nodeFooter[0];
		}
	?>
	@if (isset($nodeFooter) && $nodeFooter)
		<footer class="nodeFooter">
			{{ $nodeFooter }}
		</footer>
	@else
		<footer class="container row">
			@if (isset($simplePage))
				@include('includes.footer-strip', ['simplePage' => $simplePage])
			@else
				@include('includes.footer-strip')
			@endif
		</footer>
	@endif
</div>

@include('includes.footer-scripts')

@if(Request::segment(1) === 'resetform')
	<script type="text/javascript">
		var email = GetURLParameter('email');
		if(email !== "undefined"){
			$("#email").val(email);
		}
		jQuery.validator.setDefaults({
			errorElement: 'div',
			success: "valid"
		});
		var form = $("#password-reset");
		form.validate({
			rules: {
				email: {
					email: true,
					required: true
				},
			}
		});
		$(".validatebd").click(function(e){
			e.preventDefault();
			if(form.valid()){
				form.submit();
			}
		});
	</script>
@endif
@if(Request::segment(1) ==='newpasswordform')
	<script type="text/javascript">
		jQuery.validator.setDefaults({
			errorElement: 'div',
			success: 'valid'
		});
		var form = $("#newpassword");
		form.validate({
			rules: {
				password: {
					minlength: 6,
					required: true
				},
			}
		});
		$('.validatebd').click(function(e){
			e.preventDefault();
			if(form.valid()){
				form.submit();
			}
		});
	</script>
@endif

<script type="text/javascript">
	$("document").ready(function() {
		setTimeout(function() {
			$("#voucherlink").trigger('click');
		},10);
	});
</script>
@include('includes.ajax-csrf')
@include('includes.tracking')
</body>
</html>
