<!doctype html>
<html>
	<head>
			<title>Gousto</title>
			<style>
					#errorwrap {
						margin-top: 50px;
					}
					h1, h2 {
						font-family: 'AvenirHeavy',Helvetica,sans-serif;
						font-weight: normal;
						-webkit-font-smoothing: antialiased;
						text-transform: none;
						font-size: 22px;
					}
			</style>
	</head>
	<body>
	<div class="row">
			<center>
			<div id="errorwrap" class="container text-center">
					<div class="row">
							<h1 class="text-heading">Oh crumbs! That wasn't meant to happen.</h1>
					</div>
					<div class="row">
							<h2 class="text-heading">Please try again or get in touch with our Customer Care team.</h2>
					</div>
					<div class="row">
							<h2 class="text-heading">T: {{ Config::get('company.telephone') }}</h2>
							<h2 class="text-heading">E: <a href="mailto:info@gousto.co.uk">info@gousto.co.uk</a></h2>
					</div>
			</div>
			</div>
	</div>
</body>
</html>
