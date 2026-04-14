<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HikayController;
use App\Http\Controllers\MultimediaController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

// Route::get('/', function () {
//     return Inertia::render('home', [
//         'canRegister' => Features::enabled(Features::registration()),  'media' => Media::latest()->take(8)->get(),
//     ]);
// })->name('home');

// Route::get('/about', function () {
//     return Inertia::render('about', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('about');
Route::get('/', [HikayController::class, 'home'])->name('home');

// Route::get('/role', function () {
//     return Inertia::render('media/roles');
// })->middleware(['auth', 'verified'])->name('role');

Route::middleware(['auth','verified'])->group(function(){
Route::get('/portfolio',[HikayController::class,'portfolio'])->name('portoflio');
Route::get('/service',[HikayController::class,'service'])->name('service');
Route::get('/about',[HikayController::class,'about'])->name('about');
// Route::get('/notifications', function () {
//     return auth()->user()
//         ->notifications()
//         ->latest()
//         ->take(10)
//         ->get();
// });
// Route::post('/notifications/read/{id}', function ($id) {
//     $notification = auth()->user()
//         ->notifications()
//         ->where('id', $id)
//         ->firstOrFail();

//     $notification->update(['read' => true]);

//     return response()->json(['success' => true]);
// });

});
Route::get('/notifications', function () {
    return   $user = Auth::user()
        ->notifications()
        ->latest()
        ->take(10)
        ->get();
});

Route::middleware(['auth','role:admin','permission:view users', 'can:admin'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::get('/admin/analytics', [DashboardController::class, 'analytics'])->name('analytics');
    Route::get('/admin/user_management', [UserController::class,'user'])->name('user');
        // Make admin
    Route::post('/media/users/{user}/make-admin', [UserController::class, 'makeAdmin'])->name('users.makeAdmin');
 // Remove admin
    Route::post('/media/users/{user}/remove-admin', [UserController::class, 'removeAdmin']) ->name('users.removeAdmin');
    Route::delete('/media/users/{user}', [UserController::class, 'destroy']);
    // Route::resource('/media',MediaController::class);
    Route::resource('/admin/media', MultimediaController::class);
    Route::get('admin/role_management', [RoleController::class, 'role']);
    Route::post('/users/{user}/roles', [RoleController::class, 'assignRoles']);
  Route::get('/test-broadcast', function () {
    $user = Auth::user();

    $notification = \App\Models\Notification::create([
        'user_id' => $user->id,
        'message' => 'Reverb is working 🚀',
        'read' => false,
    ]);

    event(new \App\Events\NewNotification(
        $notification->id,
        $notification->message,
        $user->id
    ));

    return 'sent';
});
    Route::post('/notifications/read/{id}', function ($id) {
    $notification = \App\Models\Notification::find($id);

    if (!$notification) {
        return response()->json(['error' => 'Not found'], 404);
    }

    $notification->read = true;
    $notification->save();

    return response()->json([
        'success' => true,
        'updated' => $notification
    ]);
});

Route::post('/notifications/read-all', function () {
    \App\Models\Notification::where('user_id', Auth::id())
        ->update(['read' => true]);

    return response()->json(['success' => true]);
});
Route::post('/notifications/read-all', function () {
    Auth::user()->notifications()->update(['read' => true]);
    return response()->json(['success' => true]);
});
Route::delete('/notifications/delete/{id}', function ($id) {
    $notification = \App\Models\Notification::where('id', $id)
        ->where('user_id', Auth::id())
        ->firstOrFail();

    $notification->delete();

    return response()->json(['success' => true]);
});
});

require __DIR__.'/settings.php';
