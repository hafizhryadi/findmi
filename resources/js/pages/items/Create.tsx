import React from 'react';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

const Create: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    image: undefined as File | undefined,
    status: 'available',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setData(name as 'image', (e.target as HTMLInputElement).files?.[0]);
    } else if (name === 'name' || name === 'description' || name === 'status') {
      setData(name, value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/items', {
      forceFormData: true,
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Create Item</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className={`form-control${errors.name ? ' is-invalid' : ''}`}
            value={data.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            name="description"
            className={`form-control${errors.description ? ' is-invalid' : ''}`}
            value={data.description}
            onChange={handleChange}
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            name="image"
            className={`form-control${errors.image ? ' is-invalid' : ''}`}
            onChange={handleChange}
          />
          {errors.image && <div className="invalid-feedback">{errors.image}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            name="status"
            className={`form-control${errors.status ? ' is-invalid' : ''}`}
            value={data.status}
            onChange={handleChange}
            required
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
          {errors.status && <div className="invalid-feedback">{errors.status}</div>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={processing}>Create</button>
        <InertiaLink href="/items" className="btn btn-secondary ms-2">Cancel</InertiaLink>
      </form>
    </div>
  );
};

export default Create;
