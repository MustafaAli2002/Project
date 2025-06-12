<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use App\Http\Requests\applications\applicationrequest;

class ApplicationController extends Controller
{
    //make by Mrvirus
    public function StoreCv(ApplicationRequest $request)
    {
        $application = $request->validated();

        $path = $request->cv_path->store('applicants', 'CV');
        $filename = basename($path);
        $cvUrl = url('CV/applicants/' . $filename);
 
        

        $application['cv_path'] = $filename;
    
        $applicationupload = Application::create($application);
        $success['name'] = $applicationupload->full_name;
        $success['success'] = true;
        $success['cv_url'] = $cvUrl;
    
        return response()->json($success, 201);
    }
    

    
    public function index()
    {
        $applications = Application::where('status', 'pending')->get();

        return $applications->map(function ($app) {
            $app->cv_url = $app->cv_path ? asset('CV/applicants/' . $app->cv_path) : null;
            return $app;
        });
    }

    
    public function approve($id)
    {
        $application = Application::findOrFail($id);
        $application->status = 'approved';
        $application->save();

        return response()->json(['message' => 'Application approved']);
    }

  
    public function reject($id)
    {
        $application = Application::findOrFail($id);
        $application->status = 'rejected';
        if ($application->cv_path) {
            \Storage::disk('public')->delete($application->cv_path);
        }
        $application->delete();

        return response()->json(['message' => 'Application rejected']);
    }
}
