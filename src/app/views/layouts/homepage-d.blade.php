@include('includes.head')

@if(isset($simplePage))
  @include('includes.header', array('hp' => 'd', 'simplePage' => $simplePage))
@else
  @include('includes.header', array('hp' => 'd'))
@endif

@yield('content', 'Something isn\'t right! This pageexists and is using the default layout but has no content.')

@if(isset($simplePage))
  @include('includes.footer', ['simplePage' => $simplePage])
@else
  @include('includes.footer')
@endif
