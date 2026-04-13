<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;


class RoleController extends Controller
{

public function role()
{

    return Inertia::render('media/roles', [
        'roles' => Role::with('permissions')->get(),
        'permissions' => Permission::all(),
         'activities' => Activity::latest()->limit(10)->get(),
         'users' => User::with('roles')->get(),

    ]);
}
public function assignRoles(Request $request, User $user)
{
       if ($user->id === 2) {
        return back()->with('error', 'The main admin cannot be removed.');
    }
        if (Auth::id() === $user->id) {
            return back()->with('error', 'You cannot remove yourself as admin.');
        }
    $request->validate([
        'roles' => ['required', 'array'],
    ]);

    $user->syncRoles($request->roles);

    Activity()
        ->causedBy(Auth::user())
        ->performedOn($user)
        ->log('Updated user roles');

    return back()->with('success', 'Roles updated successfully');
}
}
