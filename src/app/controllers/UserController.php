<?php

use Carbon\Carbon;
use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class UserController extends BaseController
{
    public function deliveries()
    {
        $async = new GoustoAsync;
        try {
            $async->add('user_data', 'user/current');
            $orders_params = [
                'includes' => 'shipping_address',
                'phases' => [
                    'pre_menu',
                    'awaiting_choices',
                    'cutoff',
                    'open',
                    'delivery',
                    'packing',
                    'picking'
                ]
            ];
            $async->add('orders_data', "user/current/orders", $orders_params);
            $async->add('shipping_addresses_data', "user/current/address", ['type' => 'shipping']);
            $async->add('projected_delivery_data', "user/current/projected-deliveries");
            $async->add('subscription_delivery_data', 'user/current/subscription/delivery/next');
            $async->add('num_recipes_to_rate', "/user/current/ratings/count");
            $async->add('payment_method', "user/current/paymentMethod", [], null, function ($e) {
                return [];
            });
            $async->add('subscription', 'user/current/subscription');
            extract($this->coreProvider()->asyncFetch($async));
            $orders_data = array_get($orders_data, 'data', $orders_data);

            try {
                $pending_free_box_data = $this->getPendingFreeBoxData($user_data);
                $free_box_with_suffix_text = $this->determineFreeBoxWithSuffixText(
                    $pending_free_box_data['boxes_until_free'],
                    $pending_free_box_data['free_box_with_suffix']
                );
            } catch (GoustoCoreServiceErrorException $ex) {
                Log::notice($ex->getMessage());
                $free_box_with_suffix_text = null;
                $pending_free_box_data = null;
            }

            return View::make('pages.account.deliveries', [
                'user' => $user_data['user'],
                'orders' => $orders_data,
                'shipping_addresses' => $shipping_addresses_data,
                'projected_deliveries' => $projected_delivery_data,
                'pending_free_box_data' => $pending_free_box_data,
                'next_projected_delivery_data' => $subscription_delivery_data,
                'num_recipes_to_rate' => $num_recipes_to_rate,
                'payment_method' => $payment_method,
                'subscription' => $subscription,
                'free_box_with_suffix_text' => $free_box_with_suffix_text
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            throw $e;
        }
    }

    public function myGousto()
    {
        try {
            $async = new GoustoAsync;
            $async->add('user_data', 'user/current');
            $async->add('payment_method', "user/current/paymentMethod", [], null, function ($e) {
                return [];
            });
            extract($this->coreProvider()->asyncFetch($async));

            return View::make('pages.account.my-gousto', [
                'user' => $user_data['user'],
                'user_token' => Sentry::getAccessToken(),
                'payment_method' => $payment_method
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            \Log::warning('myGousto failed with access token: ' . Sentry::getAccessToken());
            return Redirect::to('/');
        }
    }

    public function signup()
    {
        if (Sentry::isLoggedIn()) {
            return Redirect::route('menu');
        }
        PersistentBasket::deleteCookies();

        return View::make('pages.signup');
    }

    public function paymentMethod($id)
    {
        $card_input = Input::only(
            'card_type',
            'card_number',
            'card_cvv2',
            'card_holder',
            'card_expires'
        );

        $card_input['user_id'] = $id;
        $card_input['payment_type'] = 'card';

        $data = null;
        try {
            $data = GoustoCore::update('user/' . $id . '/paymentMethod', $card_input);
        } catch (GoustoCoreServiceErrorException $e) {
            \Log::warning($e);
            return Response::json(['error' => $e->getDetails()]);
        }

        $balance_data = GoustoCore::fetch('/user/current/balance');
        $balance = $balance_data['balance'];

        return Response::json([
            'status' => 'ok',
            'data' => $data,
            'balance' => $balance
        ]);
    }

    public function updateName($user_id = 'current')
    {
        try {
            $data = $this->coreProvider()->update("user/{$user_id}", Input::only(
                'name_first',
                'name_last'
            ));
            return Response::json([
                'status' => 'ok',
                'data' => $data
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e->getMessage());
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails(),
            ]);
        }
    }

    public function updatePhone($user_id = 'current')
    {
        try {
            $data = $this->coreProvider()->update("user/{$user_id}", Input::only(
                'phone'
            ));
            return Response::json([
                'status' => 'ok',
                'data' => $data
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e->getMessage());
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails()
            ]);
        }
    }

    public function updateEmail($user_id = 'current')
    {
        try {
            $data = $this->coreProvider()->update("user/{$user_id}", Input::only(
                'email'
            ));
            return Response::json([
                'status' => 'ok',
                'data' => $data
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e->getMessage());
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails(),
            ]);
        }
    }

    public function updateCommunicationPreferences($user_id = 'current')
    {
        try {
            $data = $this->coreProvider()->update("user/{$user_id}", Input::only(
                'marketing_do_allow_email',
                'marketing_do_allow_phone',
                'marketing_do_allow_post',
                'marketing_do_allow_sms',
                'marketing_do_allow_thirdparty'
            ));
            return Response::json([
                'status' => 'ok',
                'data' => $data
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e->getMessage());
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails(),
            ]);
        }
    }

    public function publicUpdateAgeVerified()
    {
        try {
            $data = $this->coreProvider()->update("user/current", [
                'age_verified' => 1,
            ]);
            return Response::json([
                'status' => 'ok',
                'data' => []
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            // This flag will attempt to set age_verified on login/register
            Session::put('age_verified', true);
            return Response::json([
                'status' => 'ok',
                'error' => []
            ]);
        }
    }

    public function updateAgeVerified($user_id = 'current')
    {
        try {
            $data = $this->coreProvider()->update("user/{$user_id}", Input::only(
                'age_verified'
            ));
            return Response::json([
                'status' => 'ok',
                'data' => $data
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails(),
            ]);
        }
    }

    public function login()
    {
        $email = Input::get('email');
        $password = Input::get('password');
        $remember_me = Input::get('rememberme', false);
        // if remember_me is selected get device infomation
        $payload = [
            'email' => $email,
            'password' => $password,
            'remember_me' => true // always get a refresh token back
        ];
        if ($remember_me) {
            $device = new DeviceInfo;
            $payload = array_merge($payload, $device->toArray());
        }
        try {
            $data = GoustoCore::create('auth/token', $payload);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json(['status' => 'error', 'error-details' => $e->getDetails()]);
        }

        if (isset($data['cancelled']) && $data['cancelled']) {
            Session::put('reactivate', $data['token']);
            unset($data['token']);
            Session::flash(
                'cancelled_at',
                Carbon::createFromFormat('Y-m-d H:i:s', $data['cancelled_at'])->
                    format('l, jS \\of F Y')
            );
        } else {
            $data['cancelled'] = false;
            Sentry::setAccessToken($data['token']);
            if (isset($data['remember_token'])) {
                Sentry::setRefreshToken($data['remember_token'], $remember_me);
            }
        }

        if (Session::has('promo.code')) {
            $promocode = Session::get('promo.code');
        }

        if (Input::has('promocode')) {
            $promocode = Input::get('promocode');
        }

        if (isset($promocode) && !$data['cancelled']) {
            try {
                $this->coreProvider()->create('/user/current/applyPromotionCode/' . $promocode);
                Session::forget('promo');
            } catch (GoustoCoreServiceErrorException $e) {
                Log::warning($e);
            }
        }

        $this->applyAgeVerification();

        return Response::json(['status' => 'ok', 'result' => $data]);
    }

    public function logout()
    {
        try {
            $data = GoustoCore::destroy('auth/token');
        } catch (Exception $e) {
            // do nothing with error, continue to log user out
        }
        Session::forget('GOUID');
        Session::forget('authId');
        Session::forget('promo');

        Cookie::queue(Cookie::forget('hide_card_banner'));

        Sentry::forget();

        return View::make('pages.logout');
    }

    public function reset()
    {
        $email = Input::get('email');
        try {
            $data = GoustoCore::create('user/passwordReset', ['email' => $email]);
            return Response::json($data);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function resetPassword($user_id = 'current')
    {
        try {
            $data = $this->coreProvider()->create("user/{$user_id}/passwordReset");
            return Response::json([
                'status' => 'ok',
                'data' => $data
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function newpasswordform()
    {
        $token = Input::get('token');
        if (!$token || !preg_match('#^[0-9a-zA-Z]+$#', $token)) {
            return Redirect::to('/login');
        }

        return View::make('pages.newpasswordform', ['token' => $token]);
    }

    public function newpassword()
    {
        $token = Input::get('token');
        if ($token && preg_match('#^[0-9a-zA-Z]+$#', $token)) {
            try {
                $data = GoustoCore::update(
                    'auth/updatePassword',
                    [
                        'token' => $token,
                        'password' => Input::get('password')
                    ]
                );
                Sentry::setAccessToken($data['token']);
                return Response::json([
                    'status' => 'ok'
                ]);
            } catch (GoustoCoreServiceErrorException $e) {
                \Log::warning($e->getMessage());
                $data = false;
            }
        }
        return Response::json([
            'status' => 'error',
            'error' => "Password Reset Token Invalid or Expired."
        ], 400);
    }

    public function setpassword($id)
    {
        try {
            $data = GoustoCore::update(
                'user/' . $id . '/updatePassword',
                [
                    't' => Input::get('_token'),
                    'password' => Input::get('password')
                ]
            );
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'error' => $e->getMessage()
            ]);
        }
        return Response::json([ 'status' => 'ok', 'data' => $data ]);
    }

    public function balance()
    {
        $balance_data = GoustoCore::fetch('/user/current/balance');
        $balance = $balance_data['balance'];
        $html = '<h4><span ';
        $html .= $balance < 0 ? 'style="color:red"' : 'style="color:green"';
        $html .= '>' . number_format($balance, 2) . 'GBP</span></h4>';
        return Response::json([
            'status' => 'ok',
            'html' => $html,
        ]);
    }

    public function orders($user_id, $state = 'all')
    {
        try {
            $orders = GoustoCore::fetch(
                'user/' . $user_id . '/orders',
                [
                    'state' => $state,
                    'limit' => Input::get('limit', 10),
                    'sort_order' => 'desc',
                    'include_ratings' => Input::get('include_ratings', 0),
                    'include_recipes' => Input::get('include_recipes', 1),
                    'include_products' => Input::get('include_products', 1)
                ]
            );

            $orders = array_get($orders, 'data', $orders);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json(['status' => 'error', 'error' => $e->getMessage()]);
        }

        return Response::json(['status' => 'ok', 'data' => $orders]);
    }

    public function customer_care()
    {
        $user_data = null;
        $error = null;
        try {
            $user_data = GoustoCore::fetch('/user/current');
        } catch (GoustoCoreServiceErrorException $e) {
            $error = $e->getDetails();
            switch ($error) {
                case 'Valid Token Required':
                    Sentry::forgetAccessToken();
                    return Redirect::to('/my-account');
                    break;
            }
        }

        $error = null;
        $payment_method_data = null;
        try {
            if (isset($user_data['user']['id'])) {
                $payment_method_data = GoustoCore::fetch('user/' . $user_data['user']['id'] . '/paymentMethod');
            }
        } catch (GoustoCoreServiceErrorException $e) {
            $error = $e->getDetails();
            switch ($error) {
                case 'Could not find an active payment method for specified User':
                    return View::make('pages.contact-customer-care', [
                        'user' => $user_data,
                        'error' => 'no-payment-method'
                    ]);
                    break;
            }
        }

        return View::make('pages.contact-customer-care', [
            'user' => $user_data,
            'error' => $error
        ]);
    }

    public function onHoldModal($user_id)
    {
        $async = new GoustoAsync;
        try {
            $async->add('user', "user/{$user_id}");
            $async->add('balance', "user/{$user_id}/balance");
            extract($this->coreProvider()->asyncFetch($async));
            return View::make('includes.modals.onhold-billing-modal', [
                'fn' => $user['user']['name_first'],
                'msg' => 'update',
                'balance' => floatval($balance['balance'])
            ]);
        } catch (Exception $e) {
            Log::critical($e->getMessage());
            return Response::json(['data' => 'error']);
        }
    }

    public function current()
    {
        $data = GoustoCore::fetch('user/current');
        return Response::json(['data' => 'error']);
    }

    public function show($user_id = 'current')
    {
        $async = new GoustoAsync;
        try {
            $async->add('user_data', "user/{$user_id}");
            $async->add('shipping_addresses', "user/{$user_id}/address", ['type' => 'shipping']);
            $async->add('balance_data', "user/{$user_id}/balance");
            $async->add('order_count', "user/{$user_id}/orders/count", [], null, function ($e) {
                \Log::error($e);
                return false;
            });
            $async->add('payment_data', "user/{$user_id}/paymentMethod", [], function ($payment_method) {
                return $payment_method['method'];
            }, function ($e) {
                return $payment_data = [
                    'data' => [
                        'card_type' => '',
                        'card_number_masked' => '',
                        'card_cvv2_masked' => '',
                        'card_holder' => '',
                        'card_expires' => ''
                    ]
                ];
            });
            $async->add('num_recipes_to_rate', "/user/{$user_id}/ratings/count");
            extract($this->coreProvider()->asyncFetch($async));
            $order_count = array_get($order_count, 'data', $order_count);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            $error = $e->getDetails();
            switch ($error) {
                case 'Valid Token Required':
                    Sentry::forgetAccessToken(); // Log out user with broken token
                    return Redirect::to('/my-account'); // Forward to login prompt
                default:
                    // Respond with error code 500, let App::error handle it in global.php
                    App::abort(500);
            }
        }
        $first_box = false;
        if ($order_count && intval($order_count['committed']) === 0) {
            $first_box = true;
        }
        $pending_free_box_data = isset($user_data['pending_free_box_data']) ? $user_data['pending_free_box_data'] : null;
        if ($pending_free_box_data) {
            $pending_free_box_data['free_box_with_suffix'] = HTML::ordinal($pending_free_box_data['free_box_number']);
        }

        return View::make('pages.account.details', [
            'user' => $user_data['user'],
            'addresses' => $shipping_addresses,
            'shipping_addresses' => $shipping_addresses,
            'billing_address' => $user_data['user']['billing_address'],
            'payment_details' => $payment_data,
            'subscription' => $user_data['user']['subscription'],
            'balance' => $balance_data['balance'],
            'pending_free_box_data' => $pending_free_box_data,
            'first_box' => $first_box,
            'num_recipes_to_rate' => $num_recipes_to_rate,
            'user_token' => Sentry::getAccessToken(),
        ]);
    }

    public function create()
    {
        $data = GoustoCore::create(
            'user',
            [
                'email' => trim(Input::get('email')),
                'password' => Input::get('password'),
                'name_first' => trim(Input::get('name_first')),
                'name_last' => trim(Input::get('name_last')),
                'phone' => trim(Input::get('phone'))
            ]
        );

        return Response::json($data);
    }

    public function referrals()
    {
        try {
            $user_data = $this->coreProvider()->fetch('user/current');
            $user_referral = $this->coreProvider()->fetch('user/current/referralDetails');
            return View::make('pages.account.referrals', [
                'user' => $user_data['user'],
                'referral' => $user_referral['referral_count']
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            throw $e;
        }
    }

    public function referral($id)
    {
        if (Input::has('emails')) {
            try {
                GoustoCore::create(
                    'user/current/referral',
                    [
                        'emails' => Input::get('emails')
                    ]
                );
            } catch (GoustoCoreServiceErrorException $e) {
                Log::warning('Failed to send some referral emails: ' . $e->getDetails());
                // Silently catch the error.
            }
            $data = ['status' => 'ok'];
        } else {
            $data = GoustoCore::create(
                'user/current/referral',
                [
                    'email' => Input::get('friend-email'),
                    'name' => Input::get('friend-name')
                ]
            );
        }

        return Response::json($data);
    }

    /**
     * Cancel the users account. This uses a soft delete on the core, but the FE has no knowledge of this
     * so this should be a destroy function, in case, we decide to permanently delete in future
     * @param  int $id
     * @return Redirect
     */
    public function destroy($id)
    {
        // get the order for the last period if one exists
        try {
            $data = $this->coreProvider()->fetch("user/{$id}/orders", [
                'phases' => [
                    'cutoff',
                    'delivery',
                    'packing',
                    'picking'
                ]
            ]);
            $data = array_get($data, 'data', $data);
            $previous_order = array_pop($data);
        } catch (GoustoCoreServiceErrorException $e) {
            $previous_order = false;
        }
        // check the previous order has been delivered
        if (
            $previous_order &&
            Carbon::parse($previous_order['delivery_date']) <= Carbon::now()
        ) {
            $previous_order = false;
        }

        try {
            $response = $this->coreProvider()->destroy("user/{$id}");

            if ($response === 'user deleted') {
                Sentry::forget();
                return Redirect::to('/subscription-cancelled')->with('previous_order', $previous_order);
            } else {
                throw new Exception('Unknown error cancelling user');
            }
        } catch (Exception $e) {
            $error = $e->getMessage();
            Log::error($error);
            App::abort(500);
        }
    }

    public function adminRestore($id)
    {
        try {
            $response = GoustoCore::update('user/{user_id}/restore', ['user_id' => $id]);
            if ($response === 'user restored') {
                return Response::json(['result' => 'ok', 'data' => 'user-restored']);
            } else {
                throw new Exception('Failed to restore user from Core');
            }
        } catch (GoustoCoreServiceErrorException $e) {
            $error = $e->getDetails();
            Log::error($error);
            return Response::json(['result' => 'error', 'error' => $e->getMessage()]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::json(['result' => 'error', 'error' => $e->getMessage()]);
        }
    }

    public function cancelled()
    {
        $previous_order = Session::get('previous_order', false);
        return View::make('pages.cancelled')->with('previous_order', $previous_order);
    }

    public function oneClickReactivate($token)
    {
        $email = Input::get('email', '');
        $promo = Input::get('promo', '');
        try {
            $response = GoustoCore::update(
                '/reactivate/{token}?email=' . $email,
                [
                    'token' => $token,
                    'promo' => $promo
                ]
            );
            if ($response) {
                Sentry::setAccessToken($response['token']);
                Session::flash('one-click-reactivate', true);
                return Redirect::to('my-account');
            } else {
                throw new Exception('failed to get response from user reactivate');
            }
        } catch (GoustoCoreServiceErrorException $e) {
            $error = $e->getDetails();
            Log::error($error);
            App::abort(500);
        } catch (Exception $e) {
            $error = $e->getMessage();
            Log::error($error);
            App::abort(500);
        }
    }

    public function subscribe()
    {
        try {
            $inputs = [
                'email' => Input::get('email'),
                'password' => Input::get('checkoutpassword'),
                'title' => Input::get('title'),
                'name_first' => Input::get('fname'),
                'name_last' => Input::get('lname'),
                'phone' => Input::get('phone'),

                'deliverycompanyname' => Input::get('deliverycompanyname'),
                'deliveryaddress1' => Input::get('deliveryaddress1'),
                'deliveryaddress2' => Input::get('deliveryaddress2'),
                'deliveryaddress3' => Input::get('deliveryaddress3'),
                'deliverytown' => Input::get('deliverytown'),
                'deliverycounty' => Input::get('deliverycounty'),
                'deliverypostcode' => Input::get('deliverypostcode'),

                'billingaddresstoggle' => Input::get('billingaddresstoggle'),

                'promocode' => Input::get('promocode'),

                'order_id' => Input::get('order_id'),
                'tariff_id' => Input::get('tariff_id', null)
            ];

            $deliver_to = Input::get('deliver-to');
            $delivery_name = null;
            switch ($deliver_to) {
                case 'home':
                case 'work':
                    $delivery_name = ucfirst($deliver_to);
                    break;
                case 'other':
                    $delivery_name = ucfirst(Input::get('addressType'));
                    break;
            }
            if (!empty($delivery_name)) {
                $inputs['deliveryname'] = $delivery_name;
            }

            $inputs['deliveryinstruction'] = Input::get('deliveryinstruction');
            switch ($inputs['deliveryinstruction']) {
                case 'Neighbour':
                    $inputs['deliveryinstruction'] = 'Neighbour: ' .
                        Input::get('delivery_instructions_custom');
                    break;
                case 'Other':
                    $inputs['deliveryinstruction'] = Input::get('delivery_instructions_custom');
                    break;
                default:
                    break;
            }

            $rules = [
                'email' => 'required',
                'password' => 'required',
                'title'	=> 'required|in:'. implode(',', array_keys(Info::get('salutation'))),
                'name_first' => 'required',
                'name_last' => 'required',
                'phone' => 'required',

                'deliverycompanyname' => '',
                'deliveryaddress1' => 'required',
                'deliveryaddress2' => '',
                'deliveryaddress3' => '',
                'deliverytown' => 'required',
                'deliverycounty' => '',
                'deliverypostcode' => 'required',
                'deliveryinstruction' => 'required',

                'order_id' => 'required'
            ];

            if (Input::get('billingaddresstoggle') !== 'hidebillingaddress') {
                $inputs['billingcompanyname'] = Input::get('billingcompanyname');
                $inputs['billingaddress1'] = Input::get('billingaddress1');
                $inputs['billingaddress2'] = Input::get('billingaddress2');
                $inputs['billingaddress3'] = Input::get('billingaddress3');
                $inputs['billingtown'] = Input::get('billingtown');
                $inputs['billingcounty'] = Input::get('billingcounty');
                $inputs['billingpostcode'] = Input::get('billingpostcode');
            }

            $validator = Validator::make($inputs, $rules);

            $validator->sometimes(
                [
                    'billingaddress1',
                    'billingtown',
                    'billingpostcode'
                ],
                'required',
                function ($input) {
                    return $input->billingaddresstoggle !== 'hidebillingaddress';
                }
            );

            if ($validator->fails()) {
                Log::error($validator->messages());
                Log::error('User registration validator failed');
                // This is not good UX, we should be showing the error on the form, but there is no
                // way to do that currently.
                return Response::json([
                    'status' => 'error',
                    'error' => $validator->messages()
                ]);
            }

            $payment_inputs = [
                'payment_type' => 'card',
                'card_type' => Input::get('cardtype'),
                'card_number' => Input::get('cardnumber'),
                'card_cvv2' => Input::get('cv2'),
                'card_holder' => Input::get('nameoncard'),
                'card_expires' => Input::get('expirymonth') . Input::get('expiryyear'),
            ];

            $payment_rules = [
                'payment_type' => 'required',
                'card_type' => 'required|in:MC,MCDEBIT,VISA,DELTA,UKE,MAESTRO',
                'card_number' => 'required',
                'card_cvv2' => 'required',
                'card_holder' => 'required',
                'card_expires' => 'required'
            ];

            $validator = Validator::make($payment_inputs, $payment_rules);

            if ($validator->fails()) {
                Log::error($validator->messages());
                Log::error('User registration payment details validator failed');
                return Response::json([
                    'status' => 'error',
                    'error' => [
                        'code' => 'payment-failure',
                        'message' => 'Payment details failed validation'
                    ]
                ]);
            }
            try {
                $result = GoustoCore::create('user', $inputs + $payment_inputs);
            } catch (GoustoCoreServiceErrorException $e) {
                Log::warning($e);
                return Response::json([
                    'status' => 'error',
                    'error' => [
                        'code' => 'payment-failure',
                    ]
                ]);
            }

            GoustoCore::login($inputs['email'], $inputs['password']);
            Sentry::setAccessToken(GoustoCore::getToken());
            $refresh_token = GoustoCore::getRefreshToken();
            if (!empty($refresh_token)) {
                Sentry::setRefreshToken($refresh_token, false);
            }
            $order_id = Input::get('order_id');

            $this->applyAgeVerification();
            $optm_url = Input::get('optm_url');
            $welcome_page = '/welcome-to-gousto/' . ($optm_url ? "{$optm_url}/" : '') . $order_id;

            return Response::json([
                'status' => 'ok',
                'data' => $result,
                'promo_code' => $inputs['promocode'],
                'redirect-url' => $welcome_page,
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            $error = $e->getErrorDetails();
            Log::error($e);
            if (isset($error['code'])) {
                switch ($error['code']) {
                    case 'user-exists':
                        return Response::json([
                            'status' => 'error',
                            'error' => 'You are already registered, please login'
                        ]);
                    case 'payment-failure':
                        return Response::json([
                            'status' => 'error',
                            'error' => $error
                        ]);
                    default:
                        return Response::json([
                            'status' => 'error',
                            'error' => 'Gousto core reported a problem processing payment'
                        ]);
                }
            }

            return Response::json([
                'status' => 'error',
                'error' => 'Gousto core reported a problem'
            ]);
        }

        return Response::json(['status' => 'ok']);
    }

    public function applyPromotionRule($id)
    {
        try {
            $slug = Input::get('slug');
            $reason = Input::get('reason', null);

            if ($slug == 'friends-family') {
                $slug = Config::get('promotion.friends_family');
                $email = Input::get('friends-family-email');

                $input = ['email' => $email];
                $rule = [
                    'email' => ['required', 'email', 'regex:/[a-zA-Z0-9._%+-]+@gousto\.co\.uk/']
                ];

                $validator = Validator::make($input, $rule);

                if ($validator->passes()) {
                    $reason = 'friends-and-family ' . $email;
                } else {
                    return Response::json([
                        'status' => 'error',
                        'error' => 'Not a valid Gousto email address'
                    ]);
                }
            }

            $response = $this->coreProvider()->create("user/$id/applyPromotionRule", ['slug' => $slug, 'reason' => $reason]);

            return Response::json($response);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails()
            ]);
        }
    }

    public function applyPromotionCode($user_id)
    {
        $code = Input::get('promo_code');

        try {
            $this->coreProvider()->create('/user/' . $user_id . '/applyPromotionCode/' . $code);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::warning($e);
            return Response::json([
                'status' => 'error',
                'error' => 'Failed to apply promotion to user'
            ]);
        }
        return Response::json([
            'status' => 'ok',
            'data' => 'Promotion applied'
        ]);
    }

    public function isUniqueEmail()
    {
        try {
            $data = $this->coreProvider()->fetch('/user/validateEmail', ['email' => Input::get('email')]);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails(),
                'error-details' => $e->getErrorDetails()
            ]);
        }
        return Response::json($data);
    }

    public function setDefaultShippingAddress($user_id, $address_id)
    {
        try {
            $this->coreProvider()->update('/user/' . $user_id . '/changeDefaultAddress', ['address_id' => $address_id]);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails()
            ]);
        }
        return Response::json([
            'status' => 'ok',
            'data' => View::make('pages.account.modals.change-default-address-modal-body', [
                'user_id' => $user_id,
                'address_id' => $address_id
            ])->render()
        ]);
    }

    public function addAddress($user_id)
    {
        $type = Input::get('type', 'shipping');
        $input = Input::only(
            'name',
            'companyname',
            'line1',
            'line2',
            'line3',
            'town',
            'county',
            'postcode',
            'delivery_instructions',
            'state'
        );
        $delivery_instructions = Input::get('delivery_instructions');
        switch ($delivery_instructions) {
            case 'Neighbour':
                $input['delivery_instructions'] = 'Neighbour: ' .
                    Input::get('delivery_instructions_custom');
                break;
            case 'Other':
                $input['delivery_instructions'] = Input::get('delivery_instructions_custom');
                break;
            default:
                break;
        }
        $fields = array_merge($input, [
            'type' => $type,
            'country' => 'GB',
        ]);
        try {
            $response = $this->coreProvider()->create('user/' . $user_id . '/address/' . $type, $fields);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails()
            ]);
        }

        return Response::json($response);
    }

    public function updateAddress($user_id, $address_id)
    {
        try {
            $delivery_instructions = Input::get('delivery_instructions');
            switch ($delivery_instructions) {
                case 'Neighbour':
                    $delivery_instructions = 'Neighbour: ' . Input::get('delivery_instructions_custom');
                    break;
                case 'Other':
                    $delivery_instructions = Input::get('delivery_instructions_custom');
                    break;
                default:
                    break;
            }
            $data = $this->coreProvider()->update(
                'user/' . $user_id . '/address/' . $address_id,
                [
                    'companyname' => Input::get('companyname'),
                    'name' => Input::get('name'),
                    'line1' => Input::get('line1'),
                    'line2' => Input::get('line2'),
                    'line3' => Input::get('line3'),
                    'town' => Input::get('town'),
                    'country' => 'GB',
                    'county' => Input::get('county'),
                    'postcode' => Input::get('postcode'),
                    'delivery_instructions' => $delivery_instructions,
                    'state' => Input::get('state')
                ]
            );
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails()
            ]);
        }

        return Response::json($data);
    }

    public function deleteAddress($user_id, $address_id)
    {
        try {
            $response = $this->coreProvider()->destroy('user/' . $user_id . '/address/' . $address_id);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails()
            ]);
        }

        return Response::json($response);
    }

    public function showRecipeRatings()
    {
        $orders_data = $this->coreProvider()->fetch('user/current/ratings');
        $user_data = $this->coreProvider()->fetch('user/current');
        $recipes_to_rate_count = 0;
        $orders_to_rate_count = 0;
        $orders = [];
        foreach ($orders_data['orders_to_rate'] as $order_id => $order) {
            $order_ratings = [];
            $recipes = [];
            foreach ($order['recipes'] as $recipe) {
                $recipe_id = $recipe['recipe_id'];
                // Only show a recipe once per order
                if (!isset($recipes[$recipe_id])) {
                    $recipe_with_rating = [
                        'title' => $recipe['title']
                    ];
                    if (isset($order['ratings'][$recipe_id])) {
                        $rating = $order['ratings'][$recipe_id];
                        $recipe_with_rating['rating'] = $rating['rating'];
                        $recipe_with_rating['comment'] = $rating['comment'];
                    } else {
                        $recipes_to_rate_count++;
                    }
                    $recipes[$recipe_id] = $recipe_with_rating;
                }
            }
            $order['recipes'] = $recipes;
            $order['num_unique_recipes'] = count($order['recipes']);
            $orders[$order_id] = $order;
            if ($recipes_to_rate_count > 0) {
                $orders_to_rate_count++;
            }
        }
        return View::make('pages.account.ratings', [
            'user' => $user_data['user'],
            'orders' => $orders,
            'num_orders_to_rate' => $orders_to_rate_count,
            'num_recipes_to_rate' => $recipes_to_rate_count,
            'meanings' => Config::get('ratings.meanings'),
        ]);
    }

    public function checkDuplicate()
    {
        try {
            $response = $this->coreProvider()->create('/user/check-duplicate', Input::all());
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails()
            ]);
        }
        return Response::json([
            'status' => 'ok',
            'data'   => $response
        ]);
    }

    public function cancelAllPendingOrders()
    {
        try {
            $response = $this->coreProvider()->create('/user/current/cancel-pending-orders');
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails()
            ]);
        }
        return Response::json([
            'status' => 'ok',
            'data' => $response
        ]);
    }

    private function applyAgeVerification()
    {
        try {
            if (Session::has('age_verified')) {
                $this->coreProvider()->update("user/current", [
                    'age_verified' => 1
                ]);
                Session::forget('age_verified');
            }
        } catch (Exception $e) {
            Log::error($e);
        }
    }

    private function getPendingFreeBoxData($user_data)
    {
        if (!array_key_exists('pending_free_box_data', $user_data)) {
            throw new GoustoCoreServiceErrorException([
                'error' => 'User pending free box data missing.',
            ]);
        }
        $pending_free_box_data = $user_data['pending_free_box_data'];
        $pending_free_box_data['free_box_with_suffix'] = HTML::ordinal($pending_free_box_data['free_box_number']);
        return $pending_free_box_data;
    }

    private function determineFreeBoxWithSuffixText($boxes_until_free, $free_box_with_suffix)
    {
        return (int) $boxes_until_free < 1 ? 'upcoming' : (string) $free_box_with_suffix;
    }
}
