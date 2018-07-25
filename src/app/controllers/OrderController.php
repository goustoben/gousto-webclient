<?php

use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class OrderController extends BaseController
{
    public function checkout($replay = false)
    {
        $simplePage = true;
        $order_id = Input::get('order_id', Input::get('current_order_id', null));

        $input = Input::only([
            'recipes',
            'num_portions',
            'delivery_day_id',
            'delivery_slot_id',
            'deliverypostcode',
            'address_id',
            'order_action'
        ]);

        $rules = [
            'recipes' => 'required|array',
            'num_portions' => 'required|numeric|in:2,4,8',
            'delivery_day_id' => 'required|numeric',
            'delivery_slot_id' => 'required|numeric',
        ];

        $validator = Validator::make($input, $rules);

        if ($validator->fails()) {
            Log::warning($validator->errors());
            Log::warning(print_r($input, true));
            if ($order_id && $replay === false) {
                try {
                    $order_data = GoustoCore::fetch('/order/'. $order_id);
                    $recipes = [];
                    $num_portions = 0;
                    foreach ($order_data['recipe_items'] as $recipe_item) {
                        $recipes[] = $recipe_item['itemable_id'];
                        $num_portions = $recipe_item['quantity'];
                    }
                    Input::merge([
                        'recipes' => $recipes,
                        'num_portions' => $num_portions,
                        'delivery_day_id' => $order_data['delivery_day_id'],
                        'delivery_slot_id' => $order_data['delivery_slot_id']
                    ]);
                    return $this->checkout(true);
                } catch (Exception $e) {
                    Log::error($e->getMessage());
                }
            }
            return Redirect::to('/this-weeks-recipes')->with(
                'error',
                'There was an internal error processing the recipe selection form, please contact customer care'
            );
        }

        $recipe_choices = [];
        foreach ($input['recipes'] as $recipe_id) {
            $recipe_choices[] = [
                'type' => 'Recipe',
                'id'   => $recipe_id,
                'quantity' => $input['num_portions']
            ];
        }

        $delivery_day_id = $input['delivery_day_id'];
        $delivery_slot_id = $input['delivery_slot_id'];

        $tariff_id = Input::get('tariff_id', null);
        $promo_code = Input::get('promo_code', null);
        $preview = $this->createPreviewOrder($delivery_day_id, $delivery_slot_id, $recipe_choices, $order_id, $promo_code, $tariff_id);

        if ($preview instanceof Response || $preview instanceof Illuminate\Http\RedirectResponse) {
            return $preview;
        }

        $logged_in = (Sentry::isLoggedIn() && Sentry::identify());

        if ($logged_in) {
            try {
                $user = GoustoCore::fetch('user/current');
                $user_id = $user['user']['id'];

                if ($user['user']['status'] === 'onhold') {
                    return Redirect::to('/my-gousto#');
                }
            } catch (GoustoCoreServiceErrorException $e) {
                Log::error("Failed to get logged in user");
                $error = $e->getDetails();
                switch ($error) {
                    case 'Valid Token Required':
                        Sentry::forgetAccessToken(); // Log out user with broken token
                        return Redirect::to('/my-account'); // Forward to login prompt
                    default:
                        App::abort(500); // Respond with error code 500, let App::error handle it in global.php
                }
            }
            $address_id = null;
            if (!empty($input['address_id'])) {
                $address_id = $input['address_id'];
            }
            $order_action = "";
            if (!empty($input['order_action'])) {
                $order_action = $input['order_action'];
            }
            return $this->assignOrderToUser($preview['order']['id'], $address_id, $order_action);
        }

        $recipes = [];
        foreach ($recipe_choices as $recipe_choice) {
            $recipe = GoustoCore::fetch('recipe/' . $recipe_choice['id']);
            array_push($recipes, $recipe);
        }

        if (!$logged_in && !Input::has('order_id')) {
            Session::push('order_ids', $preview['order']['id']);
        }

        $when_cutoff = Input::get('when_cutoff', false);

        $query_string = '?' . implode('&', array_map(function ($recipe) {
            return 'recipe_ids[]=' . $recipe['id'];
        }, $recipes));
        $query_string .= '&num_portions=' . $input['num_portions'];
        $query_string .= '&day=' . $input['delivery_day_id'];
        return View::make('pages.checkout.container', [
            'preview' => $preview,
            'recipes' => $recipes,
            'num_portions' => $input['num_portions'],
            'delivery_day_id' => $input['delivery_day_id'],
            'deliverypostcode' => $input['deliverypostcode'],
            'when_cutoff' => $when_cutoff,
            'twr_url' => URL::route('menu') . $query_string,
            'simplePage' => $simplePage
        ]);
    }

    protected function createPreviewOrder($delivery_day_id, $delivery_slot_id, $recipe_choices, $order_id = null, $promo_code = null, $tariff_id = null)
    {
        $data = [
            'delivery_day_id' => $delivery_day_id,
            'delivery_slot_id' => $delivery_slot_id,
            'recipe_choices' => $recipe_choices,
        ];

        if ($order_id) {
            $data['order_id'] = $order_id;
        }

        if ($promo_code) {
            $data['promo_code'] = $promo_code;
        }

        if ($tariff_id) {
            $data['tariff_id'] = $tariff_id;
        }

        try {
            $preview = GoustoCore::create('/order/preview', $data);
            return $preview;
        } catch (GoustoCoreServiceErrorException $e) {
            $error = $e->getMessage();
            Log::error($error);
            $code = $e->getErrorCode();
            if ($code === 'out-of-stock') {
                $details = $e->getErrorDetails();
                $out_of_stock = [];
                if (isset($details['items'])) {
                    $out_of_stock = $details['items'];
                }
                return Redirect::to('menu?error=no-stock');
            }
        }
    }

    protected function assignOrderToUser($order_id, $address_id = null, $order_action = "")
    {
        try {
            $data = GoustoCore::update('/user/current/order', [
                'order_id' => $order_id
            ]);
            $order_id = $data['id'];
            if ($address_id) {
                $this->coreProvider()->update(
                    '/order/' . $order_id . '/change-address',
                    ['address_id' => $address_id]
                );
            }
        } catch (Gousto\ApiClient\Exceptions\PaymentRequiredException $e) {
            Log::warning($e);
            return Redirect::to('menu?error=payment-required');
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e->getMessage());
            $code = $e->getErrorCode();
            if ($code === 'out-of-stock') {
                return Redirect::to('menu?error=no-stock');
            } else {
                Log::critical($e->getMessage());
                App::abort(500); // Respond with error code 500, let App::error handle it in global.php
            }
        } catch (Exception $e) {
            Log::critical($e->getMessage());
            App::abort(500); // Respond with error code 500, let App::error handle it in global.php
        }

        $url = \URL::route('order.summary', [
            'order_id' => $order_id,
            'order_action' => $order_action
        ]);
        return Redirect::to($url . '#');
    }

    public function summary($order_id)
    {
        try {
            $order = GoustoCore::fetch("/order/{$order_id}", ['includes' => 'shipping_address']);
            if ($order['default'] === '1') {
                return Redirect::route('my-deliveries');
            }
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            return Redirect::to('/my-account');
        }

        try {
            $user = GoustoCore::fetch('user/current');
            $next_delivery_date = false;
        } catch (GoustoCoreServiceErrorException $e) {
            $user = [];
        }

        // Set bootstrap classes to display recipes
        $num_meals = count($order['recipe_items']);
        switch ($num_meals) {
            case 2:
                $recipe_display_data = [
                    'outer_width' => 'col-md-6',
                    'offset' => 'col-md-offset-3',
                    'sticker_width' => 'col-sm-6'
                ];
                break;
            case 3:
                $recipe_display_data = [
                    'outer_width' => 'col-md-8',
                    'offset' => 'col-md-offset-2',
                    'sticker_width' => 'col-sm-4'
                ];
                break;
            case 4:
                $recipe_display_data = [
                    'outer_width' => 'col-md-10',
                    'offset' => 'col-md-offset-1',
                    'sticker_width' => 'col-sm-3'
                ];
                break;
            default:
                $recipe_display_data = [
                    'outer_width' => 'col-md-10',
                    'offset' => 'col-md-offset-1',
                    'sticker_width' => 'col-sm-3'
                ];
                break;
        }
        $status = (isset($user['subscription']['state']['slug'])) ? $user['subscription']['state']['slug'] : 'inactive';
        $referrer = Request::header('referer');
        $from_twr = preg_match("/(menu|checkout|check-out)/", $referrer);

        PromoCode::deleteCookie();
        PersistentBasket::deleteCookies();

        return View::make('pages.confirmation.summary', [
            'order' => $order,
            'user' => $user,
            'recipe_display_data' =>  $recipe_display_data,
            'pending_free_box_data' => isset($user['pending_free_box_data']) ? $user['pending_free_box_data'] : null,
            'status' => $status,
            'next_delivery_date' => $next_delivery_date,
            'product_limit' => Config::get('product.box_limit'),
            'from_twr' => $from_twr
        ]);
    }

    public function addProduct($order_id)
    {
        $input = Input::all();

        $rules = [
            'product_id' => 'required',
            'quantity' => 'numeric|min:1'
        ];

        $validator = Validator::make($input, $rules);

        $messages = $validator->messages()->toArray();

        if ($validator->fails()) {
            return Response::json([
                'status' => 'error',
                'error' => $messages
            ]);
        }
        try {
            $data = GoustoCore::create('/order/' . $order_id . '/addProduct', $input);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'error' => 'Error updating product items, Input: ' . $input['product_id'] . ', error: ' . $e->getMessage()
            ]);
        }

        $item = false;
        foreach ($data['product_items'] as $product_item) {
            if ($product_item['itemable_id'] === $input['product_id']) {
                $item = $product_item;
            }
        }

        if (!$item) {
            return Response::json([
                'status' => 'error',
                'error' => 'Core failed to return the item: ' . $input['product_id']
            ]);
        }

        return Response::json([
            'status' => 'ok',
            'data' => $item
        ]);
    }

    public function removeProduct($order_id)
    {
        $input = Input::all();

        $rules = [
            'product_id' => 'required',
            'quantity' => 'numeric|min:1'
        ];

        $validator = Validator::make($input, $rules);

        $messages = $validator->messages()->toArray();

        if ($validator->fails()) {
            return Response::json([
                'status' => 'error',
                'error' => $messages
            ]);
        }

        try {
            $data = GoustoCore::create('/order/' . $order_id . '/removeProduct', $input);
        } catch (GoustoCoreServiceErrorException $e) {
            return Response::json([
                'status' => 'error',
                'error' => 'Error updating product items, Input: ' . $input['product_id'] . ', error: ' . $e->getMessage()
            ]);
        }

        $item = false;
        foreach ($data['product_items'] as $product_item) {
            if ($product_item['itemable_id'] === $input['product_id']) {
                $item = $product_item;
            }
        }

        if (!$item) {
            $item = [
                'productId' => $input['product_id'],
                'quantity' => 0
            ];
        }

        return Response::json([
            'status' => 'ok',
            'data' => $item
        ]);
    }

    public function updateProducts($order_id)
    {
        try {
            $selected_products = Input::get('selected_products', []);
            if (!is_array($selected_products)) {
                throw new Exception("Selected products should be an array");
            }
            $product_choices = [];
            foreach ($selected_products as $index => $selected_product) {
                if (!isset($selected_product['id']) || !isset($selected_product['quantity'])) {
                    throw new Exception("Missing id or quantity for selected product {$index}");
                }
                $product_choices[] = [
                    'type' => 'Product',
                    'id' => $selected_product['id'],
                    'quantity' => $selected_product['quantity'],
                ];
            }
            Session::flash('edited_order_id', $order_id);
            $data = $this->coreProvider()->update("order/{$order_id}/updateProducts", ['product_choices' => $product_choices]);
            return Response::json([
                'status' => 'ok',
                'data' => [
                    'order' => $data,
                    'redirect_url' => URL::route('my-deliveries')
                ]
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            $result = [];
            preg_match("/Product\ (\d+)\ Out\ of\ stock/", $e->getDetails(), $result);
            if (count($result) > 1) {
                $out_of_stock_ids = [];
                for ($i = 1; $i < count($result); $i++) {
                    $out_of_stock_ids[] = $result[$i];
                }
                return Response::json([
                    'status' => 'out_of_stock',
                    'data' => $out_of_stock_ids
                ]);
            }
            Log::error($e->getMessage());
            return Response::json([
                'status' => 'error',
                'data' => $e->getMessage()
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::json([
                'status' => 'error',
                'data' => $e->getMessage()
            ]);
        }
    }

    public function changeAddress($order_id, $address_id)
    {
        try {
            $response = $this->coreProvider()->update(
                '/order/' . $order_id . '/change-address',
                ['address_id' => $address_id]
            );
            return Response::json([
                'status' => 'ok',
                'data' => $response
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            return Response::json([
                'status' => 'error',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function preview()
    {
        $data = null;
        try {
            if (!is_null(Session::get('order_ids')) && in_array((int) Input::get('order_id'), Session::get('order_ids'))) {
                $preview_data = GoustoCore::create(
                    '/order/preview',
                    array_merge(
                    [
                        'order_id' => Input::get('order_id'),
                        'promocode' => Input::get('promocode'),
                        'delivery_slot_id' => Input::get('delivery_slot_id'),
                        'tariff_id' => Input::get('tariff_id', null),
                    ]
                )
                );
                $data = [
                    'discount' => $preview_data['prices']['recipe_discount'],
                    'total' => $preview_data['prices']['total'],
                    'price_per_portion_discounted' => $preview_data['prices']['price_per_portion_discounted'],
                    'can_apply_promotion_code' => $preview_data['error_code'] ? false : true,
                    'delivery_total' => $preview_data['prices']['delivery_total']
                ];
                return Response::json($data);
            } else {
                throw new Exception('Order id from Input (' . Input::get('order_id', '[not sent]') . ') could not be found in Session.order_ids');
            }
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e->getMessage());
            return Response::json($data);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::json([
                'status' => 'error',
                'errors' => [
                    [
                        'error' => 'session-timeout',
                        'message' => 'This order cannot be changed'
                    ]
                ]
            ], 422);
        }
    }

    public function cancel($order_id)
    {
        try {
            $data = $this->coreProvider()->destroy("order/{$order_id}");
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
        }
        return Redirect::route('my-deliveries');
    }

    public function adminCancel($id, $order_id)
    {
        try {
            $data = $this->coreProvider()->destroy("order/{$order_id}");
            return Redirect::route('admin.user.edit', [$id]);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e->getMessage());
            throw $e;
        }
    }

    public function adminCreateOrder($user_id)
    {
        $input = Input::only([
            'delivery_day_id',
            'selectedrecipes',
            'num_portions'
        ]);

        $recipes = [];
        foreach ($input['selectedrecipes'] as $recipe) {
            $recipes[] = [
                'type' => 'Recipe',
                'id' => $recipe,
                'quantity' => $input['num_portions']
            ];
        }

        try {
            $data = $this->coreProvider()->create('/user/' . $user_id . '/order', [
                'delivery_day_id' => $input['delivery_day_id'],
                'recipe_choices' => $recipes
            ]);
        } catch (GoustoCoreServiceErrorException $e) {
            Log::error($e);
            return Response::json([
                'status' => 'error',
                'error' => $e->getMessage()
            ]);
        }
        return Response::json([
            'status' => 'ok',
            'data' => $data
        ]);
    }

    protected function getDiscountPriceBox($data)
    {
        $types = ['gourmet', 'vegetarian'];
        $num_meals = ['2', '3', '4'];
        $num_portions = ['2', '4'];
        foreach ($num_portions as $portion) {
            foreach ($num_meals as $meal) {
                foreach ($types as $type) {
                    if (!isset($data[$portion][$meal][$type]['recipe_discount'])) {
                        continue;
                    }
                    $checkbox = $data[$portion][$meal][$type];
                    if (!empty($checkbox['promo_code']) && $checkbox['recipe_discount'] !== '0.00') {
                        return $checkbox;
                    }
                }
            }
        }
        return [];
    }

    public function prices()
    {
        $promo_code = Input::get('promocode', '');
        $order_id = Input::get('order_id', '');
        $tariff_id = Input::get('tariff_id', null);

        try {
            $data = GoustoCore::fetch('boxPrices', ['promocode' => $promo_code, 'order_id' => $order_id, 'tariff_id' => $tariff_id]);

            $checkbox = $this->getDiscountPriceBox($data);
            if (!empty($checkbox) && !$checkbox['promo_code_valid']) {
                return Response::json([
                    'status' => 'error',
                    'error' => 'Max use reached'
                ]);
            }

            if (!empty($promo_code) && Input::get('save_promo', false)) {
                Session::set('promo', ['code' => $promo_code]);
            }
            return Response::json([
                'status' => 'ok',
                'boxes' => $data
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::json([
                'status' => 'error',
                'error' => 'Error getting prices'
            ]);
        }
    }

    public function show($order_id)
    {
        try {
            $order = $this->coreProvider()->fetch("order/{$order_id}", ['includes' => 'shipping_address']);
            $addresses_data = $this->coreProvider()->fetch("user/current/address");
            $order['delivery_in'] = str_replace(' from now', '', Carbon\Carbon::parse($order['delivery_date'])->diffForHumans());
            $order['date'] = Carbon\Carbon::parse($order['delivery_date'])->format('l jS F');
            $order['cutoff'] = Carbon\Carbon::parse($order['when_cutoff'])->format('l jS F H:i:s');
            return Response::json([
                'status' => 'ok',
                'html' => View::make(
                    'pages.account.deliveries.order-details',
                    [
                        'order' => $order,
                        'shipping_addresses' => $addresses_data
                    ]
                )->render()
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::json([
                'status' => 'error',
                'error' => 'Error getting order'
            ]);
        }
    }
}
