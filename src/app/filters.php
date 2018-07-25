<?php

/*
|--------------------------------------------------------------------------
| Application & Route Filters
|--------------------------------------------------------------------------
|
| Below you will find the "before" and "after" events for the application
| which may be used to do any work before or after a request into your
| application. Here you may also register your custom route filters.
|
*/

App::before(function ($request) {
    Session::forget('user_type');
    App::make('ApiSession')->flush();
    // AWin Affiliate Tracking
    if (Input::has('asource') && !isset($_COOKIE['asource'])) {
        $thirtydays = 60 * 60 * 24 * 30 + time();
        setcookie('asource', Input::get('asource'), $thirtydays);
    }

    if (!Sentry::hasAccessToken() && Sentry::hasRefreshToken()) {
        Sentry::refresh();
    } elseif (Sentry::hasAccessToken()) {
        Sentry::setLoggedIn(true);
    }
});

App::after(function ($request, $response) {
    Session::forget('user_type');
    App::make('ApiSession')->flush();
});

/*
|--------------------------------------------------------------------------
| Authentication Filters
|--------------------------------------------------------------------------
|
| The following filters are used to verify that the user of the current
| session is logged into this application. The "basic" filter easily
| integrates HTTP Basic authentication for quick, simple checking.
|
*/

Route::filter('auth', function () {
    if (Auth::guest()) {
        return Redirect::guest('login');
    }
});


Route::filter('auth.basic', function () {
    return Auth::basic();
});

/*
|--------------------------------------------------------------------------
| Guest Filter
|--------------------------------------------------------------------------
|
| The "guest" filter is the counterpart of the authentication filters as
| it simply checks that the current user is not logged in. A redirect
| response will be issued if they are, which you may freely change.
|
*/

Route::filter('guest', function () {
    if (Auth::check()) {
        return Redirect::to('/');
    }
});

/*
|--------------------------------------------------------------------------
| Request Type Filters
|--------------------------------------------------------------------------
|
| These filters are to enforce the request being requested with a
| particular header type. All are named request-[type].
|
*/

Route::filter('request-ajax', function () {
    if (!Request::ajax()) {
        return Redirect::to('/');
    }
});

/*
|--------------------------------------------------------------------------
| CSRF Protection Filter
|--------------------------------------------------------------------------
|
| The CSRF filter is responsible for protecting your application against
| cross-site request forgery attacks. If this special token in a user
| session does not match the one given in this request, we'll bail.
|
*/

Route::filter('csrf', function ($route, $request) {
    if (Session::token() != Input::get('_token')) {
        $url = $request->url();
        $token = Input::get('_token');
        $referer = $request->header('referer');
        \Log::notice("{$url} from {$referer} failed csrf token check: {$token}");
    }
});

Route::filter('csrf-header', 'CsrfHeaderFilter');

Route::filter('require_login', function () {
    $logged_in = false;
    if (Sentry::hasAccessToken()) {
        $logged_in = Sentry::identify();
    }

    if (!$logged_in) {
        $url = URL::route('homepage', ['target' => Request::fullUrl()]) . '#login';
        return Redirect::to($url);
    }
});
