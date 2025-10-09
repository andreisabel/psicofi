<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $tries = 2;

    private $dest;
    private $mail;
    /**
     * Create a new job instance.
     */
    public function __construct($dest, $mail)
    {
        $this->mail = $mail;
        $this->dest = $dest;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->dest)->send($this->mail);
    }

    public function backoff(): array
    {
        return [60, 120];
    }
}
