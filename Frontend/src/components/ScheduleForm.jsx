import { useState } from "react";
import "../App.css";
import "../index.css";

const ScheduleForm = ({ property, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!property?._id) {
      alert("Invalid property details!");
      return;
    }

    const viewingData = {
      ...formData,
      propertyId: property._id,
    };

    // Send data back to parent
    onSubmit(viewingData);

    // Reset form after submit
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      message: "",
    });
  };

  return (
    <form className="schedule-form" onSubmit={handleSubmit}>
      <h2 className="form-title">📅 Schedule a Viewing</h2>
      <h3 className="property-title">{property?.title}</h3>
      <p className="property-address">📍 {property?.address}</p>

      {/* Input Fields */}
      <div className="form-group">
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <textarea
          name="message"
          placeholder="Message (optional)"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      {/* Action Buttons */}
      <div className="form-actions">
        <button className="btn-primary" type="submit">
          ✅ Submit
        </button>
        {onCancel && (
          <button className="btn-secondary" type="button" onClick={onCancel}>
            ❌ Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ScheduleForm;


