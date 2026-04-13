<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function User(Request $request)
    {
        if (!Gate::allows('edit-users')) {
    abort(403);
}
        $users = User::with('roles')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->paginate(5)
            ->withQueryString()
            ->through(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $user->getRoleNames(),
                    'permissions' => $user->getAllPermissions()->pluck('name'),
                ];
            });

        return Inertia::render('media/user', [
            'users' => $users,
            'filters' => $request->only('search'),
            'canEditUsers' => Auth::check() && Auth::user()->can('edit users'),
            'auth' => [
                'user' => Auth::user(),
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function makeAdmin(User $user, Request $request)
    {

        // Ensure user is logged in and has permission
        if (! Auth::check() || ! Auth::user()->can('edit users')) {
            abort(403, 'Unauthorized action.');
        }
        $request->validate([
            'password' => ['required'],
        ]);
        if (! Hash::check($request->password, Auth::user()->password)) {
            return back()->with('error', 'Incorrect password.');
        }
        // 🚫 Prevent self removal
        if (Auth::id() === $user->id) {
            return back()->with('error', 'you cannot modify your own role.');
        }
        $user->syncRoles(['admin']);

        return back()->with('success', 'User promoted to admin successfully');
    }

    public function removeAdmin(User $user, Request $request)
    {
        if (! Auth::check() || ! Auth::user()->can('edit users')) {
            abort(403, 'Unauthorized action.');
        }
        $request->validate([
            'password' => ['required'],
        ]);

        // Prevent removing the main admin
        if ($user->id === 2) {
            return back()->with('error', 'The main admin cannot be removed.');
        }
        if (! Hash::check($request->password, Auth::user()->password)) {
            return back()->with('error', 'Incorrect password.');
        }

        // Prevent self-removal
        if (Auth::id() === $user->id) {
            return back()->with('error', 'You cannot remove yourself as admin.');
        }
        $user->syncRoles(['user']);

        return back()->with('success', 'admin role removed successfully');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return back()->with('success', 'User deleted successfully');
    }
}
