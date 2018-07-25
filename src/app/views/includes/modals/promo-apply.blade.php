<div id="promo-apply-modal" class="modal fade gmodal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Gift Voucher &amp; Referral Code</h4>
			</div>
			<div id="step-existing-voucher" class="promoapply-step">
				<div class="modal-body">
					<p>
						You have already applied voucher code "<b><span data-bind="text: basket.discountCode()"></span></b>".
					</p>
					<p>
						You have saved <b><span data-bind="text: formatCurrency(discountValue())">&pound; 0.00</span></b>. Win!
					</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="gbtn-tertiary" data-dismiss="modal">Keep Voucher</button>
					<button type="button" class="gbtn-secondary" id="edit-voucher">Edit Voucher</button>
				</div>
			</div>
			<div id="step-enter-voucher" class="modal-body promoapply-step">
				<p>Do you have a gift voucher or referral code?</p>
				<button id="submit-discount-code" class="gbtn-secondary input-group-rightbtn" type="button">Claim</button>
				{{ Form::text('promocode', (Session::has('promo.code') ? Session::get('promo.code') : ''), array('id' => 'input-discount-code', 'placeholder' => 'Insert code here', 'class' => 'form-control input-group-field', 'autocomplete' => 'off')) }}
				<p class="text-danger hide-soft" id="promoapply-error">Voucher invalid</p>
				<p class="highlight-links">
					If not <a href="javascript:void(0);" class="get-default-voucher" data-save="localSession">click here</a>
					to get your warm welcome {{{ Config::get('promotion.default_code_value') }}} gift.
				</p>
			</div>
			<div id="step-confirmation" class="promoapply-step">
				<div class="modal-body">
					<h4>Spiffing!</h4>
					<p id="promoapply-saving-value"></p>
					<p>Happy cooking!</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="gbtn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</div>

@include('includes/ajax-csrf')
<script type="text/javascript">
	var defaultDiscountCode = {{ json_encode(Config::get('promotion.default_code')) }};
</script>
