<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Http\Requests\news\newsrequest;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function storeNews(NewsRequest $request)
    {
        $new = $request->validated();
    
        $path = $request->file('image')->store('images', 'news');
        $filename = basename($path);
        $cvUrl = url('news/images/' . $filename);
    
   
        $new['image_path'] = $filename;
    

        $newupload = News::create($new);
    
        $success['title'] = $newupload->title;
        $success['success'] = true;
        $success['image'] = $cvUrl;
    
        return response()->json($success, 201);
    }
    

   
    public function adminIndex()
    {
        $news = News::where('status', 'pending')->get();

        return $news->map(function ($item) {
            $item->image_url = asset('news/images/' . $item->image_path);
            return $item;
        });
    }

    
    public function publishNews($id)
    {
        $news = News::findOrFail($id);
        $news->status = 'published';
        $news->save();

        return response()->json(['message' => 'News published']);
    }

    public function rejectNews($id)
    {
        $news = News::findOrFail($id);
        if ($news->image_path) {
            \Storage::disk('public')->delete($news->image_path);
        }
        $news->delete();

        return response()->json(['message' => 'News rejected and deleted']);
    }

    
    public function home($id = null)
{
    if ($id) {
        $news = News::where('status', 'published')->where('id', $id)->first();

        if (!$news) {
            return response()->json(['error' => 'News item not found'], 404);
        }

        $news->image_url = url('news/images/' . $news->image_path);
        return $news;
    } else {
        $news = News::where('status', 'published')->latest()->get();

        return $news->map(function ($item) {
            $item->image_url = url('news/images/' . $item->image_path);
            return $item;
        });
    }
}


}
