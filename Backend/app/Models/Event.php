<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['title', 'location', 'price', 'date', 'created_by'];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function teams()
    {
        return $this->hasMany(Team::class);
    }
    
}
