<?php
return [

    /*
    |--------------------------------------------------------------------------
    | Override local timezone
    |--------------------------------------------------------------------------
    |
    | UTC is used everywhere apart from when we present a time to the user
    |
    | Local timezone should be recorded here
    |
    | Using something like AWS Route 53, we can present UK users with one
    | front-end instance set to Europe/London, another front-end instance for
    | Pacific, ...
    |
    */

    'localTimezone' => 'Europe/London',
];
