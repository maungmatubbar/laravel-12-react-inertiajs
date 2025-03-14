<?php

namespace App\Providers;

use App\Events\CategoryCreated;
use App\Listeners\NotifyUser;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    protected $listen = [
        CategoryCreated::class => [
            NotifyUser::class
        ]
    ];

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Event::listen(CategoryCreated::class, NotifyUser::class);
    }
}
