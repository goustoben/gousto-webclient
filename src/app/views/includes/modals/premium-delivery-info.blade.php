<div id="premium-delivery-modal" class="modal fade gmodal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<div class="text-center">
					{{ svg_path('icon-van-night') }}
				</div>
				<h4>Congratulations!<br />Premium delivery is available in your area.</h4>
				<p>You can opt for delivery Wednesday morning between 8am and 12pm or evenings between 7pm and 10pm.</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="gbtn-secondary" data-dismiss="modal">Got it</button>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function() {
		$('#premium-delivery-modal').modal('show');
	});
</script>
