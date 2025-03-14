<?php

namespace App\Listeners;

use App\Events\CategoryCreated;
use App\Mail\NotifyUserMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class NotifyUser
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CategoryCreated $event): void
    {
        $email = auth()->user()->email;

        Mail::to($email)->send(new NotifyUserMail($event->data));
    }
}
