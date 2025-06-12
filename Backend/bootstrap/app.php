<?php

use App\Http\Middleware\CheckAdmin;
use App\Http\Middleware\CheckSuperAdmin;
use App\Http\Middleware\Checkjournalist;
use App\Http\Middleware\Checkvrification;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {

        // Register API middleware
        $middleware->api([
            EnsureFrontendRequestsAreStateful::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);

        // Register route middleware aliases (like 'role')
        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'CheckAdmin'=>CheckAdmin::class,
            'CheckSuperAdmin' => CheckSuperAdmin::class,
            'Checkjournalist' => Checkjournalist::class,
            'Checkvrification' => Checkvrification::class,
            // Add other custom middleware if needed
        ]);

    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
