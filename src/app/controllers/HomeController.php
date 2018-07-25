<?php

use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class HomeController extends BaseController
{
    public function index()
    {
        if (Sentry::shouldRemember()) {
            return Redirect::route('menu');
        }
        $menu_data = $this->coreProvider()->fetch("period/current/menu");

        $page = 'pages.home-d';
        $page_var = [
            'pageTitle' => 'Choose Recipes, Get Fresh And Organic Ingredients Delivered &amp; Cook Healthy Food',
            'bodyClass' => 'homepage',
            'menu' => isset($menu_data) ? $menu_data : null,
            'simplePage' => false,
        ];

        if (Request::segment(1) === 'join') {
            $page = 'pages.join';
            $simplePage = true;
            $page_var['simplePage'] = true;
            $page_var['canonical_url'] = URL::to('/');
            if (Sentry::isLoggedIn()) {
                return Redirect::to('/');
            }
            Cookie::queue('from_join', json_encode('join'), null, null, null, false, false);
        }


        return View::make($page, $page_var);
    }
}
