<?php

use Gousto\Promotion\PromoUtils;
use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class CampaignController extends BaseController
{
    public function referredFriend($user_name, $promocode)
    {
        $menu_data = $this->coreProvider()->fetch("period/current/menu");
        $details = 'none';
        $condition = 'none';
        try {
            Session::forget('promo');
            $codeData = $this->coreProvider()->fetch('/promotionCode/' . $promocode);
            Session::put('promo', $codeData);
            $details = isset($codeData['details']) ? $codeData['details'] : 'none';
            $condition = isset($codeData['condition']) ? $codeData['condition'] : 'none';
        } catch (GoustoCoreServiceErrorException $e) {
            // Silently ignore codes not found, they are catched elsewhere anyway
        }
        return View::Make(
            'pages.home-d',
            [
                'pageTitle' => 'Choose Recipes, Get Fresh And Organic Ingredients Delivered &amp; Cook Healthy Food',
                'bodyClass' => 'homepage',
                'promocode' => $promocode,
                'canonical_url' => URL::to('/'),
                'details' => $details,
                'condition' => $condition,
                'menu' => isset($menu_data) ? $menu_data : null
        ]
        );
    }

    public function loadRoute()
    {
        try {
            $promo = GoustoCore::fetch('campaign/' . Request::segment(1) . '/promocode');

            $promocode = isset($promo['promocode']) ? $promo['promocode'] : null;

            if (!$promocode) {
                return App::abort(404);
            }
            if (Sentry::identify()) {
                return Redirect::route('homepage', array_merge(['promo_code' => $promocode], Request::query()));
            }

            $menu_data = $this->coreProvider()->fetch("period/current/menu");

            Cookie::queue('promo_url', Request::segment(1), null, null, null, false, false);

            return View::make('pages.home-d', [
                'pageTitle' => 'Choose Recipes, Get Fresh And Organic Ingredients Delivered &amp; Cook Healthy Food',
                'bodyClass' => 'homepage',
                'menu' => isset($menu_data) ? $menu_data : null,
                'landingPagePath' => Request::segment(1),
                'canonical_url' => URL::to('/'),
            ]);
        } catch (Exception $e) {
            Log::info($e);
            App::abort(404);
        }
    }
}
