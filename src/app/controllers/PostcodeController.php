<?php

use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class PostcodeController extends BaseController
{
    public function deliveryDays($postcode)
    {
        try {
            $data = GoustoCore::fetch(
                'deliveryregion/{country}/{postcode}',
                [
                    'country' => 'gb',
                    'postcode' => $postcode
                ]
            );
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json(['status' => 'error', 'error-details' => $e->getDetails()]);
        }
        return Response::json($data);
    }

    public function isValid($postcode)
    {
        try {
            $data = GoustoCore::fetch('/postcode/' . $postcode);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json(['status' => 'error', 'error' => $e->getDetails()]);
        }
        return Response::json($data);
    }
}
