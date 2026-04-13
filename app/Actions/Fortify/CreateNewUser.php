<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Enums\RoleEnum;
use App\Events\NewNotification;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
        ])->validate();

        $user=User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
              'role' => 'user',
        ]);

        $admins = User::where('role', 'admin')->get();

foreach ($admins as $admin) {

    $notification = Notification::create([
        'user_id' => $admin->id,
        'message' => "👤 New user {$user->name} just registered",
        'read' => false,
    ]);

    event(new NewNotification(
        $notification->id,
        $notification->message,
        $admin->id
    ));
}
          // Assign default role
        $user->assignRole(RoleEnum::USER->value);

        return $user;
    }
}
