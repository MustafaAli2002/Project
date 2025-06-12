<?php

namespace App\Http\Controllers\Event;

use App\Http\Controllers\Controller;
use App\Models\Join;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Event;
use App\Models\Team;
use App\Http\Requests\Event\JoinTeamRequest;

class JoinTeamcontroller extends Controller
{
    // public function getevents()
    // {
    //     $events = Event::whereIn('status', ['pending', 'approved'])
    //        ->with('teams')
    //        ->where('date', '>', now())
    //        ->get();

    //     return response()->json($events);
    // }
    public function getevents()
{
    $events = Event::with(['teams.users'])->where('status', ['pending', 'approved'])->get();
    return response()->json($events);
}


//     public function joinTeam(JoinTeamRequest $request, Event $event)
// {
//     if (!$event->relationLoaded('teams')) {
//         $event->load('teams');
//     }

//     $team = Team::findOrFail($request->team_id);
//     if ($team->event_id != $event->id) {
//         return response()->json(['error' => 'Team does not belong to this event'], 400);
//     }

//     // Force Carbon parsing
//     $date = \Carbon\Carbon::parse($event->date);

//     if (!$date || $date <= now()) {
//         return response()->json(['error' => 'Event date not available or has passed'], 400);
//     }

//     if (now()->diffInHours($date) < 48) {
//         return response()->json(['error' => 'Cannot join less than 48h before event'], 403);
//     }

//     // $alreadyJoined = DB::table('team_user')
//     //     ->where('user_id', Auth::user()->id)
//     //     ->whereIn('team_id', $request->team_id)
//     //     ->exists();

//     // if ($alreadyJoined) {
//     //     return response()->json(['error' => 'Already joined a team for this event'], 403);
//     // }

//     $join = new Join();
//     $join->user_id = Auth::user()->id;
//     $join->team_id =$request->team_id;
//     $join->save();

//     return response()->json(['message' => 'Joined team successfully']);
// }
public function joinTeam(JoinTeamRequest $request)
{
    

    $team = Team::with('event')->findOrFail($request->team_id);
    $user = auth()->user();

    // Check if already joined another team in the same event
    $eventId = $team->event_id;
    $joined = $user->teams()->whereHas('event', function ($q) use ($eventId) {
        $q->where('id', $eventId);
    })->exists();

    if ($joined) {
        return response()->json(['error' => 'You already joined a team in this event'], 400);
    }

    // Check if team is full
    if ($team->users()->count() >= 5) {
        return response()->json(['error' => 'Team is full'], 400);
    }

    $team->users()->attach($user->id, ['joined_at' => now()]);
    return response()->json(['message' => 'Joined successfully']);
}


public function cancelJoin(JoinTeamRequest $request)
{
    $request->validate([
        'team_id' => 'required|exists:teams,id',
    ]);

    $team = Team::with('event')->findOrFail($request->team_id);
    $user = auth()->user();

    $eventDate = $team->event->date;
    if (now()->diffInHours($eventDate, false) < 48) {
        return response()->json(['error' => 'Cannot cancel less than 48 hours before event'], 400);
    }

    $team->users()->detach($user->id);
    return response()->json(['message' => 'Canceled successfully']);
}

}