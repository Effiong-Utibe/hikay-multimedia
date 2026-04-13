<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Multimedia;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Support\Facades\Auth;

class MultimediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index(Request $request)
{
    // 1. Initialize the query (but don't execute with get() yet)
    $query = Multimedia::latest()->with('category', 'media');

    // 2. Apply filtering if the category is present and not 'All'
   if ($request->filled('category')) {
    $query->whereHas('category', function ($q) use ($request) {
        $q->where('name', $request->category);
    });
}
      $categories = Category::select('id', 'name')->get();

    // 3. Execute the query and map the results
    $media = $query->get()->map(function ($item) {
        return [
            'id' => $item->id,
            'title' => $item->title,
            'description' => $item->description,
              'category_id' => $item->category_id,
              'category' => $item->category?->name,
            // 'file' => $item->file_path, // Check if you need this if you're using Spatie Media Library
            'file_path' => $item->getFirstMediaUrl('media'),
            'thumb_url' => $item->getFirstMediaUrl('media', 'thumb'),
            'can_delete' => Auth::user()?->can('delete', $item),
             'can_update' => Auth::user()?->can('update', $item),
        ];
    });

    return Inertia::render('media/index', [
        'media' => $media,
        'filters' => $request->only('category'),
        'categories' => Category::select('id', 'name')->get(),
         'can' => [
        'create' => Auth::user()?->can('create', Multimedia::class),
    ]
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('media/create', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //        Gate::authorize('create', Media::class);
    //     $request->validate([
    //         'title' => 'required|string|max:255',
    //         'description' => 'required|string',
    //         'tag' => 'required|string|max:20',
    //         'category_id' => 'required|exists:categories,id',
    //         'file_path' => 'required|file|mimes:mp4,mov,avi,wmv,jpg,png,mp3|max:204800',

    //     ]);
    //     $multimedia = Multimedia::create([
    //         'title' => $request->input('title'),
    //         'description' => $request->input('description'),
    //         'tag' => $request->input('tag'),
    //         'category_id' => $request->input('category_id'),

    //     ]);
    //     // Add media and generate thumbnail
    //     $multimedia->addMedia($request->file('file_path'))
    //         ->toMediaCollection('media');

    //     // Get the thumbnail URL (from MediaLibrary conversion)
    //     $thumbnailUrl = $multimedia->getFirstMediaUrl('media', 'thumb');

    //     // Save thumbnail URL to DB
    //     $multimedia->update([
    //         'thumb_url' => $thumbnailUrl,
    //     ]);

    //     return redirect()->route('media.index')->with('message', 'uploaded successfully');
    // }
//     public function store(Request $request)
// {
//     Gate::authorize('create', Media::class);

//     $request->validate([
//         'title' => 'required|string|max:255',
//         'description' => 'required|string',
//         'tag' => 'required|string|max:20',
//         'category_id' => 'required|exists:categories,id',
//         'file_path' => 'required|file|mimes:mp4,mov,avi,wmv,jpg,png,mp3|max:204800',
//     ]);

//     $multimedia = Multimedia::create([
//         'title' => $request->title,
//         'description' => $request->description,
//         'tag' => $request->tag,
//         'category_id' => $request->category_id,
//     ]);
//  $user = Auth::user();

//     if (!$user) {
//         return response()->json(['error' => 'Unauthorized'], 401);
//     }

// $notification = \App\Models\Notification::create([
//     'user_id' => $user->id,
//     'message' => "Your media '{$$multimedia->title}' was uploaded 🎬",
//     'read' => false,
// ]);

// event(new \App\Events\NewNotification(
//     $notification->id,
//     $notification->message,
//     $user->id
// ));
//     // Add media
//     $media = $multimedia->addMedia($request->file('file_path'))
//         ->toMediaCollection('media');

//     // Detect file type
//     $mime = $media->mime_type;

//     // Default thumbnail
//     $thumbnailUrl = null;

//     if (str_starts_with($mime, 'image/')) {
//         $thumbnailUrl = $multimedia->getFirstMediaUrl('media', 'thumb');
//     } elseif (str_starts_with($mime, 'video/')) {
//         $thumbnailUrl = $multimedia->getFirstMediaUrl('media', 'thumb');
//     } elseif (str_starts_with($mime, 'audio/')) {
//         // ✅ fallback for audio
//         $thumbnailUrl = asset('images/audio.jpeg');
//     }

//     // Save thumbnail
//     $multimedia->update([
//         'thumb_url' => $thumbnailUrl,
//     ]);


//     return redirect()->route('media.index')->with('message', 'Uploaded successfully');
// }
public function store(Request $request)
{
    Gate::authorize('create', Media::class);

    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'tag' => 'required|string|max:20',
        'category_id' => 'required|exists:categories,id',
        'file_path' => 'required|file|mimes:mp4,mov,avi,wmv,jpg,png,mp3|max:204800',
    ]);

    $multimedia = Multimedia::create([
        'title' => $request->title,
        'description' => $request->description,
        'tag' => $request->tag,
        'category_id' => $request->category_id,
    ]);

    $user = Auth::user();

    if (!$user) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // ✅ Add media FIRST
    $media = $multimedia->addMedia($request->file('file_path'))
        ->toMediaCollection('media');

    // Detect file type
    $mime = $media->mime_type;

    $thumbnailUrl = null;

    if (str_starts_with($mime, 'image/')) {
        $thumbnailUrl = $multimedia->getFirstMediaUrl('media', 'thumb');
    } elseif (str_starts_with($mime, 'video/')) {
        $thumbnailUrl = $multimedia->getFirstMediaUrl('media', 'thumb');
    } elseif (str_starts_with($mime, 'audio/')) {
        $thumbnailUrl = asset('images/audio.jpeg');
    }

    $multimedia->update([
        'thumb_url' => $thumbnailUrl,
    ]);

    // ✅ NOW send notification (after everything succeeds)
    $notification = Notification::create([
        'user_id' => $user->id,
               'message' => "{$user->name} uploaded '{$multimedia->title}' 🎬",
        'read' => false,
    ]);

    event(new \App\Events\NewNotification(
        $notification->id,
        $notification->message,
        $user->id
    ));


    return redirect()->route('media.index')
        ->with('message', 'Uploaded successfully');
}

    /**
     * Display the specified resource.
     */
    public function show(Multimedia $medium)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Multimedia $medium)
    {
        return Inertia::render('media/edit', [
            'medium' => $medium,
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Multimedia $medium)
    {
        // 1. Authorize the action using your Policy
        Gate::authorize('update', $medium);

        // 2. Validate the request
        // file_path is 'nullable' here because we only update it if the user provides a new file
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'tag'         => 'required|string|max:20',
            'category_id' => 'required|exists:categories,id',
            'file_path'   => 'nullable|file|mimes:mp4,mov,avi,wmv,jpg,png,mp3|max:204800',
        ]);

        // 3. Update the text-based fields
        $medium->update([
            'title'       => $request->input('title'),
            'description' => $request->input('description'),
            'tag'         => $request->input('tag'),
            'category_id' => $request->input('category_id'),
        ]);

        // 4. Handle file replacement if a new file is uploaded
        if ($request->hasFile('file_path')) {
            // Remove the old media and add the new one
            // Spatie MediaLibrary handles the physical file deletion automatically
            $medium->clearMediaCollection('media');
            $medium->addMedia($request->file('file_path'))
                   ->toMediaCollection('media');

            // Refresh the model to get the updated media relation
            $medium->refresh();

            // Update the thumb_url with the new conversion
            $medium->update([
                'thumb_url' => $medium->getFirstMediaUrl('media', 'thumb'),
            ]);
        }

        return redirect()->route('media.index')->with('message', 'Media updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Multimedia $medium)
    {
        Gate::authorize('delete', $medium);
        //   if ($medium->file_path && Storage::disk('public')->exists($medium->file_path)) {
        // Storage::disk('public')->delete($medium->file_path);
        // }
        // Delete MediaLibrary files + conversions
        $medium->clearMediaCollection('media');
        // delete the multimedia record
        $medium->delete();

        return redirect()->route('media.index')->with('message', 'Media deleted successfully');
    }
}
