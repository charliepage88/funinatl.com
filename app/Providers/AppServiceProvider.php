<?php

namespace App\Providers;

use GuzzleHttp\Client;
use Illuminate\Support\ServiceProvider;

use App\Models\Event;
use App\Models\Location;
use App\Helpers\SiteHelper;
use App\Observers\EventObserver;
use App\Observers\LocationObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('siteHelper', function () {
            return new SiteHelper();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Location::observe(LocationObserver::class);
        Event::observe(EventObserver::class);
    }
}
