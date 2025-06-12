<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyQuestion extends Model
{
    use HasFactory;

    protected $fillable = ['date', 'question', 'options', 'correct_answer'];

    protected $casts = [
        'options' => 'array',
        'date' => 'date',
    ];
}
