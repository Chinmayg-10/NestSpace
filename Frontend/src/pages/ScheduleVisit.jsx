import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

export default function ScheduleVisit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      alert("Please select both date and time!");
      return;
    }

    try {
      setLoading(true);
      await API.post(`/properties/${id}/schedule-visit`, { date, time });

      // Show nice confirmation alert
      alert(`✅ Your visit has been scheduled on ${date} at ${time}!`);

      // Optionally navigate back to property detail page
      navigate(`/properties/${id}`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to schedule visit. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 font-semibold">You must be logged in to schedule a visit.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Schedule a Visit
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">Select Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          {loading ? "Scheduling..." : "Confirm Visit"}
        </button>
      </form>
    </div>
  );
}
