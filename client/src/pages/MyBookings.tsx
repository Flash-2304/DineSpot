import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

interface Booking {
  _id: string;
  restaurant: { name: string; city: string };
  date: string;
  time: string;
  partySize: number;
  status: string;
}

export const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = async () => {
    const res = await api.get("/bookings/my");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancel = async (id: string) => {
    try {
      await api.post(`/bookings/${id}/cancel`);
      toast.success("Booking cancelled");
      fetchBookings();
    } catch {
      toast.error("Could not cancel booking");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-xl font-bold mb-6">My Bookings</h1>
      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="flex justify-between items-center border rounded-xl p-4">
            <div>
              <p className="font-semibold">{b.restaurant?.name}</p>
              <p className="text-sm text-gray-500">{b.date} at {b.time} · {b.partySize} guests</p>
              <span className="text-xs uppercase tracking-wide text-brand">{b.status}</span>
            </div>
            {b.status === "pending" || b.status === "confirmed" ? (
              <button onClick={() => cancel(b._id)} className="text-sm text-red-600">
                Cancel
              </button>
            ) : null}
          </div>
        ))}
        {bookings.length === 0 && <p className="text-gray-500">No bookings yet.</p>}
      </div>
    </div>
  );
};
