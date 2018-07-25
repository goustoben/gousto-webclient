<div class="row">
	@if($payment_failed_at)
		<div class="col-md-12 col-centered col-max spiffing-news warning text-center">
			<p>Unfortunately we were unable to authorise your card for payment,
				please <a href="javascript:void(0)" id="payment-failed-update">update your card details</a>.
			</p>
		</div>
	@elseif(Config::get('account.account_notice.content', false) && Config::get('account.account_notice.display', true))
		<div class="col-md-12 col-centered col-max spiffing-news">
			{{{ Config::get('account.account_notice.content') }}}
		</div>
	@elseif(isset($pending_free_box_data) && isset($show_nth_box_banner))
		@if($show_nth_box_banner)
			@include('includes.nth-box-promo-banner')
		@endif
	@endif
</div>
