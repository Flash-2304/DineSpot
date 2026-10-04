import { useEffect, useState } from "react";
import api from "../api/axios";
import { RestaurantCard } from "../components/RestaurantCard";

interface Restaurant {
  _id: string;
  name: string;
  slug: string;
  city: string;
  cuisine: string[];
  image?: string;
}

export const Home = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      const res = await api.get("/restaurants", { params: { search } });
      setRestaurants(res.data);
      setLoading(false);
    };
    fetchRestaurants();
  }, [search]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-1">Find a table</h1>
      <p className="text-gray-500 mb-6">Browse and book restaurants near you.</p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search restaurants..."
        className="w-full md:w-96 border rounded-lg px-4 py-2 mb-8"
      />

      {loading ? (
        <p>Loading restaurants...</p>
      ) : restaurants.length === 0 ? (
        <p className="text-gray-500">No restaurants found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((r) => (
            <RestaurantCard key={r._id} {...r} />
          ))}
        </div>
      )}
    </div>
  );
};
