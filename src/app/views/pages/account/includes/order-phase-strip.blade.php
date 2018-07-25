@if(isset($order['phase']))
	{{-- status left icon --}}
	@if($order['phase'] === 'pre_menu')
		<div class="col-xs-4 order-phase">
			<span class="glyphicon glyphicon-chevron-right"></span>
			<p>Recipes<br/>Available</p>
		</div>
	@else
		<div class="col-xs-4 order-phase active">
			<span class="glyphicon glyphicon-ok"></span>
			<p>Recipes<br/>Available</p>
		</div>
	@endif

	{{-- status middle icon --}}
	@if(in_array($order['phase'], ['awaiting_choices', 'pre_menu']))
		<div class="col-xs-4 order-phase">
			<span class="glyphicon glyphicon-chevron-right"></span>
			<p>
				@if($order['phase'] === 'awaiting_choices')
					<span class="strong">Choose<br/>Recipes</span>
				@else
					<span>Choose<br/>Recipes</span>
				@endif
			</p>
		</div>
	@else
		<div class="col-xs-4 order-phase active">
			<span class="glyphicon glyphicon-ok"></span>
			<p>Recipes<br/>Chosen</p>
		</div>
	@endif

	{{-- status right icon --}}
	@if($order['phase'] === 'cutoff' || $order['phase'] === 'picking' || $order['phase'] === 'packing' || $order['phase'] === 'packing' || $order['phase'] === 'delivery')
		<div class="col-xs-4 order-phase active">
			<span class="glyphicon glyphicon-ok"></span>
			<p>Box<br/>Confirmed</p>
		</div>
	@else
		<div class="col-xs-4 order-phase">
			<span class="glyphicon glyphicon-chevron-right"></span>
			<p>Box<br/>Confirmed</p>
		</div>
	@endif
@else
	{{-- button skip/restore --}}
	@include('pages.account.deliveries.skip-order-buttons', array('button_type' => 'links', 'number' => $number))
@endif
