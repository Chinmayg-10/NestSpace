import { useLocation, useNavigate } from "react-router-dom";
import ScheduleForm from "./ScheduleForm";
import api from "../services/Api";
import "../App.css";

const SchedulePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const property = state?.property;

  const handleSubmit = async (viewingData) => {
    try {
      if (!property?._id) {
        alert("⚠ Invalid property details!");
        return;
      }

      const result = await api.scheduleViewing(viewingData);

      if (result.success) {
        alert("✅ Viewing scheduled successfully!");
        navigate("/listings"); // Redirect to listings after success
      } else {
        alert("⚠ " + (result.message || "Something went wrong!"));
      }
    } catch (e) {
      console.error("Error scheduling viewing:", e);
      alert("❌ Error submitting form. Please try again.");
    }
  };

  if (!property)
    return (
      <p className="error-message">
        ⚠ No property data passed. <br />
        <button className="btn-primary mt-3" onClick={() => navigate("/listings")}>
          Go Back to Listings
        </button>
      </p>
    );

  return (
    <div className="schedule-page-container">
      <div className="schedule-page-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <ScheduleForm property={property} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default SchedulePage;

