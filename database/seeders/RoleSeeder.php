<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin= Role::Create(['name' => RoleEnum::ADMIN->value]);
        $user = Role::create(['name' => RoleEnum::USER->value
         ]);
            // Admin gets all permissions
    $admin->givePermissionTo(Permission::all());

    // User gets limited permissions (optional)
    $user->givePermissionTo(['view users']);
    }
}
