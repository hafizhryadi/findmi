<?php

use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', ItemController::class . '@index')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('items', ItemController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
