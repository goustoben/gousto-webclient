@extends('layouts.account')

@section('content')
@include('pages.account.modals.billing-modal')
@include('pages.account.includes.account-message-banner')
@include('pages.account.modals.cancel-account-modal')
@include('pages.account.modals.change-default-address-modal')
<div class="container account-content-container">
	<div id="details-content-row" class="row">
		<div class="account-block-outer col-xs-12 col-sm-4">
			<div class="account-block-inner">
				@include('pages.account.includes.details-section-heading', array('section_title' => 'My Personal Details'))
				<div class="details-section-content mobile-hide-soft">
					<div class="details-section-row">
						<div class="change-detail-heading">
							<span class="glyphicon glyphicon-user pull-left"></span>
							<p class="pull-left detail-title hide-soft">Name</p>
							<p class="pull-left detail-original">{{{ $user['name_first'] }}} {{{ $user['name_last'] }}}</p>
							@include('pages.account.includes.change-detail-buttons')
						</div>
						<div class="change-detail-form hide-soft">
							{{ Form::open(['route' => 'user-details.update-name', 'id' => 'account-name', 'class' => 'account-form']) }}
								{{ Form::label('name_first', 'First Name', ['class' => 'hidden']) }}
								{{ Form::text('name_first', $user['name_first'], ['placeholder' => 'First Name', 'class' => 'form-control']) }}
								<p class="detail-error text-danger" data-for="name_first" style="display:none"></p>
								{{ Form::label('name_last', 'Surame', ['class' => 'hidden']) }}
								{{ Form::text('name_last', $user['name_last'], ['placeholder' => 'Surname', 'class' => 'form-control']) }}
								<p class="detail-error text-danger" data-for="name_last" style="display:none"></p>
								{{ Form::submit('save', ['class' => 'gbtn-secondary btn-block', 'data-selid' => 'save-changes']) }}
							{{ Form::close() }}
						</div>
					</div>
					<div class="details-section-row">
						<div class="change-detail-heading">
							<span class="glyphicon glyphicon-earphone pull-left"></span>
							<p class="pull-left detail-title hide-soft">Phone Number</p>
							<p class="pull-left detail-original">{{{ HTML::formatPhoneNumber($user['phone'], $user['phone_country_code']) }}}</p>
							@include('pages.account.includes.change-detail-buttons')
						</div>
						<div class="change-detail-form hide-soft">
							{{ Form::open(['route' => 'user-details.update-phone', 'id' => 'account-phone', 'class' => 'account-form']) }}
								{{ Form::label('phone', 'Phone', ['class' => 'hidden']) }}
								{{ Form::tel('phone', $user['phone'], ['placeholder' => 'Phone Number', 'class' => 'form-control']) }}
								<p class="detail-error text-danger" data-for="phone" style="display:none"></p>
								{{ Form::submit('save', ['class' => 'gbtn-secondary btn-block', 'data-selid' => 'save-changes']) }}
							{{ Form::close() }}
						</div>
					</div>
					<div class="details-section-row">
						<div class="change-detail-heading">
							<span class="glyphicon glyphicon-envelope pull-left"></span>
							<p class="pull-left detail-title hide-soft">Email Address</p>
							<p class="pull-left detail-original">{{{ $user['email'] }}}</p>
							@include('pages.account.includes.change-detail-buttons')
						</div>
						<div class="change-detail-form hide-soft">
							{{ Form::open(['route' => 'user-details.update-email', 'id' => 'account-email', 'class' => 'account-form']) }}
								{{ Form::label('email', 'Email', ['class' => 'hidden']) }}
								{{ Form::text('email', $user['email'], ['placeholder' => 'Email Address', 'class' => 'form-control']) }}
								<p class="detail-error text-danger" data-for="email" style="display:none"></p>
								{{ Form::submit('save', ['class' => 'gbtn-secondary btn-block', 'data-selid' => 'save-changes']) }}
							{{ Form::close() }}
						</div>
					</div>
					<div id="change-password-section" class="details-section-row">
						<p class="detail-title">Change Password</p>
						<p>Click below to change your password. We will send you an email with instructions to change your password.</p>
						{{ Form::open(['route' => 'user-details.reset-email', 'id' => 'account-reset-password']) }}
							{{ Form::submit('Send Email', ['class' => 'gbtn-primary btn-block', 'data-selid' => 'change-password']) }}
						{{ Form::close() }}
					</div>
					<div id="cancel-account-section" class="details-section-row">
						<p class="detail-title">Cancel Your Account</p>
						<p class="highlight-links">It will be sad to see you go, but you are free to cancel at any time, simply <a id="show-cancel-modal" href="javascript:void(0)" data-selid="cancel-account">click here</a>.</p>
					</div>
				</div>
			</div>
			<div id="my-communication-container" class="account-block-inner">
				@include('pages.account.includes.details-section-heading', array('section_title' => 'My Communication Preferences'))
				<div class="details-section-content mobile-hide-soft">
					@include('pages.account.includes.communication-preferences-form', array('for_delivery' => true))
				</div>
			</div>
		</div>
		<div id="my-delivery-container" class="account-block-outer col-xs-12 col-sm-4">
			<div class="account-block-inner">
				@include('pages.account.includes.details-section-heading', array('section_title' => 'My Delivery Address'))
				<div class="details-section-content mobile-hide-soft">
					@include('pages.account.includes.choose-address-form', array('for_delivery' => true))
				</div>
			</div>
		</div>
		<div class="account-block-outer col-xs-12 col-sm-4">
			<div class="account-block-inner">
				@include('pages.account.includes.details-section-heading', array('section_title' => 'My Payment Info'))
				<div class="details-section-content mobile-hide-soft">
					<div class="details-section-row">
						<div class="change-detail-heading">
							<span class="glyphicon glyphicon-credit-card pull-left"></span>
							<p class="pull-left detail-title hide-soft">Payment Card</p>
							<p class="pull-left detail-original">{{{ $payment_details['data']['card_number_masked'] }}}</p>
							@include('pages.account.includes.change-detail-buttons')
						</div>
						<div class="change-detail-form hide-soft">
							{{ Form::open(['route' => ['user.payment-method.update', 'user_id' => 'current'], 'id' => 'account-payment-card', 'class' => 'account-form']); }}
							{{ Form::select('card_type', Config::get('payment.card_types'), 'VISA', ['class' => 'form-control account-select']) }}
							{{ Form::text('card_number', null, ['required', 'class' => 'form-control', 'placeholder' => 'Card number']) }}
							{{ Form::text('card_holder', null, ['required', 'class' => 'form-control', 'placeholder' => 'Name on your card']) }}
							{{ Form::text('card_expires', null, ['required', 'class' => 'form-control', 'placeholder' => 'MM/YY']) }}
							{{ Form::text('card_cvv2', null, ['required', 'class' => 'form-control', 'placeholder' => 'CV2']) }}
							@if(floatval($balance) < floatval('0.00'))
								<p>
									When you update your card details we will take payment for the outstanding account balance shown below.
								</p>
							@endif
							<p class="detail-error text-danger hide-soft" data-for="general"></p>
							{{ Form::submit('Save', ['class' => 'gbtn-secondary btn-block']) }}
							{{ Form::close() }}
						</div>
					</div>
					<div class="details-section-row">
						<div class="change-detail-heading">
							<span class="glyphicon glyphicon-home pull-left"></span>
							<p class="pull-left detail-title hide-soft">Billing Address</p>
							<p class="pull-left detail-original">
								{{{ HTML::renderAddress($billing_address) }}}
							</p>
							@include('pages.account.includes.change-detail-buttons')
						</div>
						<div class="change-detail-form billing-form hide-soft">
							@include('pages.account.includes.billing-address-form', array('address' => null, 'for_delivery' => false))
						</div>
					</div>
					@if(!$first_box)
						<div id="account-balance-section" class="details-section-row">
							<p class="pull-left detail-title">Account Balance</p>
							<div id="account-balance">
								<p class="pull-right detail-title {{{ floatval($balance) < floatval('0.00') ? 'text-danger' : 'text-success' }}}">&pound;{{{ $balance }}}</p>
							</div>
							<p id="account-balance-positif" class="balance-text {{{ floatval($balance) > floatval('0.00') ? '' : 'hide-soft' }}}">
								Credit will be automatically deducted from your next payment.
							</p>
							<p id="account-balance-null" class="balance-text highlight-links {{{ floatval($balance) === floatval('0.00') ? '' : 'hide-soft' }}}">
								Earn money off your next box by <a href="{{{ URL::to('my-referrals') }}}">referring your friends</a>!
							</p>
						</div>
					@endif
				</div>
			</div>
		</div>
	</div>
</div>
@include('includes.existing-subscriber-tracking')
@include('includes.changeurl')
@stop
