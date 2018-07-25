<?php

namespace Gousto\Support;

use Illuminate\Foundation\Application as LaravelApplication;

class Application extends LaravelApplication
{
    /**
     * @inheritdoc
     */
    protected function getStackedClient()
    {
        $sessionReject = $this->bound('session.reject') ? $this['session.reject'] : null;

        $client = with(new \Stack\Builder)
            ->push('Gousto\Support\CookieGuard', $this['encrypter'])
            ->push('Illuminate\Cookie\Queue', $this['cookie'])
            ->push('Illuminate\Session\Middleware', $this['session'], $sessionReject);

        $this->mergeCustomMiddlewares($client);

        return $client->resolve($this);
    }
}
