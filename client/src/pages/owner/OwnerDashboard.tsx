import { useEffect, useState, FormEvent } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

interface Restaurant {
  _id: string;
  name: string;
  city: string;
}

interface Booking {
  _id: string;
  customer: { name: string; email: string };
  date: string;
  time: string;
  partySize: number;
  status: string;
}

export const OwnerDashboard = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [form, setForm] = useState({ name: "", description: "", cuisine: "", address: "", city: "", capacity: 20 });

  const load = async () => {
    const res = await api.get("/owner/restaurant");
    setRestaurant(res.data);
    if (res.data) {
      const b = await api.get("/owner/bookings");
      setBookings(b.data);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/owner/restaurant", { ...form, cuisine: form.cuisine.split(",").map((c) => c.trim()) });
      toast.success("Restaurant submitted for approval");
      load();
    } catch {
      toast.error("Could not create restaurant");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await api.put(`/owner/bookings/${id}/status`, { status });
    load();
  };

  if (!restaurant) {
    return (
      <div className="max-w-md mx-auto px-6 py-8">
        <h1 className="text-xl font-bold mb-6">Register your restaurant</h1>
        <form onSubmit={handleCreate} className="space-y-4">
          <input placeholder="Restaurant name" className="w-full border rounded-lg px-4 py-2" required
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Description" className="w-full border rounded-lg px-4 py-2"
            onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input placeholder="Cuisine (comma separated)" className="w-full border rounded-lg px-4 py-2"
            onChange={(e) => setForm({ ...form, cuisine: e.target.value })} />
          <input placeholder="Address" className="w-full border rounded-lg px-4 py-2" required
            onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <input placeholder="City" className="w-full border rounded-lg px-4 py-2" required
            onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <input type="number" placeholder="Seating capacity" className="w-full border rounded-lg px-4 py-2"
            onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} />
          <button className="w-full bg-brand text-white py-2 rounded-lg">Submit</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-xl font-bold mb-1">{restaurant.name}</h1>
      <p className="text-gray-500 mb-6">{restaurant.city}</p>

      <h2 className="font-semibold mb-3">Incoming bookings</h2>
      <div className="space-y-3">
        {bookings.map((b) => (
          <div key={b._id} className="flex justify-between items-center border rounded-xl p-4">
            <div>
              <p className="font-medium">{b.customer?.name}</p>
              <p className="text-sm text-gray-500">{b.date} at {b.time} · {b.partySize} guests</p>
              <span className="text-xs uppercase text-brand">{b.status}</span>
            </div>
            <select
              value={b.status}
              onChange={(e) => updateStatus(b._id, e.target.value)}
              className="border rounded-lg px-2 py-1 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        ))}
        {bookings.length === 0 && <p className="text-gray-500">No bookings yet.</p>}
      </div>
    </div>
  );
};
