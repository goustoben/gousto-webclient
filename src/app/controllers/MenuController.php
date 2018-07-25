<?php

use Carbon\Carbon;
use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class MenuController extends BaseController
{
    public function deliveryDay($delivery_day_id)
    {
        try {
            $request_filters['includes'] = array_merge(['delivery_slots'], Input::get('includes', []));
            if (Input::has('postcode')) {
                $request_filters['postcode'] = Input::get('postcode');
            }
            $delivery_day = GoustoCore::fetch("delivery_days/{$delivery_day_id}", $request_filters);
            return Response::json([
                'status' => 'ok',
                'data' => $delivery_day
            ]);
        } catch (Exception $e) {
            return Response::json([
                'status' => 'error',
                'error' => $e->getMessage()
            ]);
        }
    }
}
