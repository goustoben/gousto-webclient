@include('includes.head')

@include('includes.header', ["simplePage" => true])

	@yield('content')

	@yield('gtm_javascript')

	@include('includes.checkoutfooter')

	@include('includes.craftyclicks')

	</body>

</html>
