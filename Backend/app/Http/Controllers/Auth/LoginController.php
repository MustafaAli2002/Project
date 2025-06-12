<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;
use App\Notifications\LoginNotification;
use Hash;

class LoginController extends Controller
{
    public function login (LoginRequest $request) {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];
    
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
    
            // Delete existing tokens (if using Sanctum)
            $user->tokens()->delete();  
    
            // Generate new token
            $success['token'] = $user->createToken($request->userAgent())->plainTextToken;
            $success['name'] = $user->first_name;
            $user->notify(new LoginNotification());
           
    
            return response()->json($success, 201);
        } else {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
    }
    public function logout(Request $request)
{
    // Revoke the current token that was used to authenticate the request
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Logged out successfully'
    ], 200);
}
}
