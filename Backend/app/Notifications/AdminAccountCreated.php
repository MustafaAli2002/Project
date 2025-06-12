<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AdminAccountCreated extends Notification
{
    use Queueable;
    
    private $password;

    /**
     * Create a new notification instance.
     */
    public function __construct($password) // Accept password in the constructor
    {
        $this->password = $password; // Assign it to the class property
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
        ->subject('Your Admin Account Has Been Created')
        ->greeting('Hello ' . $notifiable->first_name . ',')
        ->line('You have been added as an Admin on our system.')
        ->line('Email: ' . $notifiable->email)
        ->line('Password: ' . $this->password)
        ->line('Please change your password after your first login.')
        ->salutation('Regards, The Security Team');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
