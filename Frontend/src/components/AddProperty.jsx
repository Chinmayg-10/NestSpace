import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";
import "../App.css";

const AddProperty = ({ user, role, onPropertyAdded }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    price: "",
    type: "rent",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    image: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Pass ownerId with the property data
      await api.addProperty({ ...formData, ownerId: user._id });

      if (onPropertyAdded) onPropertyAdded(); // Refresh properties in App.jsx
      navigate("/listings"); // Redirect to listings page
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property. Try again!");
    }
  };

  return (
    <div className="add-property-container">
      <h2 className="form-title">🏡 Add a New Property</h2>
      <form className="add-property-form" onSubmit={handleSubmit}>
        {/* All your inputs remain the same */}
        <input type="text" name="title" placeholder="Title ..." value={formData.title} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address ..." value={formData.address} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price ..." value={formData.price} onChange={handleChange} required />
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="rent">For Rent</option>
          <option value="sale">For Sale</option>
        </select>
        <input type="number" name="bedrooms" placeholder="Bedrooms ..." value={formData.bedrooms} onChange={handleChange} required />
        <input type="number" name="bathrooms" placeholder="Bathrooms ..." value={formData.bathrooms} onChange={handleChange} required />
        <input type="number" name="sqft" placeholder="Sqft ..." value={formData.sqft} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL ..." value={formData.image} onChange={handleChange} required />
        <textarea name="description" placeholder="Description ..." value={formData.description} onChange={handleChange} rows="4" required />
        <button type="submit" className="btn-submit">➕ Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;

