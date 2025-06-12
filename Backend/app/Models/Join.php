<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Join extends Model
{
    protected $fillable = ['user_id','team_id'];
    public function users(){
        return $this->hasMany(User::class);
    }
    public function teams(){
        return $this->hasMany(Team::class);
    }
}
