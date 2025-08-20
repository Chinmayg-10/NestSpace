import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import PropertyCarousel from "../components/PropertyCarousel";
import WishlistButton from "../components/WishlistButton";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [scheduleLoading, setScheduleLoading] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchProperty = async () => {
      try {
        const res = await API.get(`/properties/${id}`);
        if (isMounted) setProperty(res.data);
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Failed to load property details.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProperty();
    return () => { isMounted = false; };
  }, [id]);

  const handleSchedule = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      alert("Please select both date and time!");
      return;
    }

    try {
      setScheduleLoading(true);
      await API.post(`/properties/${id}/schedule-visit`,{ user:user._id,property:id,date, time });
      alert(`✅ Your visit is scheduled on ${date} at ${time}!`);
      setScheduleOpen(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to schedule visit. Please try again later.");
    } finally {
      setScheduleLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading property details...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );

  if (!property)
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Property not found.</p>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{property.title || "Untitled Property"}</h1>

      <PropertyCarousel
        images={Array.isArray(property.images) && property.images.length > 0 ? property.images : ["/placeholder.png"]}
      />

      <p className="mt-4 text-gray-700">{property.description || "No description provided."}</p>

      <p className="mt-2 font-bold text-lg">
        {property.price != null
          ? `$${Number(property.price).toLocaleString()}`
          : "Contact for price"}
      </p>

      <div className="mt-4 flex gap-4">
        {user && (
          <WishlistButton propertyId={id} initial={user.wishlist?.includes(id)} />
        )}

        {user && (
          <button
            onClick={() => setScheduleOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Schedule Visit
          </button>
        )}
      </div>

      {/* Schedule Visit Modal */}
      {scheduleOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Schedule a Visit
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSchedule}>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setScheduleOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={scheduleLoading}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  {scheduleLoading ? "Scheduling..." : "Confirm Visit"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

