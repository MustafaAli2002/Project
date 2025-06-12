<?php

namespace App\Http\Controllers\Event;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Http\Requests\Event\UpdateEventStatusRequest;

class UpdateEventStatuscontroller extends Controller
{
  
    public function updateStatus(UpdateEventStatusRequest $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,cancelled'
        ]);
    
        $event = Event::findOrFail($id);
        $event->status = $request->status;
        $event->save();
    
        return response()->json(['message' => 'Event status updated']);
    }
}
