<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\Auth\RegistrationRequest;
use App\Notifications\RegisterNotification;
use Hash;


class RegistrationController extends Controller
{
    public function registration(RegistrationRequest $request){
        $newuser= $request->validated();
        $newuser['password']=Hash::make($newuser['password']);
        $newuser['role']='user';
        $newuser['status']='none';

        $user = User::create($newuser);
        $success['token']=$user->createToken('user',['app:all'])->plainTextToken;
        $success['name']=$user->first_name;
        $success['success']=true;
        $user->notify(new RegisterNotification());
        return response()->json($success,200);

    }
}
