<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['event_id', 'name'];

    

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function join(){
        return $this->belongsTo(Join::class);
    }
    public function users()
{
    return $this->belongsToMany(User::class, 'team_user')
                ->withPivot('joined_at')
                ->withTimestamps();
}

}
