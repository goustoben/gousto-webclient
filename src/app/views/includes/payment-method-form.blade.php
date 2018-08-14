<div id="payment-form-sage">
	{{ Form::open(array(
		'url' => "/user/current/payment-method",
		'id' => 'account-payment-method-form',
		'name' => 'account-payment-method-form',
		'class' => 'form',
		'method' => 'POST'
	)) }}
	<input type="hidden" name="_companyTelephone" value="{{ Config::get('company.telephone') }}">
	<div class="modal-body">
		<p>
			Hi {{{ ucfirst($fn) }}},
			@if($msg === 'exp')
				we&apos;ve noticed that your payment method is going to expire soon. Please update your payment details to avoid interruption to your Gousto service.</p>
			@elseif($msg === 'update')
				your card details have expired or your payment has failed. To restore your account please enter new card details.</p>
				@if(floatval($balance) < 0)
					<p>You will be charged your outstanding balance.</p>
					<hr />
					<p>Outstanding balance: <span class="text-danger">&pound;{{{ number_format(abs($balance), 2) }}}</span></p>
					<hr />
				@endif
			@else
				unfortunately we were unable to authorise your card for payment.</p>
				<p>To ensure you recieve your Gousto box please enter your payment details below.</p>
			@endif


		<div class="form-group">
			<div class="row">
				<div class="col-xs-12 col-sm-4">
					{{ Form::label('cardtype', 'Card Type', null, array('for' => 'cardtype')) }}
					{{ Form::select('cardtype', Config::get('payment.card_types'), null, array(
							'id' => 'cardtype',
							'name' => 'card_type',
							'class' => 'form-control account-select'
					)) }}
				</div>
				<div class="col-sm-8 mobile-hide" id="cards">
					<a href="#" class="card-btn" data-card-type="VISA"><span id="visa">&nbsp;</span></a>
					<a href="#" class="card-btn" data-card-type="UKE"><span id="electron">&nbsp;</span></a>
					<a href="#" class="card-btn" data-card-type="MC"><span id="mastercard">&nbsp;</span></a>
					<a href="#" class="card-btn" data-card-type="MAESTRO"><span id="maestro">&nbsp;</span></a>
				</div>
			</div>
		</div>

		<div class="form-group">
			<div class="row">
				<div class="col-xs-12 col-sm-6">
					{{ Form::label('card_number', 'Card Number', null, array('for' => 'card_number')) }}
					{{ Form::text('card_number', null, array(
						'id' => 'card_number',
						'name' => 'card_number',
						'required',
						'class' => 'form-control',
						'placeholder' => 'Card number',
						'autocomplete' => 'cc-number'
					)) }}
				</div>
				<div class="col-xs-12 col-sm-6">
					{{ Form::label('card_holder', 'Card Holder', null, array('for' => 'card_holder')) }}
					{{ Form::text('card_holder', null, array(
						'id' => 'card_holder',
						'name' => 'card_holder',
						'required',
						'class' => 'form-control',
						'placeholder' => 'Name on card',
						'autocomplete' => 'cc-name'
					)) }}
				</div>
			</div>
		</div>

		<div class="form-group">
			<div id="expiry-date-row" class="row">
				<div class="col-xs-6 col-sm-4">
					{{ Form::label('expiry-month', 'Expiration Month', null, array('for' => 'expiry-month')) }}
					{{ Form::select('exp_mm', array(
						'01' => '01 Jan',
						'02' => '02 Feb',
						'03' => '03 Mar',
						'04' => '04 Apr',
						'05' => '05 May',
						'06' => '06 June',
						'07' => '07 July',
						'08' => '08 Aug',
						'09' => '09 Sep',
						'10' => '10 Oct',
						'11' => '11 Nov',
						'12' => '12 Dec',
					), null, array(
						'id' => 'exp_mm',
						'name' => 'exp_mm',
						'class' => 'form-control account-select'
					)) }}
				</div>
				<div class="col-xs-6 col-sm-4">
					{{ Form::label('expiry-year', 'Expiration Year', null, array('for' => 'exp_yy')) }}
					{{ Form::select('exp_yy', array(), null, array(
						'id' => 'exp_yy',
						'name' => 'exp_yy',
						'class' => 'form-control card-expiry-year account-select',
						'required'
					)) }}
				</div>
				<div class="col-xs-6 col-sm-4">
					{{ Form::label('cvv', 'Card CV2', null, array('for' => 'card_cvv2')) }}
					{{ Form::text('card_cvv2', null, array(
						'id' => 'card_cvv2',
						'name' => 'card_cvv2',
						'maxlength' => '3',
						'required',
						'class' => 'form-control',
						'placeholder' => 'CV2'
					)) }}
				</div>
			</div>
		</div>
	</div>

	<div class="modal-footer">
		{{ Form::hidden('card_expires', null, array('id' => 'card_expires', 'maxlength' => '5')) }}
		{{ Form::button('Update Card Details', array(
			'id' => 'billing-submit-button',
			'class' => 'gbtn-primary validatebd ladda-button',
			'data-style' => 'slide-left'
		)) }}
	</div>

	{{ Form::close() }}
</div>
<div id="payment-form-checkout" class="hide">
	<div class="modal-body">
		<p>
			Hi {{{ ucfirst($fn) }}},
			@if($msg === 'exp')
				we&apos;ve noticed that your payment method is going to expire soon. Please update your payment details to avoid interruption to your Gousto service.</p>
			@elseif($msg === 'update')
				your card details have expired or your payment has failed. To restore your account please enter new card details.</p>
				@if(floatval($balance) < 0)
					<p>You will be charged your outstanding balance.</p>
					<hr />
					<p>Outstanding balance: <span class="text-danger">&pound;{{{ number_format(abs($balance), 2) }}}</span></p>
					<hr />
				@endif
			@else
				unfortunately we were unable to authorise your card for payment.</p>
				<p>To ensure you recieve your Gousto box please enter your payment details below.</p>
			@endif
		<div class="form-group">
			<div class="row">
				<div class="col-xs-12">
					<script src="https://cdn.checkout.com/js/frames.js"></script>
					<form id="payment-form-modal">
						<input type="hidden" name="_id" value="">
						<input type="hidden" name="_token" value="">
						<div class="frames-container-modal">
						<!-- form will be added here -->
						</div>
						<!-- add submit button -->
						<button id="pay-now-modal-button" class="gbtn-secondary btn-block" type="submit">Save</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>