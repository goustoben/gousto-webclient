<?php
return [
    'domain' => 'http://auth.gousto.local',
    'client_credentials' => [
        'client_id' => 6,
        'client_secret' => 'frontend_service_secret'
    ],
    'routes' => [
        'client_access' => [
            'method' => 'POST',
            'endpoint' => 'oauth/access-token',
            'requires_credentials' => true
        ],
        'refresh_token' => [
            'method' => 'POST',
            'endpoint' => 'oauth/refresh-token',
            'requires_credentials' => true
        ],
        'login' => [
            'method' => 'POST',
            'endpoint' => 'oauth/access-token',
            'requires_credentials' => true
        ],
        'logout' => [
            'method' => 'DELETE',
            'endpoint' => 'oauth/access-token',
            'requires_credentials' => true
        ],
        'identify' => [
            'method' => 'GET',
            'endpoint' => 'oauth/identify',
            'requires_credentials' => false
        ],
        'password_token' => [
            'method' => 'GET',
            'endpoint' => 'passwords/token',
            'requires_credentials' => false
        ],
        'store_password' => [
            'method' => 'POST',
            'endpoint' => 'passwords',
            'requires_credentials' => false
        ],
        'register' => [
            'method' => 'POST',
            'endpoint' => 'users',
            'requires_credentials' => false
        ],
        'update' => [
            'method' => 'PUT',
            'endpoint' => 'users/:auth_user_id',
            'requires_credentials' => false
        ]
    ]
];
