<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_view_profile(): void
    {
        $this->get('/profile')->assertRedirect(route('login'));
    }

    public function test_authenticated_user_can_view_profile_without_password_data(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/profile')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Profile/Edit')
                ->where('user.name', $user->name)
                ->where('user.email', $user->email)
                ->missing('user.password'));
    }

    public function test_profile_shares_the_users_theme_preference(): void
    {
        $user = User::factory()->create(['theme_preference' => 'dark']);

        $this->actingAs($user)->get('/profile')
            ->assertInertia(fn ($page) => $page->where('themePreference', 'dark'));
    }

    public function test_user_can_update_theme_preference(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->patch('/profile/appearance', [
            'theme_preference' => 'system',
        ])->assertRedirect(route('profile.edit'));

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'theme_preference' => 'system',
        ]);
    }

    public function test_theme_preference_only_accepts_supported_values(): void
    {
        $user = User::factory()->create(['theme_preference' => 'light']);

        $this->actingAs($user)->patch('/profile/appearance', [
            'theme_preference' => 'neon',
        ])->assertSessionHasErrors('theme_preference');

        $this->assertSame('light', $user->fresh()->theme_preference);
    }

    public function test_user_can_update_name_but_not_email(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->patch('/profile', [
            'name' => 'Nombre actualizado',
            'email' => 'attacker@example.test',
        ])->assertRedirect(route('profile.edit'));

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Nombre actualizado',
            'email' => $user->email,
        ]);
    }

    public function test_name_is_required_and_limited_to_255_characters(): void
    {
        $this->actingAs(User::factory()->create())
            ->patch('/profile', ['name' => str_repeat('a', 256)])
            ->assertSessionHasErrors('name');
    }

    public function test_user_can_change_password_with_current_password(): void
    {
        $user = User::factory()->create(['password' => 'old-password']);

        $this->actingAs($user)->patch('/profile/password', [
            'current_password' => 'old-password',
            'password' => 'new-password-123',
            'password_confirmation' => 'new-password-123',
        ])->assertRedirect(route('profile.edit'));

        $this->assertTrue(Hash::check('new-password-123', $user->fresh()->password));
    }

    public function test_password_change_requires_correct_current_password_and_confirmation(): void
    {
        $user = User::factory()->create(['password' => 'old-password']);

        $this->actingAs($user)->patch('/profile/password', [
            'current_password' => 'wrong-password',
            'password' => 'new-password-123',
            'password_confirmation' => 'different-password',
        ])->assertSessionHasErrors(['current_password', 'password']);

        $this->assertTrue(Hash::check('old-password', $user->fresh()->password));
    }
}
