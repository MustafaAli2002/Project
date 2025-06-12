<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Storejournalist;
use App\Notifications\Addjournalistnotification;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class Storejournalistcontroller extends Controller
{
    public function addjournalist(Storejournalist $request)
    {
        // Get only validated data
        $data = $request->validated();

        // Generate random password
        $password = Str::random(10);
        

        // Create the new admin user
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name'  => $data['last_name'],
            'email'      => $data['email'],
            'role' => 'journalist',
            'phone'      => $data['phone'] ?? null,
            'gender'     => $data['gender'] ?? null,
            'password'   => Hash::make($password),
            'status'     => 'active',
        ]);

        // Assign "admin" role
        

        // Send notification with credentials
        $user->notify(new Addjournalistnotification($password));

        // Return response
        return response()->json([
            'message' => 'journalist user created successfully.',
            'user'    => $user
        ], 201);
    }
}
