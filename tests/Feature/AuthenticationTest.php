<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\DemoUserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_view_the_login_page(): void
    {
        $this->get('/login')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Auth/Login'));
    }

    public function test_authenticated_user_is_redirected_from_login_to_dashboard(): void
    {
        $this->actingAs(User::factory()->create())
            ->get('/login')
            ->assertRedirect(route('dashboard'));
    }

    public function test_guest_is_redirected_from_dashboard_to_login(): void
    {
        $this->get('/dashboard')->assertRedirect(route('login'));
    }

    public function test_user_can_sign_in_and_view_the_dashboard(): void
    {
        $user = User::factory()->create(['password' => 'demo-password']);

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'demo-password',
        ])->assertRedirect(route('dashboard'));

        $this->assertAuthenticatedAs($user);

        $this->get('/dashboard')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Dashboard')
                ->where('user.name', $user->name)
                ->where('user.email', $user->email));
    }

    public function test_invalid_credentials_are_rejected(): void
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'incorrect-password',
        ])->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_user_can_log_out(): void
    {
        $this->actingAs(User::factory()->create())
            ->post('/logout')
            ->assertRedirect(route('login'));

        $this->assertGuest();
    }

    public function test_demo_user_seeder_uses_configured_credentials(): void
    {
        config([
            'demo.user.email' => 'demo@example.test',
            'demo.user.password' => 'temporary-demo-password',
        ]);

        $this->seed(DemoUserSeeder::class);

        $user = User::where('email', 'demo@example.test')->firstOrFail();

        $this->assertSame('Usuario Demo', $user->name);
        $this->assertTrue(Hash::check('temporary-demo-password', $user->password));
    }
}
