<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slides extends Model
{
    protected $fillable = [
        "id",
        "photo",
        "title",
        "title_size",
        "second_title_size",
        "description",
        "action",
        "button",
        "link"
    ];
}
