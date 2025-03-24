<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Ingred extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = [
        "name_fr",
        "name_en",
        "name_ni",
    ];

    public function products(){
        return $this->belongsToMany(Product::class)->withTimestamps();
    }
}
