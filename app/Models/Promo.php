<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Promo extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = [
        "code",
        "value",
    ];

    public function commands(){
        return $this->belongsTo(Commands::class)->withTimestamps();
    }
}
