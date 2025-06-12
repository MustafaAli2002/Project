<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAdminRequest;
use App\Notifications\AdminAccountCreated;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AddAdminController extends Controller
{
    public function addAdmin(StoreAdminRequest $request)
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
            'role' => 'admin',
            'phone'      => $data['phone'] ?? null,
            'gender'     => $data['gender'] ?? null,
            'password'   => Hash::make($password),
            'status'     => 'active',
        ]);
        $user->assignRole('admin');

        // Assign "admin" role
        

        // Send notification with credentials
        $user->notify(new AdminAccountCreated($password));

        // Return response
        return response()->json([
            'message' => 'Admin user created successfully.',
            'user'    => $user
        ], 201);
    }
}
