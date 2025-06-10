<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Item::latest()->paginate(10);
        $items->getCollection()->transform(function ($item) {
            $user = auth()->user();
            $item->canUpdate = $user ? $user->can('update', $item) : false;
            $item->canDelete = $user ? $user->can('delete', $item) : false;
            $item->creator_name = $item->user ? $item->user->name : null;
            $item->creator_phone = $item->user ? $item->user->phone : null;
            return $item;
        });
        return Inertia::render('items/Index', [
            'items' => $items
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!auth()->check()) {
            abort(403, 'You must be logged in to create an item.');
        }
        return Inertia::render('items/Create');
        //return view('items.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!auth()->check()) {
            abort(403, 'You must be logged in to create an item.');
        }
        
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:lost,found',
        ]);

        // image upload handling
        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('images', 'public');
        }
        $validatedData['user_id'] = auth()->id();
        Item::create($validatedData);
        return Inertia::render('items/Index');
        //return redirect()->route('items.index')->with('success', 'Item created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $item = Item::findOrFail($id);
        $user = auth()->user();
        $item->canUpdate = $user ? $user->can('update', $item) : false;
        $item->canDelete = $user ? $user->can('delete', $item) : false;
        $item->creator_name = $item->user ? $item->user->name : null;
        $item->creator_phone = $item->user ? $item->user->phone : null;
        return Inertia::render('items/ShowItem', [
            'item' => $item
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $item = Item::findOrFail($id);
        if (auth()->user()->cannot('update', $item)) {
            abort(403, 'You do not have permission to edit this item.');
        }
        return Inertia::render('items/Edit', [
            'item' => $item
        ]);
        //return view('items.edit', compact('item'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $item = Item::findOrFail($id);
        if (auth()->user()->cannot('update', $item)) {
            abort(403, 'You do not have permission to update this item.');
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:lost,found,claimed',
        ]);

        // image upload handling
        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('images', 'public');
        }

        $item->update($validatedData);
        return Inertia::render('items/Index');
        //return redirect()->route('items.index')->with('success', 'Item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $item = Item::findOrFail($id);
        if (auth()->user()->cannot('delete', $item)) {
            abort(403, 'You do not have permission to delete this item.');
        }

        $item->delete();
        return redirect()->route('/');
        //return Inertia::render('items/Index');
        //return redirect()->route('items.index')->with('success', 'Item deleted successfully.');
    }
}
