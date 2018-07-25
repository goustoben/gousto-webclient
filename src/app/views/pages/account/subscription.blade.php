@extends('layouts.account')
@section('bodyClass')class="account subscription"@stop
@section('content')
@include('pages.account.modals.billing-modal')
@include('pages.account.includes.account-message-banner')
@include('pages.account.modals.subscription-deactivate-modal')
@include('pages.account.modals.hold-modal-error')
@include('pages.account.modals.reactivation-error-modal')

<div class="container account-content-container">
	<div class="account-heading col-xs-12">
		@if ($user['status'] !== 'active')
			<div class="galert-info">
				Hi there! Your account is on hold and your future orders have been cancelled, please update your card details <a href="javascript:void(0);" data-toggle="modal" data-target="#onhold-billing-modal">here</a> to reactivate your account.
			</div>
		@else
			<p class="heading-text {{{ $reactivate_banner ? 'hide-soft' : '' }}} highlight-links">{{{ $user['name_first'] }}}, you are currently receiving a
				<span class="strong"><span class="interval">{{{ $frequency_list[$subscription['interval']] }}}</span> delivery</span> of
				<span class="strong"><span class="num-recipes">{{{ $box['num_recipes'] }}}</span> meals</span> of
				<span class="strong"><span class="num-portions">{{{ $box['num_portions'] }}}</span> servings each</span> every
				<span class="strong"><span class="delivery_slot">{{{ HTML::dayName($delivery_slots[$subscription['delivery_slot_id']]['default_day']) }}}</span></span>.
				You have until <span class="strong">noon on <span class="slot_cutoff">{{{ HTML::dayName($delivery_slot_cutoffs[$subscription['delivery_slot_id']]) }}}</span></span> to
				make your recipe choices or skip a delivery, we only bill you after this cutoff.
				You can change your preferences below or skip a delivery via <a href="{{{ URL::route('my-deliveries') }}}">My Deliveries</a>. Changes are only applicable to boxes not yet selected.
			</p>
		@endif
	</div>
	{{ Form::open(['route' => 'user-subscription.update', 'id' => 'subscription-form']) }}
	<div id="account-subscription-inactive" class="col-xs-12 {{{ $reactivate_banner ? '' : 'hide-soft' }}}">
		<div class="account-subscription-reactivate-wrapper">
			<p class="account-subscription-reactivate-body highlight-links text-center">
				Your subscription is currently paused <span id="reactivate_period">{{{ $reactivate_period }}}</span>, You are still able to make individual orders from <a href="{{{ URL::route('menu') }}}">This Week's Recipes.</a><br />
				If you wish to reactivate your subscription, simply click the button below. We have saved all your settings, so everything will be back just how you like it.
			</p>
			<div class="text-center">
				<button class="gbtn-primary ladda-button" id="reactivate-subscription" data-style="slide-left">
					<span data-selid="reactivate" class="ladda-label">Reactivate my subscription</span>
				</button>
			</div>
		</div>
	</div>
	<div class="row">
		<div id="account-subscription-details" class="{{{ $reactivate_banner || $user['status'] === 'onhold' ? 'is-disabled' : '' }}}">
			<div class="row">
				<div class="subscription-form-section col-xs-12 col-sm-6 col-md-3">
					<div class="form-section-inner row">
						<div class="form-section-heading flex-center-all">
							<span id="people-icon">{{ svg_path('icon-chopping-board') }}</span>
							<p>Servings per meal</p>
						</div>
						<p>How many servings per meal would you like?</p>
						{{ Form::select('num_portions', $num_portions_list, $box['num_portions'], ['id' => 'num_portions', 'class' => 'hidden price-check']) }}
						<ul class="list-inline row">
							@foreach($num_portions_list as $value => $label)
								<li class="col-xs-6 col-sm-12 subscription-button">
									<button class="subscription-form-choice imitate-link{{ ($value == $box['num_portions']) ? ' active' : ''; }}" data-value="{{{ $value }}}" data-target="num_portions">{{{ $label }}}</button>
								</li>
							@endforeach
						</ul>
						{{ Form::select('box_type', $box_type_list, $box['box_type'], ['id' => 'box-type', 'class' => 'hidden']) }}
						<div class="vegetarian-box text-center">
							<label for="vegetarian-id">
								{{ Form::checkbox('vegetarian', 1, ($box['box_type'] === 'vegetarian'), ['id' => 'vegetarian-id', 'class' => 'vegetarian-checkbox price-check']) }}
								I am a vegetarian
							</label>
						</div>
					</div>
				</div>
				<div class="subscription-form-section col-xs-12 col-sm-6 col-md-3">
					<div class="form-section-inner row">
						<div class="form-section-heading flex-center-all">
							<span id="recipes-icon">{{ svg_path('icon-gbox') }}</span>
							<p>Recipes</p>
						</div>
						<p>How many recipes would you like in each box?</p>
						{{ Form::select('num_recipes', $num_recipes_list, $box['num_recipes'], ['id' => 'num_recipes', 'class' => 'hidden price-check']) }}
						<ul class="list-inline row">
							@foreach($num_recipes_list as $value => $label)
								<li class="col-xs-4 col-sm-12 subscription-button">
									<button class="subscription-form-choice imitate-link{{ ($value == $box['num_recipes']) ? ' active' : ''; }}" data-value="{{{ $value }}}" data-target="num_recipes">
										{{{ $label }}} <br class="desktop-hide"/> (&pound;<span class="num-recipes-price">{{{ $prices[$box['num_portions']][$value][$box_type_list[$box['box_type']]]['price_per_portion_discounted'] }}}</span> per serving)
									</button>
								</li>
							@endforeach
						</ul>
					</div>
				</div>
				<div class="subscription-form-section col-xs-12 col-sm-6 col-md-3">
					<div class="form-section-inner row">
						<div class="form-section-heading flex-center-all">
							<span id="calendar-icon">{{ svg_path('icon-calendar') }}</span>
							<p>Frequency</p>
						</div>
						<p>How often would you like to receive a box?</p>
						{{ Form::select('interval', $frequency_list, $subscription['interval'], ['id' => 'interval', 'class' => 'hidden']) }}
						<ul class="list-inline row">
							@foreach($frequency_list as $value => $label)
								<li class="subscription-button col-xs-4 col-sm-12">
									<button class="subscription-form-choice imitate-link{{ ($value == $subscription['interval']) ? ' active' : ''; }}" data-value="{{{ $value }}}" data-target="interval">{{{ $label }}}</button>
								</li>
							@endforeach
						</ul>
					</div>
				</div>
				<div class="subscription-form-section col-xs-12 col-sm-6 col-md-3">
					<div class="form-section-inner row">
						<div class="form-section-heading flex-center-all row">
							<span id="delivery-icon">{{ svg_path('icon-van') }}</span>
							<p>Delivery</p>
						</div>
						<div class="row">
							<p>What day and time shall we deliver?</p>

							{{-- TODO: remove this once Friday slot is deleted --}}
							<input type="hidden" name="delivery_slot_id" value="4">
							{{-- end TODO --}}

							<select id="delivery-slot-id" class="account-select subscription-form-choice" name="delivery_slot_id">
								@foreach($delivery_slots as $delivery_slot)
									<option
										value="{{{ $delivery_slot['id'] }}}" {{ (intval($subscription['delivery_slot_id']) === intval($delivery_slot['id'])) ? 'selected="selected"' : '' }}
										data-dotw="{{{ $delivery_slot['default_day'] }}}"
										data-delivery-day="{{{ HTML::dayName($delivery_slot['default_day']) }}}"
										{{{ ($delivery_slot['deprecated']) ? 'disabled="disabled"' : '' }}}
										data-cutoff-day="{{{ HTML::dayName($delivery_slot['cutoff_day']) }}}"
										{{{ ($delivery_slot['deprecated']) ? 'disabled="disabled"' : '' }}}
									>
										{{{ HTML::dayName($delivery_slot['default_day']) }}} {{{ HTML::twelveHourTime($delivery_slot['delivery_start']) }}} - {{{ HTML::twelveHourTime($delivery_slot['delivery_end']) }}} {{{ ($delivery_slot['delivery_price'] !== '0.00') ? '(+£' . $delivery_slot['delivery_price'] . ')' : '' }}}
									</option>
								@endforeach
							</select>
						</div>
						<div id="start-date-container" class="row">
							<label for="start-date">Start date:</label>
							{{ Form::select('next_delivery_week_id', $delivery_week_days[$subscription['delivery_slot_id']], $subscription['next_delivery_week_id'], ['id' => 'start-date-input', 'class' => 'account-select subscription-form-choice']) }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="account-subscription-summary" class="col-xs-12 col-sm-6 col-sm-offset-6 {{{ $reactivate_banner || $user['status'] === 'onhold' ? 'hide-soft' : '' }}}">
			<div class="row subscription-summary-wrapper">
				<div class="row">
					<div id="subscription-prices">
						<div class="row portion-price">
							<p class="pull-left">Price per Serving</p>
							<p class="pull-right">&pound;<span class="price">{{{ $prices[$box['num_portions']][$box['num_recipes']][$box_type_list[$box['box_type']]]['price_per_portion_discounted'] }}}</span></p>
						</div>
						<div class="row total-box-price">
							<p class="pull-left">Total Box Price</p>
							<p class="pull-right">&pound;<span class="price">{{{ $prices[$box['num_portions']][$box['num_recipes']][$box_type_list[$box['box_type']]]['recipe_total_discounted'] }}}</span></p>
						</div>
					</div>
					<p class="hide-soft text-success" id="subscription-update-success"><span class="glyphicon glyphicon-ok"></span> Your subscription settings have been saved.</p>
					<p class="hide-soft text-danger" id="subscription-update-error">There was an error updating your subscription, please contact customer services on {{{ Config::get('company.telephone') }}}.</p>
				</div>
			</div>
		</div>

	</div>
	{{ Form::close() }}
	<div id="account-subscription-pause" class="{{{ $reactivate_banner || $user['status'] === 'onhold' ? 'hide-soft' : '' }}}">
		<div class="row">
			<div class="col-xs-3 desktop-hide"></div>
			<div class="col-xs-6 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
					<hr/>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				@include('pages.account.subscription.pause')
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	var boxTypes = {{ json_encode($box_type_list) }};
	var deliveryDays = {{ json_encode($delivery_week_days) }};
	var prices = {{ json_encode($prices) }};
	var deliverySlotCutoffs = {{ json_encode($delivery_slot_cutoffs) }};
	var pageData = {
		user: {
			token: {{ json_encode($user_token) }}
		}
	};
</script>

@section('scripts')
	{{ javascript_path('javascripts/mysubscription.js') }}
@stop

@include('includes.existing-subscriber-tracking')
@include('includes.changeurl')

@stop
