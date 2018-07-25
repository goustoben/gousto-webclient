<?php

return [
    'customer' => [
        'index'	=> [
            'limit' => 25,
            'search_fields' => [
                '' => 'Free search',
                'email' => 'Email',
                'name_first' => 'First Name',
                'name_last' => 'Last Name',
                'gousto_reference' => 'Reference',
            ],
        ],
    ],
    'campaigns' => [
        'index'	=> [
            'limit' => 25,
            'search_fields' => [
                '' => 'Free search',
                'name' => 'Name',
                'description' => 'Description',
                'landing_url' => 'Url',
            ],
        ],
        'expiry_options' => [
            'none' => '(unlimited)',
            '1 week' => '1 week',
            '2 weeks' => '2 weeks',
            '3 weeks' => '3 weeks',
            '1 month' => '1 month'
        ]
    ],
];
