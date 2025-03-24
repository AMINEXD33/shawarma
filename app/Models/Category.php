<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
class Category extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = [
        "name",
        "description",
        "metatitle",
        "active_menue"
    ];
    public function products(){
        return $this->belongsToMany(Product::class)->withTimestamps();
    }
}
