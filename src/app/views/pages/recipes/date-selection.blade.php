<div id="top-build" class="container-wrapper dateselection-wrapper">
	<div class="col-lg-1 col-md-1 col-sm-2 col-xs-12 dateselection-sidebox">
		<span class="mobile-hide">{{ svg_path('icon-gbox') }}</span>
		<h4 class="dateselection-title">Choose<br class="mobile-hide"/> delivery<br class="mobile-hide"/> date</h4>
	</div>

	<div class="col-lg-7 col-md-6 col-sm-6 col-xs-12 dateselection-datebox">
		<div class="hide"
			id="current-slot"
			data-delivery-day-id="{{{ $next_delivery_day['id'] }}}"
			data-delivery-slot-id="{{{ $next_delivery_slot['id'] }}}"
			data-delivery-slot-number="{{{ $next_delivery_slot['number'] }}}"
			data-cutoff="{{{ $next_delivery_day['when_cutoff'] }}}"
			data-human-date="{{{ Carbon\Carbon::parse($next_delivery_day['date'])->format('l jS F') }}}">
		</div>
		<input type="hidden" name="delivery_day_id" data-bind="value: basket.deliveryDateId()"/>
		<input type="hidden" name="delivery_slot_id" data-bind="value: basket.deliverySlotId()"/>
		<div id="delivery-day-btns" class="dateselection-btns-wrapper">
			<h4 class="visible-sm dateselection-label-btn {{{ ($is_current_menu) ? '' : 'text-dulled' }}}">Current Menu</h4>
			<div class="dateselection-btn {{{ ($is_current_menu) ? 'active current' : '' }}} dateselection-btn-current">
				<div class="dateselection-btn-content"></div>
			</div>
			<h4 class="visible-sm dateselection-label-btn {{{ (!$is_current_menu) ? '' : 'text-dulled' }}}">Next Menu</h4>
			<div class="dateselection-btn {{{ (!$is_current_menu) ? 'active current' : '' }}}">
				<div class="dateselection-btn-content"></div>
			</div>
		</div>
	</div>

	<div class="col-xs-12 desktop-hide dateselection-infobox">
		<p><b>No need to wait in!</b> Our boxes use special insulation to keep your food cool and fresh all day.</p>
	</div>

	<div class="col-lg-2 col-md-2 col-sm-4 col-xs-12 dateselection-cookingbox hide">
		<div class="mobile-hide">
			<h5>Cooking for?</h5>
			<a class="dateselection-cooking-btn {{{ $num_portions == 2 ? 'active' : '' }}}" data-size="2" data-bind="click: function(){ setNumPortions(2); }, css:{active: (numPortions()==2)}">2</a>
			<a class="dateselection-cooking-btn {{{ $num_portions == 4 ? 'active' : '' }}}" data-size="4" data-bind="click: function(){ setNumPortions(4); }, css:{active: (numPortions()==4)}">4</a>
		</div>
		<div class="desktop-hide">
			{{ Form::label('num_portions', 'Cooking for:', ['class' => 'dateselection-cooking-label']) }}
			{{ Form::select('num_portions', array(2 => '2 people', 4 => '4 people'), $num_portions,
				array(	"class" => "form-control",
								"id" => "num-portions-select",
								"data-bind" => "
									options: availableNumPortions(),
									optionsText: 'name',
									optionsValue: 'id',
									value: numPortions
								" )) }}
		</div>
	</div>

	@if($slot = Session::get('premium_available', false))
		<div class="col-lg-1 col-md-1 dateselection-evening-delivery">
			{{ svg_path('icon-van-night') }}
		</div>
		<div class="col-lg-3 col-md-4 col-sm-4 mobile-hide dateselection-infobox">
			<h5>Congratulations! Evening Delivery is now available in your area.</h5>
			<p>You can opt for delivery on
				{{{ Carbon\Carbon::now()->next($slot['default_day'])->format('l') }}}
				evenings between
				{{{ $slot['human_delivery_start'] }}} and
				{{{ $slot['human_delivery_end'] }}}
			</p>
		</div>
	@else
		<div class="col-lg-1 col-md-1 dateselection-delivery-van">
			{{ svg_path('icon-delivery-van') }}
		</div>
		<div class="col-lg-3 col-md-4 col-sm-4 mobile-hide dateselection-infobox">
			<h6 class="text-heading">No need to wait in!</h6>
			<p>Our boxes use special wool insulation to keep your food cool and fresh. Simply tell us where to leave it (e.g. with a neighbour or on the porch) and we’ll make sure it’s there for you by 7pm.</p>
		</div>
	@endif
</div>

<script type="text/javascript">
	var thisWeekUrl = {{{ json_encode(URL::route('menu')) }}};
	var nextWeekUrl = {{{ json_encode(URL::route('menu')) }}};
</script>
