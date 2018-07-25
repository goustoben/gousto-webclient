<?php

View::composer('pages.account.subscription', function ($view) {
    $box_type_list = [
        'gourmet' => 'gourmet',
        'vegetarian' => 'vegetarian'
    ];

    $frequency_list = [
        1 => 'Weekly',
        2 => 'Fortnightly',
        4 => 'Monthly'
    ];

    $view_data = $view->getData();

    $num_portions_list = [];
    $num_recipes_list = [];
    foreach ($view_data['prices'] as $num_portion => $recipe_prices) {
        $num_portions_list[$num_portion] = "{$num_portion} servings";
        foreach ($recipe_prices as $num_recipe => $box_type_prices) {
            $num_recipes_list[$num_recipe] = "{$num_recipe} meals";
        }
    }
    /**
     * 8 Portion support required for the Box Prices endpoint
     * Epic link https://gousto.atlassian.net/browse/TECH-6166
     */
    if (isset($num_portions_list[8])) {
        unset($num_portions_list[8]);
    }
    if (isset($num_recipes_list[8])) {
        unset($num_recipes_list[8]);
    }

    $delivery_slots = [];
    $delivery_slot_cutoffs = [];
    $delivery_slot_days_of_week = [];
    foreach ($view_data['delivery_slots'] as $delivery_slot) {
        $delivery_slots[$delivery_slot['id']] = $delivery_slot;
        $delivery_slot_cutoffs[$delivery_slot['id']] = $delivery_slot['cutoff_day'];
        $delivery_slot_days_of_week[$delivery_slot['id']] = $delivery_slot['default_day'];
    }

    $delivery_week_days = [];
    foreach ($view_data['delivery_days'] as $delivery_day) {
        foreach ($delivery_day['delivery_slots'] as $delivery_slot) {
            if (!isset($delivery_week_days[$delivery_slot['id']])) {
                $delivery_week_days[$delivery_slot['id']] = [];
            }
            $delivery_week_days[$delivery_slot['id']][$delivery_day['delivery_week_id']] = Carbon\Carbon::parse($delivery_day['date'])->format('l jS F Y');
        }
    }

    $view->with('box_type_list', $box_type_list)->
        with('frequency_list', $frequency_list)->
        with('num_portions_list', $num_portions_list)->
        with('num_recipes_list', $num_recipes_list)->
        with('delivery_slots', $delivery_slots)->
        with('delivery_slot_cutoffs', $delivery_slot_cutoffs)->
        with('delivery_slot_days_of_week', $delivery_slot_days_of_week)->
        with('delivery_week_days', $delivery_week_days);
});

View::composer('pages.recipes.this_week', function ($view) {
    $view_data = $view->getData();
    $num_portions = 2;
    if (!empty($view_data['subscription'])) {
        $num_portions = $view_data['subscription']['box']['num_portions'];
    }

    // cutoff and delivery day handling
    $next_available_delivery = $view_data['next_available_delivery'];
    foreach ($next_available_delivery['delivery_slots'] as $delivery_slot) {
        if (isset($view_data['order']['delivery_slot_id']) &&
            intval($view_data['order']['delivery_slot_id']) === intval($delivery_slot['id'])
        ) {
            $next_delivery_slot = $delivery_slot;
        } elseif ($delivery_slot['default']) {
            $next_delivery_slot = $delivery_slot;
            continue;
        }
    };
    $next_delivery_day = $next_available_delivery;
    $cutoff = Carbon\Carbon::parse($next_delivery_day['when_cutoff']);
    $time_end = str_replace(' from now', '', $cutoff->diffForHumans());
    $delivery_day_id = $next_delivery_day['id'];
    $view->with('num_portions', $num_portions)->
        with('next_delivery_slot', $next_delivery_slot)->
        with('next_delivery_day', $next_delivery_day)->
        with('time_end', $time_end);
});

View::composer('pages.account.includes.account-message-banner', function ($view) {
    $view_data = $view->getData();
    $payment_failed = true;
    if (isset($view_data['subscription'])) {
        $subscription = $view_data['subscription'];
        $subscription = isset($subscription['subscription']) ? $subscription['subscription'] : $subscription;
        if (array_key_exists('payment_failed_at', $subscription)) {
            $payment_failed = $subscription['payment_failed_at'];
        }
    }
    if ($payment_failed === true) {
        $subscription = GoustoCore::fetch("user/current/subscription");
        $payment_failed = $subscription['subscription']['payment_failed_at'];
    }
    $view->with('payment_failed_at', $payment_failed);
});

View::composer('pages.account.deliveries', function ($view) {
    $view_data = $view->getData();
    $orders = $view_data['orders'];
    $next_order = false;
    $next_projected = false;
    $order_list = [];
    foreach ($orders as $order) {
        $order['delivery_in'] = str_replace(' from now', '', Carbon\Carbon::parse($order['delivery_date'])->diffForHumans());
        $order['date'] = Carbon\Carbon::parse($order['delivery_date'])->format('l jS F');
        $order['human_cutoff_date'] = Carbon\Carbon::parse($order['when_cutoff'])->format('l jS F');
        $order['live'] = Carbon\Carbon::parse($order['when_live'])->format('l jS F H:i\p\m');
        $order_list[] = $order;
    }
    $projected_deliveries = [];
    foreach ($view_data['projected_deliveries'] as $projected_delivery) {
        $projected_delivery['human_cutoff_date'] = Carbon\Carbon::parse($projected_delivery['when_cutoff'])->format('l jS F');
        $projected_deliveries[] = $projected_delivery;
    }

    $next_delivery_ids = [
        'order' => null,
        'projected' => null
    ];
    if ($edited = Session::get('edited_order_id', null)) {
        $next_delivery_ids['order'] = $edited;
    } elseif (!empty($order_list)) {
        $next_delivery_ids['order'] = $order_list[0]['id'];
    } elseif (!empty($projected_deliveries)) {
        $next_delivery_ids['projected'] = $projected_deliveries[0]['id'];
    }

    $view->with('orders', $order_list)->
        with('projected_deliveries', $projected_deliveries)->
        with('next_delivery_ids', $next_delivery_ids);
});

View::composer('pages.account.deliveries.no-delivery', function ($view) {
    $subscription = false;
    try {
        $subscription = GoustoCore::fetch('user/current/subscription');
    } catch (Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException $e) {
        Log::error($e);
    }
    $view->with('subscription', $subscription);
});

View::composer('pages.account.includes.choose-address-form', function ($view) {
    $view_data = $view->getData();
    $addresses = $view_data['shipping_addresses'];
    $address_list = [];
    $current_shipping_address_id = isset($view_data['current_shipping_address_id']) ? $view_data['current_shipping_address_id'] : false;
    foreach ($addresses as $address) {
        $address_list[$address['id']] = $address['name'];
        if (!$current_shipping_address_id && $address['shipping_default'] === true) {
            $current_shipping_address_id = $address['id'];
        }
    }
    $view->with('address_list', $address_list)->
        with('current_shipping_address_id', $current_shipping_address_id);
});

View::composer('pages.account.includes.communication-preferences-form', function ($view) {
    $view_data = $view->getData();
    $user = $view_data['user'];
    $view->with('marketing_do_allow_email', $user['marketing_do_allow_email'])->
    with('marketing_do_allow_phone', $user['marketing_do_allow_phone'])->
    with('marketing_do_allow_post', $user['marketing_do_allow_post'])->
    with('marketing_do_allow_sms', $user['marketing_do_allow_sms'])->
    with('marketing_do_allow_thirdparty', $user['marketing_do_allow_thirdparty']);
});

View::composer('pages.account.includes.delivery-instruction-select', function ($view) {
    $view_data = $view->getData();
    $leave_box_options = Config::get('address.leave_box_options', []);
    $selected_option = null;
    if (isset($view_data['address']) && !empty($view_data['address'])) {
        $address = $view_data['address'];
        $delivery_instructions = $address['delivery_instructions'];
        $selected_option = 'Other';
        if (in_array($delivery_instructions, $leave_box_options)) {
            $selected_option = $delivery_instructions;
        }
        if (preg_match('/^Neighbour: /', $delivery_instructions)) {
            $selected_option = 'Neighbour';
            $delivery_instructions = preg_replace('/^Neighbour: /', '', $delivery_instructions);
        }
        $view->with('delivery_instructions', $delivery_instructions);
    }
    $view->with('selected_option', $selected_option)->with('leave_box_options', $leave_box_options);
});

View::composer('pages.account.includes.billing-address-form', function ($view) {
    $view_data = $view->getData();
    $addresses = $view_data['shipping_addresses'];
    $address_list = [];
    $default_billing_address_id = false;
    foreach ($addresses as $address) {
        $address_list[$address['id']] = $address['name'];
        if (!$default_billing_address_id && $address['billing_default'] === true) {
            $default_billing_address_id = $address['id'];
        }
    }
    $view->with('address_list', $address_list)->
        with('default_billing_address_id', $default_billing_address_id)->
        with('current_id', $default_billing_address_id);
});

View::composer(['includes.recipe', 'pages.recipe.show', 'pages.recipes.show'], function ($view) {
    $view_data = $view->getData();
    $recipe_id = $view_data['recipe']['id'];
    $medias = GoustoCore::fetch("recipe/{$recipe_id}/media");
    $view->with('medias', $medias);
});
View::composer('includes.order-summary', function ($view) {
    $medias = [];
    $view_data = $view->getData();
    $recipes  = $view_data['recipes'];
    foreach ($recipes as $recipe) {
        $recipe_id = $recipe['id'];
        $media_items = GoustoCore::fetch("recipe/{$recipe_id}/media");
        foreach ($media_items as $media) {
            if ($media['purpose']['slug'] === 'mood-image') {
                $medias[$recipe_id] = $media;
            }
        }
    }
    $view->with('medias', $medias);
});
View::composer('pages.account.deliveries.no-delivery', function ($view) {
    $view_data = $view->getData();
    $menu_data =  GoustoCore::fetch("period/current/menu");
    $recipe_data =  GoustoCore::fetch('recipes', [
        'recipe_ids' => $menu_data['recipe_ids'],
    ]);
    $recipes = $recipe_data['recipes'];
    $view->with('recipes', $recipes);
});
View::composer('includes.recipesticker', function ($view) {
    $view_data = $view->getData();
    $recipe_id = $view_data['recipe']['id'];
    $medias = GoustoCore::fetch("recipe/{$recipe_id}/media");
    $view->with('medias', $medias);
});
View::composer('pages.account.deliveries.order-recipe', function ($view) {
    $view_data = $view->getData();
    $recipe_id = $view_data['recipe_item']['itemable_id'];
    $async = new GoustoAsync;
    $async->add('recipe', "recipe/{$recipe_id}");
    $async->add('medias', "recipe/{$recipe_id}/media");
    extract(GoustoCore::asyncFetch($async));
    $view->with('recipe', $recipe)->with('medias', $medias);
});

View::composer('pages.account.deliveries.order-product', function ($view) {
    $view_data = $view->getData();
    $product_id = $view_data['product_item']['itemable_id'];
    $product = GoustoCore::fetch("product/{$product_id}");
    $medias = GoustoCore::fetch("product/{$product_id}/media");
    $view->with('product', $product)->with('medias', $medias);
});

View::composer(['pages.home-d', 'pages.join'], function ($view) {
    $view_data = $view->getData();
    $items = $view_data['menu']['recipe_ids'];
    $recipes = [];
    foreach ($items as $item) {
        if (isset($item)) {
            $recipe_id = $item;
            $recipe = GoustoCore::fetch("recipe/{$recipe_id}", ['includes' => ['chef']]);
            $media = GoustoCore::fetch("recipe/{$recipe_id}/media");
            if ((count($media) > 0) && $media[0]['purpose']['slug'] === 'mood-image') {
                $recipe['media'] = $media;
                $recipes[] = $recipe;
            }
        }
    }

    $celebrity_recipes = Config::get('celebritychef');
    if (!empty($celebrity_recipes)) {
        $async = new GoustoAsync;
        $async->add('twr_menu', "period/current/menu");
        $async->add('nwr_menu', "period/next/menu");
        extract(GoustoCore::asyncFetch($async));
        $homepage_settings = Config::get('homepage');
        $hero_img = $homepage_settings['default_hero_img'];
        $hero_img['show_celebrity_chef'] = $homepage_settings['show_celebrity_chef'];
        foreach ($celebrity_recipes as $celebrity_recipe_id => $celebrity_recipe_data) {
            $menus = [
                'this-weeks' => $twr_menu,
                'next-weeks' => $nwr_menu
            ];
            // add this back when Aidan/Tim ask
            /*
            foreach($menus as $menu_prefix => $menu){
                if(in_array($celebrity_recipe_id, $menu['recipe_ids'])){
                    $hero_img['url'] = $menu_prefix . '-recipes';
                    $hero_img['desktop'] = $celebrity_recipe_data['desktop'];
                    $hero_img['mobile'] = $celebrity_recipe_data['mobile'];
                    $hero_img['title'] = $celebrity_recipe_data['title'];
                    $hero_img['description'] = $celebrity_recipe_data['description'];
                    break;
                }
            }
            */
            if (strpos($hero_img['url'], '?recipe_ids[]=')) {
                break;
            }
        }
    }
    $view->with('recipes', $recipes)->with('hero_img', $hero_img);
});

View::composer('pages.cancelled', function ($view) {
    $data = $view->getData();
    if ($order = $data['previous_order']) {
        $cutoff = $order['when_cutoff'];
        $deadline = Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $cutoff);
        $delivery_date = Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $order['delivery_date']);
        $num_portions = $order['box']['num_portions'];
        $num_recipes = $order['box']['num_recipes'];

        $view->with('deadline', $deadline)->
            with('delivery_date', $delivery_date)->
            with('num_portions', $num_portions)->
            with('num_recipes', $num_recipes);
    }
});

View::composer('pages.account.modals.skipped-all-modal', function ($view) {
    $view_data = $view->getData();

    try {
        if (!empty($view_data['orders'])) {
            $orders = $view_data['orders'];
        } else {
            $orders = GoustoCore::fetch("user/current/orders", [
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
            ]);
            $orders = array_get($orders, 'data', []);
        }
        if (isset($view_data['next_projected_delivery_data'])) {
            $next_projected_delivery_data = $view_data['next_projected_delivery_data'];
        } else {
            $next_projected_delivery_data = GoustoCore::fetch('user/current/subscription/delivery/next');
        }
        $next_date = \Carbon\Carbon::parse($next_projected_delivery_data['date']);
        $paused_for = str_replace(' before', '', \Carbon\Carbon::now()->diffForHumans($next_date));
        $restart_on = $next_projected_delivery_data['human_date'];
    } catch (Exception $e) {
        Log::error($e);
    }

    $view->with([
        'paused_for' => $paused_for,
        'restart_on' => $restart_on,
        'orders' => isset($orders) ? $orders : null
    ]);
});

View::composer('pages.confirmation.summary', function ($view) {
    $data = $view->getData();
    $order = $data['order'];
    $user = [];
    $user = $data['user'];
    $user['referral-code'] = $data['user']['referral-code'];

    $items = $order['recipe_items'];
    $recipes = [];
    foreach ($items as $item) {
        if (isset($item['itemable_id'])) {
            $recipe_id = $item['itemable_id'];
            $recipe = GoustoCore::fetch("recipe/{$recipe_id}");
            $media = GoustoCore::fetch("recipe/{$recipe_id}/media");
            $recipe['media'] = $media;
            $recipes[] = $recipe;
        }
    }
    $view->with('recipes', $recipes)->with('user', $user);
});

View::composer(['pages.learn-more', 'pages.contact'], function ($view) {
    $page_with_support_widget = true;
    $view->with('page_with_support_widget', $page_with_support_widget);
});

View::composer(['pages.account.modals.billing-modal'], function ($view) {
    $data = $view->getData();
    $user = $data['user'];
    $error_message = '';
    $payment_method = null;
    $expires_days = null;

    try {
        if (isset($data['payment_method']['method'])) {
            $payment_method = $data['payment_method'];
        } else {
            $payment_method = GoustoCore::fetch('user/current/paymentMethod');
        }
    } catch (Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException $e) {
        $error_message = $e->getDetails();
    }

    if ($payment_method) {
        $when_expires = $payment_method['method']['data']['card_expires'];
        $when_expires_year = intval(substr($when_expires, 3, 2)) + 2000; // Y3K bug
        $when_expires_month = substr($when_expires, 0, 2);
        $expires_days = \Carbon\Carbon::createFromDate($when_expires_year, $when_expires_month, 1)->diffInDays();
    }

    $view->with([
        'user' => $user,
        'expires_days' => $expires_days,
        'error_message' => $error_message,
        'payment_method' => $payment_method
    ]);
});

View::composer(['pages.account.ratings.recipe-rating'], function ($view) {
    $data = $view->getData();
    $recipe_id = $data['recipe_id'];
    $recipe = $data['recipe'];
    $recipe['media'] = GoustoCore::fetch("recipe/{$recipe_id}/media");
    $view->with('recipe', $recipe);
});

View::composer(['pages.account.includes.account-navigation'], function ($view) {
    $view_data = $view->getData();
    if (isset($view_data['num_recipes_to_rate']['count'])) {
        $num_recipes_to_rate = $view_data['num_recipes_to_rate'];
    } else {
        $num_recipes_to_rate = GoustoCore::fetch('/user/current/ratings/count');
    }
    $view->with('num_recipes_to_rate', $num_recipes_to_rate['count']);
});

View::composer('pages.account.includes.celebrity-chef-banner', function ($view) {
    $celebrity_recipes = Config::get('celebritychef');
    $banner = ['show' => false];
    if (!empty($celebrity_recipes)) {
        $async = new GoustoAsync;
        $async->add('twr_menu', "period/current/menu");
        $async->add('nwr_menu', "period/next/menu");
        extract(GoustoCore::asyncFetch($async));
        foreach ($celebrity_recipes as $celebrity_recipe_id => $celebrity_recipe_data) {
            $menus = [
                'this-weeks' => $twr_menu,
                'next-weeks' => $nwr_menu
            ];
            foreach ($menus as $menu_prefix => $menu) {
                if (in_array($celebrity_recipe_id, $menu['recipe_ids'])) {
                    $banner['recipe_cutoff'] = \Carbon\Carbon::parse($menu['cutoff_date']['date'])->format('jS F');
                    $banner['url'] = $menu_prefix . '-recipes?recipe_ids[]=' . $celebrity_recipe_id;
                    $recipe = GoustoCore::fetch("recipes", ['recipe_ids' => [$celebrity_recipe_id], 'includes' => ['chef']]);
                    $recipe = $recipe['recipes'][$celebrity_recipe_id];
                    if (!empty($recipe['chef']) && $recipe['chef']['celebrity']) {
                        $banner['celeb_name'] = $recipe['chef']['name'];
                        $banner['recipe_title'] = $recipe['title'];
                        $banner['image'] = $celebrity_recipe_data['banner_image'];
                        $banner['show'] = true;
                        break;
                    }
                }
            }
            if ($banner['show']) {
                break;
            }
        }
    }
    $view->with('banner', $banner);
});

View::composer(['pages.account.modals.change-default-address-modal-body'], function ($view) {
    $data = $view->getData();
    $orders_data = GoustoCore::fetch("user/current/orders", [
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
    ]);
    $orders_data = array_get($orders_data, 'data', []);
    $default_shipping_address_id = $data['address_id'];
    $committed_orders = [];
    $pending_orders = [];
    foreach ($orders_data as $order) {
        if ($order['shipping_address']['id'] === $default_shipping_address_id) {
            continue;
        }
        $order['human_delivery_date'] = \Carbon\Carbon::parse($order['delivery_date'])->format('l \t\h\e jS \\of F');
        $order['address'] = ($order['shipping_address']['line1'] ? $order['shipping_address']['line1'] . ', ' : '') .
            ($order['shipping_address']['line2'] ? $order['shipping_address']['line2'] . ', ' : '') .
            ($order['shipping_address']['line3'] ? $order['shipping_address']['line3'] . ', ' : '') .
            ($order['shipping_address']['town'] ? $order['shipping_address']['town'] . ', ' : '') .
            $order['shipping_address']['postcode'];
        if ($order['state'] === 'committed') {
            $committed_orders[] = $order;
        } elseif ($order['state'] === 'pending') {
            $pending_orders[] = $order;
        }
    }
    $view->with('committed_orders', $committed_orders)
        ->with('pending_orders', $pending_orders);
});

View::composer(['includes.header'], function ($view) {
    $menu_data =  GoustoCore::fetch("period/current/menu");

    if (!empty($menu_data['theme']['logo_media']['original_src'])) {
        $theme_logo = $menu_data['theme']['logo_media']['original_src'];
    } else {
        $theme_logo = '';
    }
    $view->with('theme_logo', $theme_logo);
});


View::composer('includes.tracking.gtm', function ($view) {
    $dataLayer = [];
    $data = $view->getData();

    if (!empty($data['user']['email'])) {
        $dataLayer['email'] = $data['user']['email'];
    }
    if (!empty(Session::get('authId'))) {
        $dataLayer['goustoReference'] = Session::get('authId');
    }

    $view->with('data_layer', $dataLayer);
});
