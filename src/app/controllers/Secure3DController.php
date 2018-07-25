<?php

use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class Secure3DController extends BaseController
{
    public function secure3d()
    {
        return View::make('pages.3dsecure', [
            'ACSURL' => Input::get('ACSURL'),
            'PAReq' => str_replace(' ', '+', Input::get('PAReq')),
            'MD' => Input::get('MD'),
            'VendorTxCode' => Input::get('VendorTxCode')
        ]);
    }

    public function callback()
    {
        $input = Input::only(
            'PaRes',
            'MD',
            'FinishedCallbackRoute'
        );

        try {
            GoustoCore::create('/3dsecure-callback', $input);

            // Normally JSON or HTML is returned in a controller action
            // With 3D-Secure, we need to tell the parent window to redirect, not the iframe so we have to return
            // JavaScript
            return '<script>window.parent.changeURL("/' . $input['FinishedCallbackRoute'] . '");</script>';
        } catch (GoustoCoreServiceErrorException $e) {
            return '<script>window.parent.changeURL("/contact-customer-care");</script>';
        }
    }
}
