<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Storage;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory , HasRoles , HasApiTokens , Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
       'first_name',
        'last_name',
        'email',
        'phone',
        'gender',
        'birth_date',
        'role',
        'email_verified_at',
        'status',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function answeredQuestions()
    {
        return $this->belongsToMany(DailyQuestion::class, 'answered_questions');
    }
    public function teams()
{
    return $this->belongsToMany(Team::class, 'team_user')
                ->withPivot('joined_at')
                ->withTimestamps();
}



    public function join(){
        return $this->belongsTo(Join::class);
    }
    

}
