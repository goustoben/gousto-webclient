<?php

namespace Gousto\Sentry;

use Gousto\ApiClient\ApiTokenProviderInterface;
use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;
use Gousto\ApiClient\Facades\GoustoCore;
use Gousto\Oauth2\ClientServer;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cookie;

class Sentry implements ApiTokenProviderInterface
{
    const DI_ID = 'gousto.sentry';
    const KEY_ACCESS_TOKEN = 'access_token';
    const KEY_REFRESH_TOKEN = 'refresh_token';
    const KEY_REMEMBER_ME = 'remember_me';

    /**
     * @var ClientServer
     */
    protected $auth;

    /**
     * @var array
     */
    protected $config;

    /**
     * @var string
     */
    protected $access_cookie;
    protected $access_cookie_old;

    /**
     * @var string
     */
    protected $refresh_cookie;
    protected $refresh_cookie_old;

    /**
     * @var bool
     */
    protected $is_logged_in;

    /**
     * @var string
     */
    protected $access_token;

    /**
     * @var string
     */
    protected $refresh_token;

    /**
     * Sentry constructor.
     *
     * @param ClientServer $auth
     * @param array $config
     */
    public function __construct(ClientServer $auth, $config)
    {
        $this->auth = $auth;
        $this->config = $config;

        $this->access_cookie = $this->config['access']['name'];
        $this->access_cookie_old = $this->config['access']['old_name'];

        $this->refresh_cookie = $this->config['refresh']['name'];
        $this->refresh_cookie_old = $this->config['refresh']['old_name'];

        $this->is_logged_in = false;
    }

    /**
     * @return bool
     */
    public function hasAccessToken()
    {
        return $this->getAccessToken();
    }

    /**
     * @return bool
     */
    public function hasRefreshToken()
    {
        if (Cookie::has($this->refresh_cookie)) {
            $cookie = $this->getCookie($this->refresh_cookie);
            return isset($cookie[self::KEY_REFRESH_TOKEN]);
        }

        return false;
    }

    /**
     * @return bool
     */
    public function shouldRemember()
    {
        if (Cookie::has($this->refresh_cookie)) {
            $cookie = $this->getCookie($this->refresh_cookie);
            return (isset($cookie[self::KEY_REMEMBER_ME]) &&
                boolval($cookie[self::KEY_REMEMBER_ME]) &&
                isset($cookie[self::KEY_REFRESH_TOKEN])
            );
        }

        return false;
    }

    /**
     * @return bool
     */
    public function identify()
    {
        if ($this->hasAccessToken()) {
            $this->auth->setAccessToken($this->getAccessToken());
            $owner = $this->auth->getOwner();
            if ($owner && ($owner->getType() === 'user') && ($owner->hasRole('user')) && $this->updateGoustoReference()) {
                $this->updateAuthId($owner->getId());
                $this->is_logged_in = true;
            } else {
                $this->forgetAccessToken();
                $this->is_logged_in = false;
            }
        } else {
            $this->is_logged_in = false;
        }
        if (!$this->is_logged_in && $this->hasRefreshToken()) {
            $this->is_logged_in = $this->refresh();
        }
        return $this->isLoggedIn();
    }

    /**
     * @return bool
     */
    public function refresh()
    {
        $this->auth->setRefreshToken($this->getRefreshToken());
        if ($this->auth->refresh()) {
            $this->setAccessToken($this->auth->getAccessToken());
            $this->setRefreshToken($this->auth->getRefreshToken(), $this->shouldRemember());
        } else {
            $this->forget();
            $this->is_logged_in = false;
        }
        return $this->isLoggedIn();
    }

    /**
     * @return void
     */
    public function forget()
    {
        $this->forgetAccessToken();
        $this->forgetRefreshToken();
    }

    /**
     * @return void
     */
    public function forgetAccessToken()
    {
        Cookie::queue(Cookie::forget($this->access_cookie, null));
        $this->is_logged_in = false;
    }

    /**
     * @return void
     */
    public function forgetRefreshToken()
    {
        Cookie::queue(Cookie::forget($this->refresh_cookie, null));
    }

    /**
     * @return bool
     */
    public function updateGoustoReference()
    {
        try {
            $user = GoustoCore::fetch('/user/current');
            Session::put('GOUID', $user['user']['gousto_reference']);
            return true;
        } catch (GoustoCoreServiceErrorException $e) {
            return false;
        }
    }

    public function updateAuthId($authId)
    {
        Session::put('authId', $authId);
    }

    /**
     * @param string $token
     */
    public function setAccessToken($token)
    {
        $this->setCookie($this->access_cookie, [
            self::KEY_ACCESS_TOKEN => $token
        ], $this->config['access']['expire']);
        $this->access_token = $token;
        $this->is_logged_in = true;
    }

    /**
     * @param string $token
     * @param bool $remember
     */
    public function setRefreshToken($token, $remember = true)
    {
        $this->setCookie($this->refresh_cookie, [
            self::KEY_REFRESH_TOKEN => $token,
            self::KEY_REMEMBER_ME => boolval($remember)
        ], boolval($remember) ? $this->config['refresh']['expire'] : 0);
        $this->refresh_token = $token;
    }

    /**
     * @return string
     */
    public function getAccessToken()
    {
        if (empty($this->access_token)) {
            $cookie = $this->getCookie($this->access_cookie);
            $cookie_old = $this->getCookie($this->access_cookie_old);
            if (!is_null($cookie_old) && is_null($cookie)) {
                $cookie = $cookie_old;
            }

            $token = !is_null($cookie) ? array_get($cookie, self::KEY_ACCESS_TOKEN, '') : '';
        } else {
            $token = $this->access_token;
        }
        return $token;
    }

    /**
     * @return string
     */
    public function getRefreshToken()
    {
        if (empty($this->refresh_token)) {
            $cookie = $this->getCookie($this->refresh_cookie);
            $cookie_old = $this->getCookie($this->refresh_cookie_old);
            if (!is_null($cookie_old) && is_null($cookie)) {
                $cookie = $cookie_old;
            }

            $token = !is_null($cookie) ? array_get($cookie, self::KEY_REFRESH_TOKEN, '') : '';
        } else {
            $token = $this->refresh_token;
        }
        return $token;
    }

    /**
     * @return bool
     */
    public function isLoggedIn()
    {
        return $this->is_logged_in;
    }

    /**
     * @param bool $is_logged_in
     */
    public function setLoggedIn($is_logged_in)
    {
        $this->is_logged_in = $is_logged_in;
    }

    /**
     * @param string $cookie
     *
     * @return mixed
     */
    public function getCookie($cookie)
    {
        $value = Cookie::get($cookie);

        // If the value is JSON, return the array instead
        $decoded = json_decode($value, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            $value = $decoded;
        }

        return $value;
    }

    /**
     * @param string $name
     * @param mixed $value
     * @param int $expiry
     */
    public function setCookie($name, $value, $expiry)
    {
        if (!is_string($value)) {
            $value = json_encode($value);
        }
        Cookie::queue($name, $value, $expiry, null, null, false, false);
    }
}
