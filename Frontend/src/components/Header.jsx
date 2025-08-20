import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import AuthModal from "./AuthModal";

export default function Header() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
  };

  const buttonClasses = "px-4 py-1 rounded bg-white dark:bg-gray-700 text-primary dark:text-white hover:opacity-90 transition";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Listings", path: "/listings" },
  ];

  return (
    <header className="bg-primary dark:bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => e.key === "Enter" && navigate("/")}
      >
        NestSpace
      </h1>

      <nav className="flex items-center gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`hover:underline ${location.pathname === link.path ? "font-bold underline" : ""}`}
          >
            {link.name}
          </Link>
        ))}

        <button
          onClick={toggleTheme}
          className="px-3 py-1 bg-white dark:bg-gray-700 text-primary dark:text-white rounded hover:opacity-90 transition"
          title="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {user ? (
          <button onClick={handleLogout} className={buttonClasses}>
            Logout
          </button>
        ) : (
          <button onClick={() => setAuthOpen(true)} className={buttonClasses}>
            Login / Signup
          </button>
        )}
      </nav>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}
