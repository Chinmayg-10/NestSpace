import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const WelcomePage = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/listings");
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>🎉 Welcome, {user?.name || "User"}!</h1>
        <p>We’re excited to have you on <strong>Real Estate Listings</strong>.</p>
        <p className="fade-text">Redirecting you to your dashboard...</p>

        {/* Loader animation */}
        <div className="loader"></div>

        {/* Manual redirect option */}
        <button
          className="btn-primary mt-4"
          onClick={() => navigate("/listings")}
        >
          Go to Dashboard Now
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;

