<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'user' => $request->user()->only(['name', 'email']),
            'themePreference' => $request->user()->theme_preference ?? 'system',
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $request->user()->update([
            'name' => $validated['name'],
        ]);

        return redirect()->route('profile.edit');
    }

    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'string', Password::min(8), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => $validated['password'],
        ]);

        return redirect()->route('profile.edit');
    }

    public function updateAppearance(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'theme_preference' => ['required', 'in:light,dark,system'],
        ]);

        $request->user()->update($validated);

        return redirect()->route('profile.edit');
    }
}
