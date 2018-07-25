@extends('layouts.default')

@section('bodyClass') class="cancel" @stop
@section('content')
	@include('pages.account.details.modal')
	@include('pages.account.details.cancel_modal')
	<div class="row">
		<h1 class="text-center text-heading">Cancelling your subscription</h1>
	</div>
	<div class="container" id="cancel-account-container">
		<div class="row">
			<p class="col-sm-10">If you'd like to cancel your account, well, we're very sad to see you go, but we're glad you've been part of our community, and <span class="strong">the door is always open</span>.</p>
		</div>
		<div class="row">
			<p class="col-md-6">If the reason you're cancelling is because...</p>
		</div>
		<div class="row cancel-alternative">
			<div class="col-md-9">
				<h4>you need a break?</h4>
				<p>If so, could we suggest you pause deliveries for a month?</p>
			</div>
			<div class="col-sm-6 col-md-3">
				{{ Form::open(array( 'url' => '/user/' . $user_id . '/subscription-on-hold', 'role' => 'form' )) }}
					{{ Form::hidden('hold_length', 'one_month') }}
					{{ Form::hidden('hold_reason', 'break') }}
					<a href="#" class="gbtn-secondary ladda-button pull-right put-on-hold" data-style="slide-left"><span class="ladda-label">Pause for 1 month</span></a>
				{{ Form::close() }}
			</div>
		</div>
		<div class="row cancel-alternative">
			<div class="col-md-9">
				<h4>you don't like the recipes on the menu?</h4>
				<p>In which case why not choose some recipes you like from our cookbook, we'll email you to let you know when they are on the menu, and you won't receive any deliveries until you decide to reactivate.</p>
			</div>
			<div class="col-sm-6 col-md-3">
				{{ Form::open(array( 'url' => '/user/' . $user_id . '/subscription', 'role' => 'form' )) }}
					{{ Form::hidden('state', 'inactive') }}
					{{ Form::hidden('state_reason', 'pause') }}
					<a href="#" class="gbtn-secondary pull-right ladda-button pause-subscription" data-style="slide-left"><span class="ladda-label">Pause and go to the cookbook</span></a>
				{{ Form::close() }}
			</div>
		</div>
		<div class="row cancel-alternative">
			<div class="col-md-9">
				<h4>Gousto isn't convenient for you?</h4>
				<p>If so, do you know you can change your delivery days and frequency?</p>
			</div>
			<div class="col-sm-6 col-md-3">
				<a href="/my-account#delivery-schedule" class="gbtn-secondary pull-right"><span>Change Delivery preferences</span></a>
			</div>
		</div>
		<div class="row cancel-alternative">
			<div class="col-md-9">
				<h4>Gousto is too expensive?</h4>
				<p>Would you consider receiving biweekly or monthly deliveries so you can still enjoy Gousto?</p>
			</div>
			<div class="col-sm-6 col-md-3">
				<a href="/my-account#delivery-schedule" class="gbtn-secondary pull-right"><span>Change Delivery frequency</span></a>
			</div>
		</div>
		<div class="row final-choice">
				<div class="col-sm-6 bottom-spacer">
					<p>Actually I've decided not to cancel my account, take me back my account page:</p>
					<a href="/my-account" class="gbtn-secondary">Back to my account</a>
				</div>
				<div class="col-sm-6 text-sm-right">
					<p>None of these really work for me, I'd like to go-ahead and cancel my account:</p>
					@if(isset($pending_free_box_data))
						<button class="gbtn-primary" id="cancel-modal-button">Cancel account</button>
					@else
						<a href="/user/{{{ $user_id }}}/cancel" class="gbtn-primary">Cancel account</a>
					@endif
				</div>
		</div>
		<div class="clearfix"></div>
	</div>
	<style>
		.cancel-alternative .btn{
			width:100%;
			white-space: normal;
			height:55px;
			display: table;
			margin-top:10px;
			border-radius:5px;
		}
		.cancel-alternative .btn span{
			display:table-cell;
			vertical-align:middle;
		}
		.final-choice {
			margin:30px 0;
		}
		.bottom-spacer {
			margin-bottom:20px;
		}
		@media (min-width: 767px) {
			.text-sm-right
			{
				text-align:right;
			}
			.bottom-spacer
			{
				margin-bottom:0;
			}
		}
	</style>
@stop
