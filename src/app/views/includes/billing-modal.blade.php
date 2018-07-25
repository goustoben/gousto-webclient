@if(!$payment_method)
	<div id="billingModal" class="modal fade gmodal" tabindex="-1" role="dialog" aria-labelledby="modalBillingLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content"></div>
		</div>
	</div>
	@if($expires_days && $expires_days < 30)
		<script type="text/javascript">
			$(function(){
				$('#billingModal').modal({
					remote: '{{{'/billing-modal/' . $user['id'] . '/' . $user['name_first'] . '/exp'}}}',
					show: true
				});
			});
		</script>
	@else
		<script type="text/javascript">
			$(function(){
				$('#billingModal').modal({
					remote: '{{{'/billing-modal/' . $user['id'] . '/' . $user['name_first'] . '/new'}}}',
					show: true
				});
			});
		</script>
	@endif
@endif
