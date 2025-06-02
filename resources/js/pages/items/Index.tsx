import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

type Item = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  status: string;
};

type Props = {
  items: {
    data: Item[];
    links: unknown[];
  };
};

const Index: React.FC<Props> = ({ items }) => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <InertiaLink href="/" className="navbar-brand fw-bold">FindMi</InertiaLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <InertiaLink href="/items" className="nav-link active">All Items</InertiaLink>
              </li>
              <li className="nav-item">
                <InertiaLink href="/items/create" className="nav-link">Create Item</InertiaLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section text-center mb-5 py-5 bg-primary text-white rounded">
        <h1 className="display-4 fw-bold">FindMi - All Items</h1>
        <p className="lead">Discover and manage your items easily.</p>
        <InertiaLink href="/items/create" className="btn btn-light btn-lg mt-3">Create Item</InertiaLink>
      </div>

      {/* Items List */}
      <div className="container">
        <div className="row">
          {items.data.length === 0 && (
            <div className="col-12">
              <div className="alert alert-info text-center">No items found.</div>
            </div>
          )}
          {items.data.map(item => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card h-100 shadow-sm">
                {item.image && (
                  <img src={item.image.startsWith('http') ? item.image : `/storage/${item.image}`} className="card-img-top" style={{ maxHeight: 200, objectFit: 'cover' }} alt={item.name} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text"><strong>Status:</strong> {item.status}</p>
                </div>
                <div className="card-footer bg-white border-0 d-flex justify-content-between">
                  <InertiaLink href={`/items/${item.id}`} className="btn btn-info btn-sm">View</InertiaLink>
                  <InertiaLink href={`/items/${item.id}/edit`} className="btn btn-warning btn-sm">Edit</InertiaLink>
                  <InertiaLink
                    href={`/items/${item.id}`}
                    method="delete"
                    as="button"
                    className="btn btn-danger btn-sm"
                    data={{}}
                    onClick={e => {
                      if (!window.confirm('Are you sure you want to delete this item?')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Delete
                  </InertiaLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {items.links && (items.links as Array<{ url: string | null; label: string; active: boolean }>).length > 3 && (
          <nav>
            <ul className="pagination justify-content-center">
              {(items.links as Array<{ url: string | null; label: string; active: boolean }>).map((link, idx) => (
                <li key={idx} className={`page-item${link.active ? ' active' : ''}${!link.url ? ' disabled' : ''}`}>
                  {link.url ? (
                    <InertiaLink className="page-link" href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                  ) : (
                    <span className="page-link" dangerouslySetInnerHTML={{ __html: link.label }} />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Index;
