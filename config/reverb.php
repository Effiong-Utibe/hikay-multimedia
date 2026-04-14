<?php

return [

    'default' => env('REVERB_SERVER', 'reverb'),

    /*
    |--------------------------------------------------------------------------
    | Reverb Servers
    |--------------------------------------------------------------------------
    */

    'servers' => [
    'reverb' => [
        'driver' => 'reverb',
        'key' => env('REVERB_APP_KEY'),
        'secret' => env('REVERB_APP_SECRET'),
        'app_id' => env('REVERB_APP_ID'),
        'options' => [
            'hostname' => env('REVERB_HOST'), // ✅ REQUIRED (THIS FIXES YOUR ERROR)
            'host' => env('REVERB_HOST'),
            'port' => env('REVERB_PORT', 8080),
            'scheme' => env('REVERB_SCHEME', 'http'),
            'useTLS' => env('REVERB_SCHEME') === 'https',
        ],
    ],
],

    /*
    |--------------------------------------------------------------------------
    | Reverb Applications
    |--------------------------------------------------------------------------
    */

    'apps' => [

        'provider' => 'config',

        'apps' => [
            [
                'app_id' => env('REVERB_APP_ID'),
                'key' => env('REVERB_APP_KEY'),
                'secret' => env('REVERB_APP_SECRET'),

                'allowed_origins' => ['*'],

                'ping_interval' => 60,
                'activity_timeout' => 30,
            ],
        ],

    ],

];
