@extends('app')
@section('content')
    <h1>Item Details</h1>
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">{{ $item->name }}</h5>
            <p class="card-text">{{ $item->description }}</p>
            <p class="card-text"><strong>Status:</strong> {{ $item->status }}</p>
            @if($item->image)
                <img src="{{ asset('storage/' . $item->image) }}" width="200" />
            @endif
        </div>
    </div>
    <a href="{{ route('items.index') }}" class="btn btn-secondary">Back to List</a>
    @can('update', $item)
        <a href="{{ route('items.edit', $item->id) }}" class="btn btn-warning">Edit</a>
    @endcan
    @can('delete', $item)
        <form action="{{ route('items.destroy', $item->id) }}" method="POST" style="display:inline-block">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure?')">Delete</button>
        </form>
    @endcan
@endsection
