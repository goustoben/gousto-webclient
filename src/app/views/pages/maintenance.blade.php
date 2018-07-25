@extends('layouts.default')
@section('bodyClass') class="error-page" @stop
@section('content')

<link href="https://s3-eu-west-1.amazonaws.com/gousto2-maintenance/maintenance.css"  rel="stylesheet" type="text/css">
<style type="text/css">
#navrow{
	background: #FFF;
}
footer.container{
	padding: 0;
	border-top: 0;
}
.error-page .wrapper{
	box-shadow: none;
	-webkit-box-shadow: none;
}
#mainsidebar, .free-delivery, .footer-appstore-link, .pipe{
	display: none !important;
}
.navbar-default .navbar-brand{
	margin: 10px;
}
.icon-gousto-iso {
	width: 200px;
	height: 200px;
}
</style>

<div id="errorwrap" class="container text-center">
	<div class="row">
		<h1 class="text-heading">Scheduled Maintenance<br />We'll be back soon!</h1>
	</div>
	<div class="row">
		{{ svg_path('icon-gousto-iso') }}
	</div>
	<div class="row">
		<h2 class="text-heading">T: {{{ Config::get('company.telephone') }}}</h2>
		<h2 class="text-heading">E: <a class="error-page-link" href="mailto:info@gousto.co.uk">info@gousto.co.uk</a></h2>
	</div>
</div>
@stop
