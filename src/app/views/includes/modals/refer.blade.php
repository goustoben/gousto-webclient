@if(Request::segment(1) === 'refer')
	<div class="modal fade gmodal" id="voucherModal" tabindex="-1" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">{{{ ucfirst(Request::segment(2)) }}} has given you a discount code</h4>
				</div>
				<div class="modal-body">
					<p class="lead"><span class="strong">{{{ ucfirst(Request::segment(2)) }}}</span> suggests you try Gousto and has given you a discount code to <span class="strong">save &pound;25</span> on your first Gousto box. </p>
					<p class="lead">Simply enter the voucher code <span class="strong">{{{ Request::segment(3) }}}</span> at the checkout to activate the discount.</p>
				</div>
				<div class="modal-footer">
					<a href="{{{ URL::route('menu') }}}" class="gbtn-secondary">See Menu</a>
				</div>
			</div>
		</div>
	</div>
@endif
