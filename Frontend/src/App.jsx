import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import api from "./services/Api";

import RoleSelection from "./components/RoleSelection";
import Login from "./components/Login";
import WelcomePage from "./components/WelcomePage";
import SchedulePage from "./components/SchedulePage";
import FilterBar from "./components/FilterBar";
import PropertyCard from "./components/PropertyCard";
import MapView from "./components/MapView";
import PropertyDetailsModal from "./components/PropertyDetailsModal";
import Header from "./components/Header";
import AddProperty from "./components/AddProperty";
import MyProperties from "./components/MyProperties";
import sampleProperties from "./components/SampleData";

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const navigate = useNavigate();

  // ✅ Load properties
  const loadProperties = async () => {
    try {
      const res = await api.getProperties();
      setProperties(res.length === 0 ? sampleProperties : res);
      setLoading(false);
    } catch (error) {
      console.error("Error loading properties:", error);
      setProperties(sampleProperties);
      setLoading(false);
    }
  };

  // ✅ Handle Wishlist
  const handleWishlist = async (property) => {
    if (!user) {
      alert("Login to add to wishlist!");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/user/wishlist/${property._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        }
      );
      const data = await res.json();

      if (data.success) {
        const updatedUser = { ...user, wishlist: data.wishlist };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Wishlist updated!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      alert("Something went wrong!");
    }
  };

  // Auto load properties when role is set
  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
      loadProperties();
    }
  }, [role]);

  // ✅ Filter properties
  useEffect(() => {
    let filtered = [...properties];
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter((p) => p.type === filters.type);
    }
    if (filters.minPrice) {
      filtered = filtered.filter((p) => p.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseInt(filters.maxPrice));
    }
    setFilteredProperties(filtered);
  }, [properties, filters]);

  return (
    <Routes>
      {/* 1️⃣ Role Selection */}
      <Route
        path="/"
        element={
          <RoleSelection
            setRole={(role) => {
              setRole(role);
              localStorage.setItem("role", role);
              navigate("/login");
            }}
          />
        }
      />

      {/* 2️⃣ Login */}
      <Route
        path="/login"
        element={
          <Login
            setUser={(userData) => {
              setUser(userData);
              navigate("/welcome");
            }}
          />
        }
      />

      {/* 3️⃣ Welcome Page */}
      <Route path="/welcome" element={<WelcomePage user={user} />} />

      {/* 4️⃣ Listings */}
      <Route
        path="/listings"
        element={
          <div className="App">
            <Header
              viewMode={viewMode}
              setViewMode={setViewMode}
              isLoggedIn={!!user}
              role={role}
              handleLogin={() => navigate("/login")}
              handleLogout={() => {
                setUser(null);
                setRole(null);
                localStorage.clear();
                navigate("/");
              }}
              handleAddProperty={() => navigate("/add-property")}
              handleMyProperties={() => navigate("/my-properties")}
            />

            {/* Filters for user role */}
            {role === "user" && (
              <FilterBar filters={filters} onFiltersChange={setFilters} />
            )}

            {loading ? (
              <div className="loading">Loading...</div>
            ) : viewMode === "grid" ? (
              <div className="properties-grid">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                    user={user}
                    role={role}
                    setUser={setUser}
                    onClick={() => {
                      setSelectedProperty(property);
                      setShowDetailsModal(true);
                    }}
                    onScheduleViewing={() =>
                      navigate("/schedule", { state: { property } })
                    }
                  />
                ))}
              </div>
            ) : (
              <MapView
                properties={filteredProperties}
                selectedProperty={selectedProperty}
                onMarkerClick={(property) => {
                  setSelectedProperty(property);
                  setShowDetailsModal(true);
                }}
              />
            )}

            <PropertyDetailsModal
              property={selectedProperty}
              isOpen={showDetailsModal}
              onClose={() => setShowDetailsModal(false)}
              user={user}
              onAddToWishlist={handleWishlist}
            />
          </div>
        }
      />

      {/* 5️⃣ Schedule Page */}
      <Route path="/schedule" element={<SchedulePage user={user} />} />

      {/* 6️⃣ Add Property Page */}
      <Route
        path="/add-property"
        element={
          <AddProperty
            user={user}
            role={role}
            onPropertyAdded={loadProperties} // refresh after adding
          />
        }
      />

      {/* 7️⃣ My Properties (Owner Only) */}
      <Route path="/my-properties" element={<MyProperties user={user} />} />
    </Routes>
  );
};

export default App;




