<div class="modal-dialog">
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title">Manage subscription</h4>
		</div>
		<div class="modal-body">
			@if(!empty($orders))
				<p>After the box arriving on {{{ last($orders)['human_delivery_date'] }}}, your deliveries will pause for {{{ $paused_for }}} and restart on {{{ $restart_on }}}.</p>
			@else
				<p>Your deliveries will pause for {{{ $paused_for }}} and restart on {{{ $restart_on }}}.</p>
			@endif
			<p>You can pause your subscription if you want to skip all future deliveries.</p>
		</div>
		<div class="modal-footer">
			<a class="gbtn-secondary" href="{{{ URL::to('my-subscription') }}}#account-subscription-pause-section">Pause My Subscription</a>
			<button type="button" class="gbtn-primary" data-dismiss="modal">Keep Subscription Active</button>
		</div>
	</div>
</div>
