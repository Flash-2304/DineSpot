import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

interface Restaurant {
  _id: string;
  name: string;
  city: string;
  isApproved: boolean;
  owner: { name: string; email: string };
}

interface Stats {
  totalUsers: number;
  totalRestaurants: number;
  approvedRestaurants: number;
  totalBookings: number;
}

export const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  const load = async () => {
    const [r, s] = await Promise.all([api.get("/admin/restaurants"), api.get("/admin/stats")]);
    setRestaurants(r.data);
    setStats(s.data);
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id: string) => {
    await api.put(`/admin/restaurants/${id}/approve`);
    toast.success("Restaurant approved");
    load();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            ["Users", stats.totalUsers],
            ["Restaurants", stats.totalRestaurants],
            ["Approved", stats.approvedRestaurants],
            ["Bookings", stats.totalBookings],
          ].map(([label, value]) => (
            <div key={label as string} className="border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="font-semibold mb-3">Restaurants</h2>
      <div className="space-y-3">
        {restaurants.map((r) => (
          <div key={r._id} className="flex justify-between items-center border rounded-xl p-4">
            <div>
              <p className="font-medium">{r.name}</p>
              <p className="text-sm text-gray-500">{r.city} · owner: {r.owner?.name}</p>
            </div>
            {r.isApproved ? (
              <span className="text-xs text-green-600 uppercase">Approved</span>
            ) : (
              <button onClick={() => approve(r._id)} className="bg-brand text-white text-sm px-3 py-1.5 rounded-lg">
                Approve
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
