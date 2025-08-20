import { useEffect, useState, useContext } from "react";
import API from "../api";
import PropertyCard from "../components/PropertyCard";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";

export default function Listings() {
  const { user, openAuthModal } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      openAuthModal();
      return;
    }

    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await API.get("/properties");
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [user, openAuthModal]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-xl font-semibold">
        Loading properties...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Discover Your Dream Home</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          Login or create an account to explore exclusive property listings and save your favorites.
        </p>
        <button
          onClick={openAuthModal}
          className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Listings</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {properties.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No properties available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <PropertyCard key={p._id} property={p} />
          ))}
        </div>
      )}

      {/* Include modal for fallback */}
      <AuthModal isOpen={!user} onClose={() => {}} />
    </div>
  );
}
