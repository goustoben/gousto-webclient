<?php

return [
    'ratings' => [
        'orders_to_show' => 2
    ],
    'calendar_notice' => [
        'content' => '<p>We\'re not delivering on bank holidays due to sourcing and courier restrictions, please plan your deliveries accordingly. Thank you!</p>',
        'display' => (
            \Carbon\Carbon::now() >= \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', '2015-04-27 00:00:01') &&
            \Carbon\Carbon::now() <= \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', '2015-05-01 11:59:59')
        ),
    ],
    'account_notice' => [
        'content' => '<p>Nobody likes waiting, (especially for our delicious meals!) so we\'ll be making our deliveries even faster when_mco_live()!</p>',
        'display' => false,
    ]
];
