@extends('layouts.account')

@section('content')
@include('pages.account.modals.billing-modal')

<div id="my-gousto"></div>

<script type="text/javascript">
	var pageData = {
		user: {
			token: {{ json_encode($user_token) }},
			firstName: {{ json_encode($user['name_first']) }}
		}
	};
</script>

@section('scripts')
	{{ javascript_path('javascripts/mygousto.js') }}
@stop

@include('includes.existing-subscriber-tracking')
@include('includes.changeurl')
@stop
