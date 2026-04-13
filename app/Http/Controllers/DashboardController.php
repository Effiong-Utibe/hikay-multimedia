<?php

namespace App\Http\Controllers;

use App\Models\Multimedia;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard()
    {
        // =========================
        // TOTAL COUNTS
        // =========================
        $totalPhotos = Multimedia::whereHas('category', fn ($q) => $q->where('name', 'Photo')
        )->count();

        $totalVideos = Multimedia::whereHas('category', fn ($q) => $q->where('name', 'Video')
        )->count();

        $totalGraphics = Multimedia::whereHas('category', fn ($q) => $q->where('name', 'Graphic')
        )->count();
        $totalViewsCount = Multimedia::sum('views');
        $totalAudio = Multimedia::whereHas('category', fn ($q) =>
    $q->where('name', 'Audio')
)->count();

        // =========================
        // MONTHLY STATISTICS
        // =========================
        $stats = Multimedia::join('categories', 'multimedia.category_id', '=', 'categories.id')
            ->select(
                DB::raw('MONTH(multimedia.created_at) as month'),
                'categories.name as category',
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('month', 'category')
            ->get();

        // Get unique categories
        $categories = $stats->pluck('category')->unique();

        foreach ($categories as $category) {
            $monthlyCounts[$category] = array_fill(0, 12, 0);
        }

        foreach ($stats as $item) {
            $monthIndex = $item->month - 1;
            $monthlyCounts[$item->category][$monthIndex] = $item->count;
        }
        $viewStats = Multimedia::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('SUM(views) as total_views')
        )
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->get();

        // Fill Upload Counts
        foreach ($stats as $item) {
            $monthlyCounts[$item->category][$item->month - 1] = $item->count;
        }

        // Fill View Counts (Adding a 'views' key to the same monthlyStats object)
        // $monthlyCounts['views'] = array_fill(0, 12, 0);
        $monthlyCounts = [
    'Photo' => array_fill(0, 12, 0),
    'Video' => array_fill(0, 12, 0),
    'Graphic' => array_fill(0, 12, 0),
    'Audio' => array_fill(0, 12, 0),
    'views' => array_fill(0, 12, 0),
];
foreach ($stats as $item) {
    $monthlyCounts[$item->category][$item->month - 1] = $item->count;
}
        // foreach ($viewStats as $item) {
        //     $monthlyCounts['views'][$item->month - 1] = (int) $item->total_views;
        // }

        // =========================
        // RETURN TO FRONTEND
        // =========================
        return Inertia::render('dashboard', [
            'monthlyStats' => $monthlyCounts,
            'totals' => [
                'photo' => $totalPhotos,
                'video' => $totalVideos,
                'graphic' => $totalGraphics,
                'audio'=>$totalAudio,
                'total_views' => $totalViewsCount,
            ],
        ]);
    }

    public function analytics()
    {
        // 1. Calculate Totals for Media Categories
    $totalPhotos = Multimedia::whereHas('category', fn($q) => $q->where('name', 'Photo'))->count();
    $totalVideos = Multimedia::whereHas('category', fn($q) => $q->where('name', 'Video'))->count();
    $totalGraphics = Multimedia::whereHas('category', fn($q) => $q->where('name', 'Graphic'))->count();
    $totalAudio = Multimedia::whereHas('category', fn($q) => $q->where('name', 'Audio'))->count();

    // calculating total  user
    $totalUsers = User::count();
    $activeUserCount = Multimedia::distinct('user_id')->count('user_id');
    $totalEntries = Multimedia::count();
    $totalViews = Multimedia::sum('views');
    $totalUsers = User::count();

  // 3. Calculate average (avoid division by zero)
    $averageActivity = $activeUserCount > 0
        ? round($totalEntries / $activeUserCount, 1)
        : 0;
    // Get user registrations grouped by month for the current year
    $userGrowthStats = User::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )
        ->whereYear('created_at', date('Y'))
        ->groupBy('month')
        ->get();
 // Fill User Growth Counts
        $monthlyCounts = [];
    $monthlyCounts['users'] = array_fill(0, 12, 0);
    foreach ($userGrowthStats as $item) {
        $monthlyCounts['users'][$item->month - 1] = (int)$item->count;
    }


        return Inertia::render('media/analytics',[
           'total_users' => $totalUsers,
            'monthlyStats' => $monthlyCounts,
        'totals' => [
            // ...
            'photo' => $totalPhotos,
            'video' => $totalVideos,
            'graphic' => $totalGraphics,
            'Audio' => $totalAudio,
            'avg_activity' => $averageActivity,
            'active_users' => $activeUserCount,
            'total_views' => $totalViews,
            'total_users' => $totalUsers,
        ]
        ]);
    }

    public function role()
    {
        return Inertia::render('media/roles');
    }
}
