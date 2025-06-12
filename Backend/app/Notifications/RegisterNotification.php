<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Ichtrojan\Otp\Otp;


class RegisterNotification extends Notification
{
    use Queueable;

    public $message;
    public $subject;
    public $formemail;
    public $mailer;
    private $otp;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        $this->message="Use the below code for verification process";
        $this->subject="New sign up,verification needed";
        $this->formemail="abdomylove01@gmail.com";
        $this->mailer='smtp';
        $this->otp=new Otp;
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
        $otp = $this->otp->generate($notifiable->email, 'numeric', 60);
        $otp->token = substr($otp->token, 0, 6);
        cache()->put($notifiable->email . '_otp', $otp->token, now()->addMinutes(10));
        return (new MailMessage)
        ->mailer('smtp')
        ->subject($this->subject)
        ->greeting('Hello' .$notifiable->name)
        ->line( $this->message)
        ->line( 'code: '.$otp->token)
        ->line('This code will expire in 60 minutes.');
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
