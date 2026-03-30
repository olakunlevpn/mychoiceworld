<?php

namespace App\Mail;

use App\Settings\GeneralSettings;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewsletterWelcome extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public string $subscriberEmail) {}

    public function envelope(): Envelope
    {
        $siteName = app(GeneralSettings::class)->site_name;

        return new Envelope(
            subject: "Welcome to {$siteName} Newsletter!",
        );
    }

    public function build(): self
    {
        $settings = app(GeneralSettings::class);

        return $this->html(
            "<h2>Welcome to {$settings->site_name}!</h2>
            <p>Thank you for subscribing to our newsletter.</p>
            <p>You'll receive updates on the latest fashion trends, new store arrivals, and exclusive offers from local boutiques near you.</p>
            <br>
            <p>— The {$settings->site_name} Team</p>"
        );
    }
}
