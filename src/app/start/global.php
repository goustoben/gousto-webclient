<?php

/*
|--------------------------------------------------------------------------
| Register The Laravel Class Loader
|--------------------------------------------------------------------------
|
| In addition to using Composer, you may use the Laravel class loader to
| load your controllers and models. This is useful for keeping all of
| your classes in the "global" namespace without Composer updating.
|
*/

ClassLoader::addDirectories([

    app_path().'/commands',
    app_path().'/controllers',
    app_path().'/models',
    app_path().'/database/seeds',

]);

/*
|--------------------------------------------------------------------------
| Application Error Logger
|--------------------------------------------------------------------------
|
| Here we will configure the error logger setup for the application which
| is built on top of the wonderful Monolog library. By default we will
| build a basic log file setup which creates a single file for logs.
|
*/

Log::useFiles(storage_path().'/logs/laravel.log', Config::get('app.log_level'));

/*
|--------------------------------------------------------------------------
| Application Error Handler
|--------------------------------------------------------------------------
|
| Here you may handle any errors that occur in your application, including
| logging them or displaying custom views for specific errors. You may
| even register several error handlers to handle different types of
| exceptions. If nothing is returned, the default error view is
| shown, which includes a detailed stack trace during debug.
|
*/

App::error(function (Exception $exception, $code) {
    try {
        if (!Config::get('app.detailed_errors', false)) {
            switch ($code) {
                case 404:
                    if (Config::get('app.log_404')) {
                        Log::error($exception);
                    }
                    return Response::view('pages.errors.404', [], 404);
                default:
                    if ($code >= 600) {
                        Log::emergency($exception);
                        return Response::view('pages.errors.default', [], $code);
                    } elseif ($code >= 500) {
                        Log::critical($exception);
                        return Response::view('pages.errors.500', [], $code);
                    } elseif ($code >= 400) {
                        Log::error($exception);
                        return Response::view('pages.errors.default', [], $code);
                    } elseif ($code >= 300) {
                        Log::warning($exception);
                        return Response::view('pages.errors.default', [], $code);
                    } elseif ($code >= 250) {
                        Log::notice($exception);
                        return Response::view('pages.errors.default', [], $code);
                    } elseif ($code >= 200) {
                        Log::info($exception);
                        return Response::view('pages.errors.default', [], $code);
                    } elseif ($code >= 100) {
                        Log::debug($exception);
                        return Response::view('pages.errors.default', [], $code);
                    } else {
                        Log::error($exception);
                        return Response::view('pages.errors.default', [], $code);
                    }
            }
        }
    } catch (Exception $e) {
        Log::critical($e);
        return Response::view('pages.errors.simple', [], 500);
    }
});

App::error(function (CsrfHeaderException $exception, $code) {
    Log::warning($exception);
    return Response::view('pages.errors.default', [], $code);
});

/*
|--------------------------------------------------------------------------
| Maintenance Mode Handler
|--------------------------------------------------------------------------
|
| The "down" Artisan command gives you the ability to put an application
| into maintenance mode. Here, you will define what is displayed back
| to the user if maintenance mode is in effect for the application.
|
*/

App::down(function () {
    return Response::view('pages.maintenance', [], 503);
});

/*
|--------------------------------------------------------------------------
| Require The facades File
|--------------------------------------------------------------------------
|
| Next we will load the facades file for the application. This needs to run
| prior to the filters file, as filters may use the defined Facades
|
*/
require app_path().'/facades.php';

/*
|--------------------------------------------------------------------------
| Require The Filters File
|--------------------------------------------------------------------------
|
| Next we will load the filters file for the application. This gives us
| a nice separate location to store our route and application filter
| definitions instead of putting them all in the main routes file.
|
*/

require app_path().'/filters.php';

/*
|--------------------------------------------------------------------------
| Require The Macros File
|--------------------------------------------------------------------------
|
| The macros file provides macros for Form and HTML elements, it makes
| this file cleaner.
|
*/

require app_path().'/start/macros.php';

/*
|--------------------------------------------------------------------------
| Require The View Composers File
|--------------------------------------------------------------------------
|
| The view composers file provides view composers, so that certain API
| calls will be made when the view is being rendered.
|
*/

require app_path().'/start/view_composers.php';

/*
|--------------------------------------------------------------------------
| Require The Assets File
|--------------------------------------------------------------------------
|
| The assets file provides access to the asset_path function, which refers
| also to the manifest json file
|
*/
require_once app_path().'/start/assets.php';
