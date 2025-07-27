import { useEffect, useState } from "react";
import api from "../services/Api";
import "../App.css";

const MyProperties = ({ user }) => {
  const [properties, setProperties] = useState([]);

  const loadMyProperties = async () => {
    try {
      const res = await api.getMyProperties(user._id);
      setProperties(res);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Delete this property?")) return;
    await api.deleteProperty(id);
    loadMyProperties();
  };

  useEffect(() => {
    loadMyProperties();
  }, []);

  return (
    <div className="my-properties">
      <h2>My Properties</h2>
      {properties.length === 0 ? (
        <p>No properties added yet.</p>
      ) : (
        <div className="properties-grid">
          {properties.map((p) => (
            <div key={p._id} className="property-card">
              <img src={p.image} alt={p.title} />
              <h3>{p.title}</h3>
              <p>${p.price}</p>
              <button onClick={() => deleteProperty(p._id)} className="delete-btn">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
