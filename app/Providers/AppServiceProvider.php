<?php

namespace App\Providers;

use App\Models\Multimedia;
use App\Policies\MediaPolicy;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Gate;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use App\Models\User;
use App\Policies\MultimediaPolicy;
use App\Policies\UserPolicy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    protected $policies = [
    Media::class => MediaPolicy::class,

];
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register policy manually
        Gate::policy(Media::class, MediaPolicy::class);
        Gate::policy(Multimedia::class, MultimediaPolicy::class);


    // Gates
    Gate::define('admin', function ($user) {
        return $user->hasRole('admin');
    });

    Gate::define('edit-users', function ($user) {
        return $user->can('edit users');
    });
    Gate::define('admin', fn ($user) => $user->hasRole('admin'));

    Gate::define('edit-users', fn ($user) => $user->can('edit users'));
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null
        );
    }
}
