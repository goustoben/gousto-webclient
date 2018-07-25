<?php

use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class BoxPricesController extends BaseController
{
    public function index()
    {
        return View::make('pages.box-prices', ['canonical_url' => URL::to('box-prices')]);
    }
}
