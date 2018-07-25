<?php

namespace Gousto\Sentry\Facades;

use Illuminate\Support\Facades\Facade;
use Gousto\Sentry\Sentry as SentryService;

class Sentry extends Facade
{
    /**
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return SentryService::DI_ID;
    }
}
