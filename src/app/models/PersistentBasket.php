<?php

class PersistentBasket
{
    public static function deleteCookies()
    {
        $cookies = Cookie::get();
        $persistent_basket_cookie_names = array_filter(array_keys($cookies), function ($name) {
            return strpos($name, 'goustoStateStore') === 0 && strpos($name, 'goustoStateStore_features') === -1;
        });
        foreach ($persistent_basket_cookie_names as $persistent_basket_cookie_name) {
            Cookie::queue($persistent_basket_cookie_name, null, -1);
        }
    }
}
