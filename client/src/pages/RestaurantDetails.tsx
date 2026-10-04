import { useEffect, useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

interface Restaurant {
  _id: string;
  name: string;
  description: string;
  city: string;
  address: string;
  cuisine: string[];
  image?: string;
}

export const RestaurantDetails = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const res = await api.get(`/restaurants/${slug}`);
      setRestaurant(res.data);
    };
    fetchRestaurant();
  }, [slug]);

  const handleBook = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in to book a table");
    if (!restaurant) return;

    setBooking(true);
    try {
      await api.post("/bookings", { restaurant: restaurant._id, date, time, partySize });
      toast.success("Table booked!");
    } catch {
      toast.error("Booking failed, try a different time");
    } finally {
      setBooking(false);
    }
  };

  if (!restaurant) return <p className="p-8 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-8">
      <div>
        <div className="h-56 bg-gray-200 rounded-xl mb-4">
          {restaurant.image && (
            <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover rounded-xl" />
          )}
        </div>
        <h1 className="text-2xl font-bold">{restaurant.name}</h1>
        <p className="text-gray-500">{restaurant.address}, {restaurant.city}</p>
        <p className="text-sm text-gray-400 mt-2">{restaurant.cuisine.join(", ")}</p>
        <p className="mt-4 text-gray-700">{restaurant.description}</p>
      </div>

      <form onSubmit={handleBook} className="bg-white border rounded-xl p-6 h-fit space-y-4">
        <h2 className="font-semibold">Reserve a table</h2>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded-lg px-4 py-2" required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full border rounded-lg px-4 py-2" required />
        <input
          type="number"
          min={1}
          value={partySize}
          onChange={(e) => setPartySize(Number(e.target.value))}
          className="w-full border rounded-lg px-4 py-2"
        />
        <button disabled={booking} className="w-full bg-brand text-white py-2 rounded-lg disabled:opacity-60">
          {booking ? "Booking..." : "Book Table"}
        </button>
      </form>
    </div>
  );
};
