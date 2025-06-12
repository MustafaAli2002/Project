<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\Auth\ForgetPasswordRequest;
use App\Notifications\ResetPasswordNotification;

class ForgetPasswordcontroller extends Controller
{
    public function forgetpassword(ForgetPasswordRequest $request){
        $input = $request->only('email');
        $user = User::where('email',$input)->first();
        $user->notify(new ResetPasswordNotification());
        $success['success']=true;
        return response()->json($success,200);

    }
}
