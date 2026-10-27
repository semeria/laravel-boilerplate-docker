<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use InvalidArgumentException;

class DemoUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = config('demo.user.email');
        $password = config('demo.user.password');

        if (! $email || ! $password) {
            throw new InvalidArgumentException('Define DEMO_USER_EMAIL y DEMO_USER_PASSWORD para crear el usuario demo.');
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => 'Usuario Demo',
                'password' => $password,
                'email_verified_at' => now(),
            ],
        );
    }
}
