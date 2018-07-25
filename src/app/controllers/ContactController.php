<?php

use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class ContactController extends BaseController
{
    public function store()
    {
        $input = Input::only(
            'phone',
            'email',
            'name_first',
            'name_last',
            'comments',
            'role_interested_in'
        );

        try {
            GoustoCore::create('contact', $input);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json(
                [
                'status' => 'error',
                'error-details' => $e->getDetails()]
            );
        }

        return Response::json([
            'status' => 'ok'
        ]);
    }
}
