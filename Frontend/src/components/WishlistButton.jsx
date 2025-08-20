import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function WishlistButton({ propertyId, initial, onLoginOpen }) {
  const { user } = useContext(AuthContext);
  const [added, setAdded] = useState(initial);
  const [loading, setLoading] = useState(false);

  const toggleWishlist = async () => {
    if (!user) {
      // Trigger login modal if provided
      if (onLoginOpen) return onLoginOpen();
      return console.warn("User must be logged in to wishlist!");
    }

    try {
      setLoading(true);
      // Optimistic UI update
      setAdded((prev) => !prev);

      const res = await API.post(`/properties/${propertyId}/wishlist`);

      // Ensure state matches server response
      if (res.data.includes(propertyId) !== added) {
        setAdded(res.data.includes(propertyId));
      }
    } catch (err) {
      console.error("Wishlist update failed:", err);
      // Revert UI on error
      setAdded((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={toggleWishlist}
      whileTap={{ scale: 0.9 }}
      disabled={loading}
      aria-pressed={added}
      className={`flex items-center justify-center px-3 py-2 rounded-full shadow transition-colors duration-200 ${
        added
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
      }`}
    >
      <Heart
        className={`w-5 h-5 transition-colors duration-200 ${
          added ? "fill-current text-white" : "text-gray-700 dark:text-gray-200"
        }`}
      />
      <span className="ml-1 text-sm">{loading ? "..." : added ? "Saved" : "Save"}</span>
    </motion.button>
  );
}





