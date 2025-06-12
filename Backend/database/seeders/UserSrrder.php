<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSrrder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'first_name' => 'admin',
            'last_name' => 'admin',
            'email' => 'da763366@gmail.com',
            'password' => Hash::make('Abdoemad2003@#admin'),
            'phone' => '01128671691',
            'gender' => 'male',
            'role' => 'super admin',
            'status' => 'active',
        ]);

       
    }
}
