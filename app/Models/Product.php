<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Product extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = [
        "name",
        "description",
        "location",
        "delevery",
        "title",
        "active_menue",
        "active_first_slide",
        "active_second_slide",
        "photo",
    ];

    public function ingreds(){
        return $this->belongsToMany(Ingred::class)->withTimestamps();;
    }

    public function categories(){
        return $this->belongsToMany(Category::class)->withTimestamps();;
    }
}
