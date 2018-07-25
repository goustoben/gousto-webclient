@if( !Sentry::isLoggedIn() )
  <li class="desktop-hide" ><a class="loginbutton imitate-link" data-remote="/login" role="button" data-toggle="modal" data-target="#loginModal">Login</a></li>
  <li class="floatingbtn mobile-hide"><a class="gbtn-secondary-outline loginbutton" data-remote="/login" role="button" data-toggle="modal" data-target="#loginModal" data-selid="homepage-login">Login</a></li>
@else
  <li class="desktop-hide {{{ Request::is( 'my-gousto') ? 'current' : '' }}}"><a href="{{{ URL::to('my-gousto') }}}">My Gousto</a></li>
  <li class="desktop-hide {{{ Request::is( 'rate-my-recipes' ) ? 'current' : '' }}}"><a href="{{{ URL::route('user.rate-my-recipes.show') }}}">Rate My Recipes</a></li>
  <li class="desktop-hide" data-toggle="tooltip" data-placement="bottom" data-animation="false" title="Logout"><a id="logout" href="/logout" role="button" data-toggle="modal" data-selid="logout-button">Logout</a></li>
  <li class="floatingbtn mobile-hide {{{ Request::is( 'my-gousto') ? 'current' : '' }}}"><a href="{{{ URL::to('my-gousto') }}}" class="gbtn-secondary-outline" data-selid="my-account-button">My Gousto</a></li>
  <li class="floatingbtn mobile-hide" data-toggle="tooltip" data-placement="bottom" data-animation="false" title="Logout"><a id="logout" class="gbtn-secondary-outline" href="/logout" role="button" data-toggle="modal" data-selid="logout-button" ><span class="glyphicon glyphicon-remove"></span></a></li>
@endif
