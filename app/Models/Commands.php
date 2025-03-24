<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Commands extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = [
        "num_articles",
        "total",
        "promo_id",
        "user_id",
        "delevry_fees",
        "final_price"
    ];

    // commands belongs to a user
    public function users(){
        return $this->belongsTo(User::class)->withTimestamps();
    }
    public function promos(){
        return $this->hasOne(Promo::class)->withTimestamps();
    }

    // command can have multiple boisons
    public function boisons(){
        return $this->belongsToMany(Boison::class)->withTimestamps();
    }
    // command can have multiple accompagnements
    public function accompagnements(){
        return $this->belongsToMany(Accompagnement::class)->withTimestamps();
    }
    // command can have multiple souce
    public function souces(){
        return $this->belongsToMany(Souce::class)->withTimestamps();
    }
    // command can have multiple products
    public function products(){
        return $this->belongsToMany(Product::class)->withTimestamps();
    }
}
