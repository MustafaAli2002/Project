<?php
namespace App\Http\Controllers;

use App\Models\DailyQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DailyQuestionController extends Controller
{
    public function getDailyQuestion()
    {
        $today = today()->toDateString();

        $question = DailyQuestion::where('date', $today)->first();

        if (!$question) {
            return response()->json(['message' => 'No question for today'], 404);
        }

        return response()->json([
            'question_id' => $question->id,
            'question' => $question->question,
            'options' => $question->options, // ← no json_decode needed
        ]);
    }

    public function submitAnswer(Request $request, $id)
{
    $request->validate([
        'selected_answer' => 'required|string',
    ]);

    $user = Auth::user();
    $question = DailyQuestion::findOrFail($id); // use the ID from the route

    // Check if already answered
    if ($user->answeredQuestions()->where('daily_question_id', $question->id)->exists()) {
        return response()->json(['message' => 'You already answered this question.']);
    }

    $isCorrect = $request->selected_answer === $question->correct_answer;

    // Attach to pivot table to prevent future submissions
    $user->answeredQuestions()->attach($question->id);

    if ($isCorrect) {
        $user->increment('score', 10);
        return response()->json(['message' => 'Correct answer! +10 points']);
    }

    return response()->json(['message' => 'Wrong answer.']);
}

}
