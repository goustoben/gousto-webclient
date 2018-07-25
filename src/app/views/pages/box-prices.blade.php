@extends('layouts.default')
@include('includes.meta', array('meta' => Config::get('meta.main.box-prices')))
@section('content')

<div id="box-prices-container">
	{{-- REACT RENDERED --}}
</div>

@stop
@section('scripts')
	{{ javascript_path('javascripts/boxprices.js') }}
@stop
