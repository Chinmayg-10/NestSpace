import { useNavigate } from "react-router-dom";
import "../App.css";

const RoleSelection = ({ setRole }) => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setRole(role);
    localStorage.setItem("role",role);
    navigate("/login"); // Redirect to listings after selecting role
  };

  return (
    <div className="home-container">
      {/* Background section */}
      <div className="home-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="home-title">🏠 Welcome to Real Estate Listings</h1>
          <p className="home-subtitle">
            Find your dream home or list your property with ease!
          </p>
          <div className="role-buttons">
            <button
              className="btn-primary"
              onClick={() => handleRoleSelect("user")}
            >
              Continue as Buyer
            </button>
            <button
              className="btn-secondary"
              onClick={() => handleRoleSelect("owner")}
            >
              Continue as Property Owner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;


