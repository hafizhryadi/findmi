
    <div class="hero-section text-center mb-5">
        <h1 class="display-4">FindMi</h1>
        <p class="lead">Discover and manage your items easily.</p>
    </div>
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">All Items</h2>
        <a href="{{ route('items.create') }}" class="btn btn-primary">Create Item</a>
    </div>
    <div class="row">
        @forelse($items as $item)
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    @if($item->image)
                        <img src="{{ asset('storage/' . $item->image) }}" class="card-img-top" style="max-height:200px;object-fit:cover;" alt="{{ $item->name }}">
                    @endif
                    <div class="card-body">
                        <h5 class="card-title">{{ $item->name }}</h5>
                        <p class="card-text">{{ $item->description }}</p>
                        <p class="card-text"><strong>Status:</strong> {{ $item->status }}</p>
                    </div>
                    <div class="card-footer bg-white border-0">
                        <a href="{{ route('items.show', $item->id) }}" class="btn btn-info btn-sm">View</a>
                        @can('update', $item)
                            <a href="{{ route('items.edit', $item->id) }}" class="btn btn-warning btn-sm">Edit</a>
                        @endcan
                        @can('delete', $item)
                            <form action="{{ route('items.destroy', $item->id) }}" method="POST" style="display:inline-block">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure?')">Delete</button>
                            </form>
                        @endcan
                    </div>
                </div>
            </div>
        @empty
            <div class="col-12">
                <div class="alert alert-info text-center">No items found.</div>
            </div>
        @endforelse
    </div>
    <div>
        {{ $items->links() }}
    </div>
