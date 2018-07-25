@include('includes.head')

@include('includes.header')

@yield('content', 'Something isn\'t right! This page exists and is using the default layout but has no content.')

@include('pages.values.farm-pictures')

@include('pages.values.about-gousto')

@include('includes.footer')
