import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import PropertyCard from "../components/PropertyCard";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, openAuthModal } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      openAuthModal(); // open login modal if not logged in
      return;
    }

    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await API.get("/properties");
        setProperties(res.data.slice(0, 6)); // show 6 featured properties
      } catch (err) {
        console.error(err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [user, openAuthModal]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">
          Find Your Dream Home
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Explore exclusive listings tailored for you. Whether renting or buying,
          we make your property search effortless.
        </p>
        <button
          onClick={() => navigate("/listings")}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg shadow-lg transition"
        >
          View All Listings
        </button>
      </section>

      {/* Featured Properties */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Featured Properties
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading properties...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : properties.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No properties found.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {properties.map((p) => (
              <motion.div
                key={p._id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
