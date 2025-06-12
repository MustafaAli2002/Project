<?php

namespace App\Http\Controllers\Event;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Http\Requests\Event\StoreEventRequest;

class StoreEventcontroller extends Controller
{
    public function store(StoreEventRequest $request){
        $event = Event::create([
            'title' => $request->title,
            'location' => $request->location,
            'price' => 20, //fixed :) dollar not pound ;)
            'date' => $request->date,
            'created_by' => auth()->id(),
        ]);
        $event->teams()->createMany([
            ['name' => 'Team 1'],
            ['name' => 'Team 2']
        ]);
        return response()->json($event->load('teams'), 201);
        

    }
}
