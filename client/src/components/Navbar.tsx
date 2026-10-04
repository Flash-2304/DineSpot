import { Link, useNavigate } from "react-router-dom";
import { UtensilsCrossed, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-10">
      <Link to="/" className="flex items-center gap-2 font-bold text-brand text-lg">
        <UtensilsCrossed size={22} /> DineSpot
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link to="/">Restaurants</Link>
        {user?.role === "customer" && <Link to="/my-bookings">My Bookings</Link>}
        {user?.role === "owner" && <Link to="/owner">Owner Dashboard</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}

        {user ? (
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-1 text-red-600"
          >
            <LogOut size={16} /> Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="bg-brand text-white px-3 py-1.5 rounded-md">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
