<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Multimedia;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Spatie\MediaLibrary\MediaCollections\Models\Media;


class HikayController extends Controller
{
    public function Home(Request $request)
    {
        // // Transform media to include URLs
        // $media = Multimedia::with('media','category')->latest()->take(4)->get();
        // $media = $media->map(function ($item) {
        //     return [
        //         'id' => $item->id,
        //         'title' => $item->title,
        //         'description' => $item->description,
        //         'tag' => $item->tag,
        //         'timestamps' => $item->created_at->toDateString(),
        //             // Use asset() to make absolute URLs for frontend
        //         'file_path' => asset($item->getFirstMediaUrl() ?: '/images/placeholder.jpg'),
        //         'thumb_url' => asset($item->getFirstMediaUrl('thumb') ?: $item->getFirstMediaUrl() ?: '/images/placeholder.jpg'),
        //     ];
        // });

        // return Inertia::render('home', [
        //     'media' => $media,
        //     'filter' => $request->only('category'),
        //     'canRegister' => Features::enabled(Features::registration()),
        // ]);
        // Get all media with category and media relation
        $media = Multimedia::with('media', 'category')->latest()->get();

        // Group by category and take the first of each
        $mediaByCategory = $media->groupBy(function ($item) {
            return $item->category?->name ?? 'uncategorized';
        })->map(function ($group) {
            $item = $group->first();

            return [
                'id' => $item->id,
                'title' => $item->title,
                'description' => $item->description,
                'tag' => $item->tag,
                'category' => $item->category?->name ?? 'uncategorized',
                'timestamps' => $item->created_at->toDateString(),
                'file_path' => $item->getFirstMediaUrl('media'),
                'thumb_url' => $item->getFirstMediaUrl('thumb'),
            ];
        })->values(); // reset keys

        return Inertia::render('hikay/home', [
            'media' => $mediaByCategory,
            'filter' => $request->only('category'),
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }

    public function about()
    {
        return Inertia::render('hikay/about');
    }
    // public function portfolio(Request $request){
    //     $media = Multimedia::latest()->with('category', 'media');

    //      if ($request->filled('category') && $request->category !== 'null') {
    //     $media->where('category_id', $request->category);
    // }
    //       $media = $media->get()->map(function ($item) {
    //         return [
    //             'id' => $item->id,
    //             'title' => $item->title,
    //             'tag' => $item->tag,
    //             'description' => $item->description,
    //             'file' => $item->file_path,
    //             'file_path' => $item->getFirstMediaUrl('media'),
    //              'thumb_url' => $item->getFirstMediaUrl('media', 'thumb'),
    //         ];
    //     });

    //     return Inertia::render('hikay/portfolio',['media'=>$media, 'filters'=>$request->only('category')]);
    // }

    public function portfolio(Request $request)
    {
        $query = Multimedia::latest()->with('category', 'media');

        // ✅ Use category_id (correct way)
        if ($request->filled('category') && $request->category !== 'All') {
            $query->where('categories.name', $request->category);
        }

        $media = $query->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'tag' => $item->tag, // optional (for label display)
                'description' => $item->description,
                'file_path' => $item->getFirstMediaUrl('media'),
                'thumb_url' => $item->getFirstMediaUrl('media', 'thumb'),
                'category_id' => $item->category_id,

            ];
        });

        return Inertia::render('hikay/portfolio', [
            'media' => $media,
            'filters' => $request->only('category'),
            'categories' => Category::select('id', 'name')->get(),
        ]);
    }

    public function service()
    {
        return Inertia::render('hikay/service');
    }

}

