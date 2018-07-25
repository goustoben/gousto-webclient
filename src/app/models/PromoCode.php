<?php

class PromoCode
{
    public static function setCookie($promocode)
    {
        Cookie::queue('promo_code', $promocode, null, null, null, false, false);
    }

    public static function deleteCookie()
    {
        Cookie::queue('promo_code', null, -1);
    }
}
