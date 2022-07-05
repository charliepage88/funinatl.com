<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'webhooks' => [
        'sync' => [
            'staging_token'    => env('WEBHOOK_SYNC_STAGING_TOKEN'),
            'staging_url'      => env('WEBHOOK_SYNC_STAGING_URL'),
            'production_token' => env('WEBHOOK_SYNC_PRODUCTION_TOKEN'),
            'production_url'   => env('WEBHOOK_SYNC_PRODUCTION_URL')
        ]
    ],

    'spotify' => [
        'client_id' => env('SPOTIFY_CLIENT_ID'),
        'secret'    => env('SPOTIFY_CLIENT_SECRET')
    ],

    'oauth' => [
        'client_id' => env('OAUTH_CLIENT_ID'),
        'client_secret' => env('OAUTH_CLIENT_SECRET')
    ],

    's3' => [
        'cdn_url' => env('ASSETS_S3_URL'),
        'cdn_bucket' => env('ASSETS_S3_BUCKET')
    ],
];
