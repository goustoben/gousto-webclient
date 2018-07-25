<?php
return [
    'url'	=> 'https://core.gousto.local/',
    'debug-passthrough' => false,
    'ssl-verifypeer' => false,
    'ssl-verifyhost' => null,
    'ssl-certificate' => null,
    // check core api config file for dev token
    'token' => '',
    'cache' => [
        'enabled' => true,
        'debug' => true,
    ],
    'session' => [
        'enabled' => true,
        'debug' => true,
        'tag' => 'api_data',
    ],
    'cacheable' =>  [
        'menu' => [
            'url_template' => '/period\/(current|next)\/menu$/',
            'refiners' => ['includes', 'day_id'],
            'bust_templates' => ['/menu\/(\d+)/', '/recipe\//'],
            'unique_for_login' => true,
        ],
        'delivery_week' => [
            'url_template' => '/deliveryweek\/available_days\/(\d+)/',
            'bust_templates' => [],
        ],
        'delivery_days' => [
            'url_template' => '/delivery_days$/',
            'refiners' => ['includes', 'postcode', 'order_id', 'period'],
            'bust_templates' => [],
            'unique_for_login' => true,
        ],
        'delivery_day' => [
            'url_template' => '/delivery_days\/(\d+)/',
            'refiners' => ['includes', 'postcode'],
            'bust_templates' => [],
            'unique_for_login' => true,
        ],
        'recipe' => [
            'url_template' => '/recipe\/(\d+|slug\/\b[^0-9]+\b)$/',
            'refiners' => ['includes'],
            'bust_templates' => ['/recipe\//', '/meal\/(\d+)/'],
        ],
        'recipe_media' => [
            'url_template' => '/recipe\/(\d+)\/media$/',
            'bust_templates' => ['/recipe\//'],
        ],
        'recipe_steps' => [
            'url_template' => '/recipe\/(\d+)\/steps$/',
            'bust_templates' => ['/recipe_card\/(\d+)/'],
        ],
        'recipe_steps_media' => [
            'url_template' => '/recipe_card\/(\d+)\/media$/',
            'bust_templates' => ['/recipe_card\/(\d+)/'],
        ],
        'ingredient_media' => [
            'url_template' => '/ingredient\/(\d+)\/media$/',
            'bust_templates' => ['/ingredient\/(\d+)/'],
        ],
        'recipes' => [
            'url_template' => '/recipes$/',
            'refiners' => ['includes', 'recipe_ids', 'q', 'page', 'filters', 'title_search'],
            'bust_templates' => ['/recipe\//', '/meal\/(\d+)/'],
        ],
        'product' => [
            'url_template' => '/product\/(\d+)$/',
            'bust_templates' => ['/product\//'],
        ],
        'product_media' => [
            'url_template' => '/product\/(\d+)\/media$/',
            'bust_templates' => ['/product\//'],
        ],
        'products' => [
            'url_template' => '/products$/',
            'refiners' => ['q', 'show_restricted', 'is_for_sale', 'period_id', 'limit', 'page'],
            'bust_templates' => ['/product\//', '/menu\/(current|next|\d+)\/orderProducts$/'],
        ],
        'default_promotion_code' => [
            'url_template' => '/promotionCode\/hooray$/',
            'bust_templates' => ['/promotionCode\/(\d+)$/'],
        ],
        'box_prices' => [
            'url_template' => '/boxPrice/',
            'refiners' => ['promocode', 'order_id', 'tariff_id'],
            'bust_templates' => ['/campaign/'],
            'unique_for_login' => true,
        ],
    ]
];
