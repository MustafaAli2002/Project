<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\Auth\EmailVerificationRequest;
use App\Notifications\RegisterNotification;
use Ichtrojan\Otp\Otp;




class EmailVerificationcontroller extends Controller
{
    private $otp;

    public function __construct()
    {
        
        $this->otp=new Otp;
    }
    public function send_email_verification(Request $request)
    {
        $user = auth()->user();
    
        if (!$user) {
            return response()->json([
                'message' => 'User not authenticated.'
            ], 401);
        }
    
        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified.'
            ]);
        }
    
        // Send OTP using your custom notification
        $user->notify(new RegisterNotification());
    
        return response()->json([
            'message' => 'Verification email sent!'
        ]);
    }
    

    public function email_verification(EmailVerificationRequest $request){
        $cachedOtp = cache()->get($request->email . '_otp');

        if (!$cachedOtp || $cachedOtp != $request->otp) {
                  return response()->json(['error' => 'Invalid or expired OTP'], 401);
            }
        $user = User::where('email',$request->email)->first();
        $user->update(['email_verified_at'=> now()]);
        $user->update(['status'=>'active']);
        $success['success']=true;
        return response()->json($success,200);


    }
}
