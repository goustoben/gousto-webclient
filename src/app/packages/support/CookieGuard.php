<?php

namespace Gousto\Support;

use Illuminate\Cookie\Guard;
use Illuminate\Encryption\DecryptException;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;

class CookieGuard extends Guard
{
    /**
     * @var array
     */
    protected $unencrypted_cookies = [
        'asource',
        'oauth_token',
        'oauth_refresh',
        'promo_code',
        'promo_url',
        'from_join',
        'goustoStateStore_basket_promoCode',
        'goustoStateStore_basket_postcode',
        'goustoStateStore_basket_date',
        'goustoStateStore_basket_address',
        'goustoStateStore_basket_numPortions',
        'goustoStateStore_basket_slotId',
        'goustoStateStore_basket_recipes',
        'goustoStateStore_basket_recipesPositions',
        'goustoStateStore_basket_previewOrderId',
        'goustoStateStore_basket_stepsOrder',
        'goustoStateStore_basket_collection',
        'goustoStateStore_filters_currentCollectionId',
        'goustoStateStore_signupSteps',
        'goustoStateStore_features',
        'goustoStateStore_promoAgeVerified',
        'goustoStateStore_tracking',

        'v1_asource',
        'v1_oauth_token',
        'v1_oauth_refresh',
        'v1_promo_code',
        'v1_promo_url',
        'v1_from_join',
        'v1_goustoStateStore_basket_promoCode',
        'v1_goustoStateStore_basket_postcode',
        'v1_goustoStateStore_basket_date',
        'v1_goustoStateStore_basket_address',
        'v1_goustoStateStore_basket_numPortions',
        'v1_goustoStateStore_basket_slotId',
        'v1_goustoStateStore_basket_recipes',
        'v1_goustoStateStore_basket_recipesPositions',
        'v1_goustoStateStore_basket_previewOrderId',
        'v1_goustoStateStore_basket_stepsOrder',
        'v1_goustoStateStore_signupSteps',
        'v1_goustoStateStore_collection',
        'v1_goustoStateStore_currentCollectionId',
        'v1_goustoStateStore_features',
        'v1_goustoStateStore_promoAgeVerified',
        'v1_goustoStateStore_tracking',
    ];

    /**
     * @inheritdoc
     */
    protected function decrypt(Request $request)
    {
        foreach ($request->cookies as $key => $c) {
            if ($this->isEncryptedCookie($key)) {
                try {
                    $request->cookies->set($key, $this->decryptCookie($c));
                } catch (DecryptException $e) {
                    $request->cookies->set($key, null);
                }
            }
        }

        return $request;
    }

    /**
     * @inheritdoc
     */
    protected function encrypt(Response $response)
    {
        foreach ($response->headers->getCookies() as $key => $c) {
            if ($this->isEncryptedCookie($c->getName())) {
                $encrypted = $this->encrypter->encrypt($c->getValue());
                $response->headers->setCookie($this->duplicate($c, $encrypted));
            }
        }

        return $response;
    }

    /**
     * @param string $cookie
     *
     * @return bool
     */
    protected function isEncryptedCookie($cookie)
    {
        return !in_array($cookie, $this->unencrypted_cookies);
    }
}
