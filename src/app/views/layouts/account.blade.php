@section('bodyClass')class="account"@stop

@include('includes.meta', array('meta' => Config::get('meta.account')))

@include('includes.head')

@include('includes.header')

@include('pages.account.includes.celebrity-chef-banner')

@yield('content', 'Something isn\'t right! This page exists and is using the default layout but has no content.')

@include('includes.footer')
