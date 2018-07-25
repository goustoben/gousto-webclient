@if(!$payment_method)
	<div class="modal fade gmodal" id="account-billing-modal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" id="original-content">
			</div>
		</div>
	</div>
	@if($expires_days && $expires_days < 30)
		<script type="text/javascript">
			$(function(){
				$('#account-billing-modal').modal({
					remote: '{{{'/billing-modal/' . $user['id'] . '/' . $user['name_first'] . '/exp'}}}',
					show: true
				});
			});
		</script>
	@else
		<script type="text/javascript">
			$(function(){
				$('#account-billing-modal').modal({
					remote: '{{{'/billing-modal/' . $user['id'] . '/' . $user['name_first'] . '/new'}}}',
					show: true
				});
			});
		</script>
	@endif
@elseif ($user['status'] === 'onhold')
	{{{ Session::flash('modal', ['id' => 'onhold-billing-wrapper', 'remote' => URL::route('modal.onhold', ['current'])]) }}}
@endif
