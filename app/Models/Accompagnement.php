<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Accompagnement extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = [
        "name",
        "price"
    ];
    public function commands(){
        return $this->belongsToMany(Commands::class)->withTimestamps();
    }
}
