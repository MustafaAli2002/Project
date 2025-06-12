<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Notifications\ResetPasswordNotification;
use Ichtrojan\Otp\Otp;
use Hash;

class ResetPasswordcontroller extends Controller

{
    // private $otp;
    // public function __construct()
    // {
        
    //     $this->otp=new Otp;
    // }
    public function passwordreset(ResetPasswordRequest $request){
        // $otp2=$this->otp->validate($request->email, $request->otp);
        // if(!$otp2->status){
        //     return response()->json(['error'=>$otp2],401);
        // }
        $cachedOtp = cache()->get($request->email . '_otp');

        if (!$cachedOtp || $cachedOtp != $request->otp) {
                  return response()->json(['error' => 'Invalid or expired OTP'], 401);
            }
        $user = User::where('email',$request->email)->first();
        $user->update(['password'=>Hash::make($request->password)]);
        $user->tokens()->delete();
        $success['success']=true;
        return response()->json($success,200);

    }
}
