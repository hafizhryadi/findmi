import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

const Home: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-3 fw-bold">Welcome to FindMi</h1>
        <p className="lead mt-3 mb-4">
          FindMi helps you discover, manage, and keep track of your lost and found items with ease.
        </p>
        <InertiaLink href="/items" className="btn btn-primary btn-lg">
          View All Items
        </InertiaLink>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title">Post Lost or Found Items</h5>
              <p className="card-text">Easily add items you have lost or found to help others connect with you.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title">Browse All Listings</h5>
              <p className="card-text">Search and filter through all items to find what you need quickly.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title">Connect with Owners</h5>
              <p className="card-text">Contact item owners securely to return or claim lost and found items.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
