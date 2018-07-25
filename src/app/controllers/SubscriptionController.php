<?php

use Carbon\Carbon;
use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class SubscriptionController extends BaseController
{
    protected $user_view_root = 'pages.account';
    protected $admin_view_root = 'cms.account';

    public function show($user_id = 'current')
    {
        $async = new GoustoAsync;
        try {
            $async->add('subscription', "user/{$user_id}/subscription");
            $async->add('user', "user/{$user_id}");
            $async->add('prices', "boxPrices");
            $async->add('delivery_slots', "delivery_slots");
            $async->add('delivery_days', 'delivery_days', ['filters' => ['projected' => true], 'includes' => ['delivery_slots']]);
            $async->add('num_recipes_to_rate', "/user/current/ratings/count");
            $async->add('payment_method', "user/current/paymentMethod", [], null, function ($e) {
                return [];
            });
            extract($this->coreProvider()->asyncFetch($async));
            $data = compact('prices', 'delivery_slots', 'delivery_days', 'num_recipes_to_rate', 'payment_method');
            $data = array_merge($data, $subscription, $user);

            $data['reactivate_banner'] = true;
            $data['reactivate_period'] = 'indefinitely';
            $data['user_token'] = Sentry::getAccessToken();
            if ($data['subscription']['state'] === 'active') {
                $pause_date = Carbon::parse($data['subscription']['pause_date']);
                $now = Carbon::now();
                if ($pause_date->gt($now)) {
                    $data['reactivate_period'] = 'for ' . $pause_date->diffForHumans($now, true);
                } else {
                    $data['reactivate_banner'] = false;
                }
            }
            return $this->viewMaker('subscription', $data);
        } catch (Exception $e) {
            // App::abort(500);
            throw $e;
        }
    }

    protected function isXmasDate($date)
    {
        return $date >= Config::get('deliveries.xmas_start') && $date <= Config::get('deliveries.xmas_end');
    }

    public function skipChristmas($user_id = 'current')
    {
        try {
            $async = new GoustoAsync;
            $async->add('subscription', "user/{$user_id}/subscription");
            $async->add('orders', "user/current/orders", [
                'phases' => [
                    'open',
                    'awaiting_choices',
                    'pre_menu'
                ]
            ]);
            extract($this->coreProvider()->asyncFetch($async));
            $orders = array_get($orders, 'data', $orders);
            $days = $subscription['projected'];
            foreach ($days as $day) {
                if ($this->isXmasDate($day['date'])) {
                    $this->coreProvider()->update("user/{$user_id}/subscription/delivery/disable", ['delivery_day_id' => $day['id']]);
                }
            }
            foreach ($orders as $order) {
                if ($this->isXmasDate($order['delivery_date'])) {
                    $this->coreProvider()->destroy("order/{$order['id']}");
                }
            }
        } catch (Exception $e) {
            \Log::error($e);
            return Response::json([
                'status' => 'error',
            ]);
        }
        return Response::json([
            'status' => 'ok',
            'data' => [
                'redirect_url' => URL::route('my-deliveries')
            ]
        ]);
    }

    public function update($user_id = 'current')
    {
        try {
            $input = Input::only(
                'num_portions',
                'num_recipes',
                'box_type',
                'delivery_slot_id',
                'next_delivery_week_id',
                'interval'
            );
            $status = $this->coreProvider()->update("user/{$user_id}/subscription", $input);
            $orders_data = $this->ordersData();
            return Response::json([
                'status' => 'ok',
                'data' => [
                    'showModal' => !(empty($orders_data['open_orders_data'])),
                    'newModal' => View::make('pages.account.modals.subscription-update-success', $orders_data)->render()
                ]
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
            ]);
        }
    }

    public function activate($user_id = 'current')
    {
        try {
            $status = $this->coreProvider()->update("user/{$user_id}/subscription/activate");
            $async = new GoustoAsync;
            $async->add('subscription_data', "user/{$user_id}/subscription");
            $async->add('user_orders', "/user/{$user_id}/orders", ['state' => 'open', 'phases' => 'awaiting_choices', 'sort' => 'delivery_date']);
            extract($this->coreProvider()->asyncFetch($async));
            $user_orders = array_get($user_orders, 'data', $user_orders);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'data' => [
                    'newModal' => View::make('pages.account.modals.subscription-activate-error')->render()
                ]
            ]);
        }
        if (isset($subscription_data['subscription']['interval'])) {
            switch ($subscription_data['subscription']['interval']) {
                case 1:
                    $subscription_data['subscription']['interval'] = 'weekly';
                    break;
                case 2:
                    $subscription_data['subscription']['interval'] = 'biweekly';
                    break;
                case 4:
                    $subscription_data['subscription']['interval'] = 'monthly';
                    break;
            }
        }
        if (!empty($user_orders) && count($user_orders) > 0) {
            $subscription_data['next_pending_delivery_date'] = Carbon::parse($user_orders[0]['delivery_date'])->format('l jS F Y');
            foreach ($user_orders as $order) {
                $subscription_data['pending_order_id'] = '';
                if (!$order['is_current_period'] && $order['state'] === 'pending' && $order['default'] === '1') {
                    $subscription_data['pending_order_id'] = $order['id'];
                }
            }
        } else {
            $subscription_data['next_pending_delivery_date'] = Carbon::parse($subscription_data['projected'][0]['date'])->format('l jS F Y');
            $subscription_data['pending_order_id'] = '';
        }
        return Response::json([
            'status' => 'ok',
            'data' => [
                'showModal' => (isset($subscription_data['subscription']) && isset($subscription_data['box'])),
                'newModal' => View::make('pages.account.modals.subscription-activate-success', $subscription_data)->render(),
            ]
        ]);
    }

    public function deactivate($user_id = 'current')
    {
        $input = Input::all();
        try {
            $status = $this->coreProvider()->update("user/{$user_id}/subscription/deactivate", ['state_reason' => $input['hold_reason']]);
            $orders_data = $this->ordersData();
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'data' => [
                    'newModal' => View::make('pages.account.modals.hold-modal-error')->render()
                ]
            ]);
        }
        return Response::json([
            'status' => 'ok',
            'data' => [
                'showModal' => !(empty($orders_data['open_orders_data']) && empty($orders_data['cutoff_orders_data'])),
                'newModal' => View::make('pages.account.modals.hold-modal-success', $orders_data)->render(),
            ]
        ]);
    }

    public function ordersData()
    {
        $async = new GoustoAsync;
        $async->add('open_orders_data', "user/current/orders", [
            'phases' => [
                'open'
            ]
        ]);
        $async->add('cutoff_orders_data', "user/current/orders", [
            'phases' => [
                'cutoff',
                'delivery',
                'packing',
                'picking'
            ]
        ]);
        extract($this->coreProvider()->asyncFetch($async));
        $open_orders_data = array_get($open_orders_data, 'data', $open_orders_data);
        $cutoff_orders_data = array_get($cutoff_orders_data, 'data', $cutoff_orders_data);
        return ['open_orders_data' => $open_orders_data, 'cutoff_orders_data' => $cutoff_orders_data];
    }

    public function enableProjectedDelivery($user_id, $delivery_day_id)
    {
        try {
            $success = $this->coreProvider()->update("user/{$user_id}/subscription/delivery/enable", ['delivery_day_id' => $delivery_day_id]);
            return Response::json([
                'status' => 'ok'
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails()
            ]);
        }
    }

    public function disableProjectedDelivery($user_id, $delivery_day_id)
    {
        try {
            $this->coreProvider()->update("user/{$user_id}/subscription/delivery/disable", ['delivery_day_id' => $delivery_day_id]);
            return Response::json([
                'status' => 'ok'
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'error' => $e->getDetails()
            ]);
        }
    }

    public function onHold($id)
    {
        $input = Input::only(
            'hold_length',
            'hold_reason'
        );
        $rules = [
            'hold_length' => 'required|in:' . implode(',', array_keys(Info::get('holdlength'))),
            'hold_reason' => 'required|in:' . implode(',', array_keys(Info::get('holdreason'))),
        ];
        $validator = Validator::make($input, $rules);
        if ($validator->fails()) {
            return Response::json([
                'status' => 'error',
                'data' => [
                    'newModal' => View::make('pages.account.modals.hold-modal-error')->render()
                ]
            ]);
        }
        try {
            $data = GoustoCore::update(
                'user/' . $id . '/subscription-on-hold',
                [
                    'hold_length' => $input['hold_length'],
                    'hold_reason' => $input['hold_reason'],
                ]
            );
            $orders_data = $this->ordersData();
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'data' => [
                    'newModal' => View::make('pages.account.modals.hold-modal-error')->render()
                ]
            ]);
        }
        $next_delivery_date = ($data['next_delivery_day']) ? Carbon::createFromFormat('Y-m-d H:i:s', $data['next_delivery_day']['date'])->format('l \t\h\e jS \o\f F') : false;
        $details = [
            'next_delivery_date' => $next_delivery_date,
            'hold_length' => strtolower(Info::get('holdlength')[$input['hold_length']])
        ];
        return Response::json([
            'status' => 'ok',
            'data' => [
                'next_delivery_week_id' => $data['next_delivery_day']['delivery_week_id'],
                'details' => $details,
                'showModal' => !(empty($orders_data['open_orders_data']) && empty($orders_data['cutoff_orders_data'])),
                'newModal' => View::make('pages.account.modals.hold-modal-success', $orders_data)->render()
            ]
        ]);
    }

    /** THE BELOW METHODS NEED TO BE MOVED OR DELETED */

    // move to the user controller
    public function cancel($id)
    {
        try {
            $user = GoustoCore::fetch('user/current');
        } catch (GoustoCoreServiceErrorException $e) {
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
        $pending_free_box_data = isset($user['pending_free_box_data']) ? $user['pending_free_box_data'] : null;
        if ($pending_free_box_data) {
            $pending_free_box_data += ['free_box_with_suffix' => HTML::ordinal($pending_free_box_data['free_box_number'])];
        }
        return View::make('pages.cancel')->with([
            'user_id' => $id,
            'pending_free_box_data' => $pending_free_box_data
        ]);
    }

    // do we even use this?
    public function updateCurrentAccount()
    {
        try {
            $data = GoustoCore::update(
                'user/current',
                [
                    'email' => Input::get('email'),
                    'name_first' => Input::get('name_first'),
                    'name_last' => Input::get('name_last'),
                    'phone' => Input::get('phone'),
                    'marketing_source' => Input::get('source'),
                ]
            );
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json(
                [
                    'status' => 'error',
                    'error' => $e->getDetails(),
                ]
            );
        }
        return Response::json($data);
    }
}
