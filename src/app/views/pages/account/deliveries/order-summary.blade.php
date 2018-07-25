
@section('scripts')
	{{ javascript_path('javascripts/mydeliveries.js') }}
@stop
<div class="order-row clearfix order-summary highlight-links">
	<div class="order-edit-date" data-order="{{{ htmlentities(json_encode($order)) }}}"></div>
	<div class="order-discount-info desktop-hide" data-order="{{{ htmlentities(json_encode($order)) }}}"></div>
	<div class="pull-left">
		<button class="view-order-summary account-function desktop-hide">
			View Order Details
		</button>
		<button class="hide-order-summary account-function desktop-hide hide-soft">
			Hide Order Details
		</button>
	</div>
</div>
