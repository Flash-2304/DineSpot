import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

interface Props {
  slug: string;
  name: string;
  city: string;
  cuisine: string[];
  image?: string;
}

export const RestaurantCard = ({ slug, name, city, cuisine, image }: Props) => (
  <Link
    to={`/restaurants/${slug}`}
    className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
  >
    <div className="h-40 bg-gray-200">
      {image && <img src={image} alt={name} className="w-full h-full object-cover" />}
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-900">{name}</h3>
      <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
        <MapPin size={14} /> {city}
      </p>
      <p className="text-xs text-gray-400 mt-2">{cuisine.join(", ")}</p>
    </div>
  </Link>
);
