<?php

namespace Gousto\Sentry;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cookie;

class BackwardsCompatibleSentry extends Sentry
{
    const CORETOKEN = 'coretoken';
    const REMEMBERME = 'rememberme';
    const GOUSTO_LOGIN = 'gousto_login';

    /**
     * @inheritdoc
     */
    public function hasAccessToken()
    {
        return parent::hasAccessToken() || Session::has(self::CORETOKEN);
    }

    /**
     * @inheritdoc
     */
    public function hasRefreshToken()
    {
        return parent::hasRefreshToken() || Cookie::has(self::REMEMBERME);
    }

    /**
     * @inheritdoc
     */
    public function shouldRemember()
    {
        if (!($should_remember = parent::shouldRemember())) {
            $should_remember = Cookie::has(self::REMEMBERME);
        }
        return $should_remember;
    }

    /**
     * @inheritdoc
     */
    public function forgetAccessToken()
    {
        Session::forget(self::CORETOKEN);
        Cookie::queue(Cookie::forget(self::GOUSTO_LOGIN));
        parent::forgetAccessToken();
    }

    /**
     * @inheritdoc
     */
    public function forgetRefreshToken()
    {
        Cookie::queue(Cookie::forget(self::REMEMBERME));
        parent::forgetRefreshToken();
    }

    /**
     * @inheritdoc
     */
    public function getAccessToken()
    {
        if (!($token = parent::getAccessToken())) {
            $token = Session::get(self::CORETOKEN);
        }
        return $token;
    }

    /**
     * @inheritdoc
     */
    public function getRefreshToken()
    {
        if (!($token = parent::getRefreshToken())) {
            $token = Cookie::get(self::REMEMBERME);
        }
        return $token;
    }
}
