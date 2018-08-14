<div class="modal fade gmodal" id="subscription-activate-success-modal" tabindex="-1" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">Your account is now active</h4>
			</div>
			<div class="modal-body">
				@if(isset($subscription) && !empty($box))
					<p>Thank you for reactivating your account. You are currently receiving a {{{ $subscription['interval'] }}} delivery of <span class="strong">{{{ $box['num_recipes'] }}} meals</span> for <span class="strong">{{{ $box['num_portions'] }}} people</span>, starting {{{ $next_pending_delivery_date }}}</p><br>
					@if($close_to_cutoff)
					<p>Choose your recipes before <span class="strong">noon on {{{$cutoff_date_present}}}</span> by clicking the button below.</p>
					@else
					<p class="highlight-links">
						If you want a box sooner, or need to skip an upcoming box, visit your <a href="{{{ route('my-deliveries') }}}">deliveries</a> page.
					</p><br>
					<p>In the meantime, go choose your recipes for your next box!</p>
					@endif
				@endif
			</div>
			<div class="modal-footer">
				<a class="gbtn-secondary" href="{{{ route('my-deliveries') }}}">Manage my deliveries</a>
				<a class="gbtn-primary" href="{{{ url('next-weeks-recipes/' . $pending_order_id) }}}">Choose my recipes</a>
			</div>
		</div>
	</div>
</div>
