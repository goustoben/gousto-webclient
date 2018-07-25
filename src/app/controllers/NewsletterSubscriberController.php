<?php

use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class NewsletterSubscriberController extends BaseController
{
    public function store()
    {
        $input = ['email' => Input::get('EMAIL', Input::get('email'))];

        $data = null;
        try {
            $data = GoustoCore::create('/newsletterSubscriber', [
                'email' => $input['email']
            ]);

            return Response::json([
                'status' => 'ok',
                'data' => $data
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'error-details' => $e->getDetails()
            ]);
        }
    }
}
