<?php

namespace App;

use App\Enums\RoleEnum;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create a new class instance.
     */

            public function toResponse($request)
    {
            $user = Auth::user();

        // Redirect based on role
        if ($user->hasRole([RoleEnum::ADMIN->value])) {
            return redirect()->intended('/admin/dashboard');
        }

        return redirect()->intended('/');

    }
    }
