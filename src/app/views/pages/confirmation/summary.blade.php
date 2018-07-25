@extends('layouts.default')
@section('bodyClass') class="summary"@stop
@section('content')

{{{ Session::flash('edited_order_id', $order['id']) }}}
@include('pages.farmshop.index')

<script type="text/javascript">
	var user_name = '{{{$user['user']['name_first']}}}';
	var referral_code = '{{{isset($user['referral-code']) ? $user['referral-code'] : ''}}}';
</script>

@include('includes.new-order-tracking', array('recipes' => $recipes))
@stop
