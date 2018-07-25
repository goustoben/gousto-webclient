<?php

use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class PromotionController extends BaseController
{
    public function code($code)
    {
        try {
            $codeData = GoustoCore::fetch('/promocode/' . $code);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'error' => 'Unknown error fetching code',
                'code' => $code,
                'details' => 'error'
            ]);
        }
        return Response::json(
            [
                'status' => 'ok',
                'data' => $codeData
            ]
        );
    }

    public function setCodeSession()
    {
        $code = Input::get('promocode');
        try {
            $codeData = GoustoCore::fetch('/promocode/' . $code);
            Session::put('promo.code', $code);
            PromoCode::setCookie($code);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'error' => 'Unknown error fetching code',
                'code' => $code,
                'details' => 'error'
            ]);
        }
        return Response::json(
            [
                'status' => 'ok',
                'data' => $codeData
            ]
        );
    }
}
