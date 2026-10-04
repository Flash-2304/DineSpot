import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth, Role } from "../context/AuthContext";

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("customer");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password, role);
      toast.success("Account created!");
      navigate("/");
    } catch {
      toast.error("Could not create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 px-6">
      <h1 className="text-xl font-bold mb-6">Create your account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="customer">I want to book tables (Customer)</option>
          <option value="owner">I own a restaurant (Owner)</option>
        </select>
        <button
          disabled={loading}
          className="w-full bg-brand text-white py-2 rounded-lg disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-4">
        Already have an account? <Link to="/login" className="text-brand">Log in</Link>
      </p>
    </div>
  );
};
