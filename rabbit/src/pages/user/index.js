'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import UserSidebar from '../../components/UserSidebar'; // Like AdminSidebar, you’ll need this component

export default function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUser(user);
      }
    };
    fetchUser();
  }, []);

  return (
  <div className="flex min-h-screen bg-gray-100">
  <UserSidebar />
  <main className="ml-60 p-6 w-full">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user?.email}</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Profile Summary</h2>
          <p>Email: {user?.email}</p>
          <p>Role: User</p>
          <p>Status: Active</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Order History</h2>
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      </main>
    </div>
  );
}
