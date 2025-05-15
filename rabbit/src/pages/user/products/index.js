'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import UserSidebar from '../../../components/UserSidebar';
import { useRouter } from 'next/navigation';

export default function UserProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, [sort]);

  const fetchProducts = async () => {
    let query = supabase.from('products').select('*');
    if (sort === 'asc') {
      query = query.order('price', { ascending: true });
    } else {
      query = query.order('price', { ascending: false });
    }
    const { data, error } = await query;
    if (!error) setProducts(data);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSidebar />

      <main className="flex-1 ml-0 md:ml-60 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Products</h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-2 rounded w-full md:w-1/4"
          >
            <option value="asc">Sort by Price: Low to High</option>
            <option value="desc">Sort by Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                <p className="text-green-600 font-semibold">₹{product.price}</p>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <button
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={() => router.push(`/user/products/${product.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
