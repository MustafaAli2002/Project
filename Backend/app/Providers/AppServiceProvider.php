<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Ichtrojan\Otp\Otp;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Check if the class alias already exists before declaring it
        if (!class_exists('Otp')) {
            class_alias(\App\Models\Otp::class, 'Otp');
        }
    }
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
