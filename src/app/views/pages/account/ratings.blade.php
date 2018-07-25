@extends('layouts.account')

@section('content')
@include('pages.account.modals.bad-rating-modal')
@include('pages.account.modals.good-rating-modal')
@include('includes.email-friends-modal')

<div class="container account-content-container">
	<div class="account-heading row">
			<p class="heading-text">
				@if(count($orders) === 0)
					We'd love to hear what you think. Once you've tucked into your first box, pop back here to rate dishes and share your feedback on each recipe.
				@else
					We'd love to hear what you think. Please take a moment to share your feedback. We appreciate it, and you'll help us shape future menus. You have {{{ $num_recipes_to_rate }}} recipes to rate from {{{ $num_orders_to_rate }}} orders.
				@endif
			</p>
	</div>
	@foreach($orders as $order_id => $order)
		@include('pages.account.ratings.order-rating')
	@endforeach
</div>
@include('includes.existing-subscriber-tracking')
@include('includes.changeurl')

@stop
