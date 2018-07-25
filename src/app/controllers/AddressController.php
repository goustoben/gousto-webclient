<?php

use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class AddressController extends BaseController
{
    public function store($id)
    {
        try {
            $data = GoustoCore::create(
                "/user/$id/address",
                [
                    'companyname' => Input::get('companyname'),
                    'line1' => Input::get('line1'),
                    'line2' => Input::get('line2'),
                    'line3' => Input::get('line3'),
                    'town' => Input::get('town'),
                    'county' => Input::get('county'),
                    'country' => Input::get('country'),
                    'postcode' => Input::get('postcode'),
                    'delivery_instructions' => Input::get('delivery_instructions'),
                ]
            );
        } catch (GoustoCoreServiceErrorException $e) {
            return Redirect::to('admin/error')->with('error', $e->getDetails());
        }

        return Redirect::to('admin/customer/edit/' . $id);
    }

    public function buildAddressBox($user_id)
    {
        try {
            $address = $this->coreProvider()->fetch('/user/' . $user_id . '/address/' . Input::get('address_id'));
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails()
            ]);
        }
        $view = View::make('pages.account.includes.address', [
            'address' => $address['address'],
            'current_id' => -1,
            'can_edit' => true,
            'for_delivery' => $address['address']['type'] === 'shipping'
        ])->render();

        return Response::json([
            'status' => 'ok',
            'data' => $view
        ]);
    }

    public function buildOrderAddressBox($user_id, $order_id)
    {
        try {
            $address = $this->coreProvider()->fetch('/user/' . $user_id . '/address/' . Input::get('address_id'));
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails()
            ]);
        }
        $view = View::make('pages.account.deliveries.address', [
            'address' => $address['address'],
            'current_id' => -1,
            'can_edit' => false,
            'for_delivery' => $address['address']['type'] === 'shipping',
            'order_id' => $order_id
        ])->render();

        return Response::json([
            'status' => 'ok',
            'data' => $view
        ]);
    }
}
