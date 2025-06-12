<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\DailyQuestionController;
use App\Http\Controllers\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegistrationController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\EmailVerificationcontroller;
use App\Http\Controllers\Auth\ResetPasswordcontroller;
use App\Http\Controllers\Auth\ForgetPasswordcontroller;
use App\Http\Controllers\Auth\ProfileUpdateController; 
use App\Http\Controllers\Admin\RolesAndPermissioncontroller;
use App\Http\Controllers\Admin\AddAdminController;
use App\Http\Controllers\Admin\Storejournalistcontroller;
use App\Http\Controllers\Event\StoreEventcontroller;
use App\Http\Controllers\Event\JoinTeamcontroller ;
use App\Http\Controllers\Event\UpdateEventStatuscontroller;


// Public routes BY mr_virus
Route::post('/register', [RegistrationController::class, 'registration']);
Route::post('/email-verification', [EmailVerificationcontroller::class, 'email_verification']);
Route::get('/email-verification', action: [EmailVerificationcontroller::class, 'send_email_verification']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout']);
Route::post('/password/forget_password', [ForgetPasswordcontroller::class, 'forgetpassword']);
Route::post('/password/reset', [ResetPasswordcontroller::class, 'passwordreset'])->middleware('throttle:5,1');

// Protected routes BY mr_virus
Route::middleware(['auth:sanctum', 'Checkvrification'])->group(function() {
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });


    Route::put('/profile', [ProfileUpdateController::class, 'update']);


    
// Protected routes BY mr_virus
    Route::post('/add-admin', [AddAdminController::class, 'addAdmin'])->middleware('CheckSuperAdmin');
    Route::get('/get_events', [JoinTeamcontroller::class, 'getevents']);
    Route::post('/{event}/join', [JoinTeamcontroller::class, 'joinTeam']);
    Route::post('/cancelJoin', [JoinTeamcontroller::class, 'cancelJoin']);
    Route::patch('/events/{id}/status', [UpdateEventStatuscontroller::class, 'updateStatus'])->middleware('CheckAdmin');//change to admin
    Route::middleware(['auth:sanctum', 'role:admin'])->post('/add-journalist', [Storejournalistcontroller::class, 'addjournalist']);
 // Protected routes BY mr_virus
    Route::get('/admin/applications', [ApplicationController::class, 'index'])->middleware('CheckAdmin');
    Route::post('/admin/create_event', [StoreEventcontroller::class, 'store'])->middleware('CheckAdmin');//change to admin
    Route::post('/admin/applications/{id}/approve', [ApplicationController::class, 'approve'])->middleware('CheckAdmin');
    Route::post('/admin/applications/{id}/reject', [ApplicationController::class, 'reject'])->middleware('CheckAdmin');
    
    // Routes for News 
    Route::post('/news', [NewsController::class, 'storeNews'])->middleware('Checkjournalist'); 
    // Protected routes BY mr_virus
    Route::get('/admin/news', [NewsController::class, 'adminIndex'])->middleware('CheckAdmin'); 
    Route::post('/admin/news/{id}/publish', [NewsController::class, 'publishNews'])->middleware('CheckAdmin');
    Route::post('/admin/news/{id}/reject', [NewsController::class, 'rejectNews'])->middleware('CheckAdmin');
     
    
    // Route for DailyChallenge
    //here send to mustafa to make two api here one to put questions and anoter to get questions
    Route::get('/daily-challenge', [DailyQuestionController::class, 'getDailyQuestion']);
    Route::post('/daily-challenge/{id}', [DailyQuestionController::class, 'submitAnswer']);
});


Route::get('/news', [NewsController::class, 'home']);
Route::get('/news/{id}', [NewsController::class, 'home']);

Route::post('/applications', [ApplicationController::class, 'StoreCv']);
