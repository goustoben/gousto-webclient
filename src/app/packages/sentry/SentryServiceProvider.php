<?php

namespace Gousto\Sentry;

use Illuminate\Support\ServiceProvider;

class SentryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(Sentry::DI_ID, function ($app) {
            if ($app['config']['auth']['sentry']['backwards_compatible']) {
                return new BackwardsCompatibleSentry(
                    $app['client_server'],
                    $app['config']['auth']['sentry']
                );
            } else {
                return new Sentry(
                    $app['client_server'],
                    $app['config']['auth']['sentry']
                );
            }
        });
    }
}
