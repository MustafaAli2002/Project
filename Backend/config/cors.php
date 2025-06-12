<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie','login','logout'],

    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],

    'allowed_origins' => ['http://localhost:3000'],

    'allowed_origins_patterns' => [],


    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
