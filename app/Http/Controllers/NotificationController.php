<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\NewNotification;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
 public function test()
{
    $user = Auth::user();

    if (!$user) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }



    $notification = Notification::create([
        'user_id' => $user->id,
        'message' => "New upload completed 🎬",
        'read' => false,
    ]);
$notification = Notification::create([
    'user_id' => $user->id,
    'message' => "Welcome {$user->name}! 🎉",
    'read' => false,
]);
    event(new NewNotification(
        $notification->id,
        $notification->message,
        $user->id
    ));

    return "sent";
}
}
