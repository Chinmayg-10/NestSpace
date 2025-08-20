import { useState, useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import API from "../api";

export default function AuthModal({ isOpen, onClose }) {
  const { setUser, setToken } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen, isLogin]);

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "" });
    setError("");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await API.post(endpoint, payload);

      setUser(res.data.user);
      setToken(res.data.token);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      resetForm();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isLogin ? "Login failed. Try again." : "Signup failed. Try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputs = [
    !isLogin && {
      label: "Full Name",
      name: "name",
      type: "text",
      ref: firstInputRef,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      ref: isLogin ? firstInputRef : null,
    },
    { label: "Password", name: "password", type: "password" },
  ].filter(Boolean);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.form
        onSubmit={handleAuth}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-gray-800 dark:text-white text-gray-800 p-6 rounded-lg w-96 shadow-xl flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 p-2 rounded mb-3 text-sm">
            {error}
          </p>
        )}

        {inputs.map(({ label, name, type, ref }) => (
          <input
            key={name}
            name={name}
            type={type}
            placeholder={label}
            ref={ref}
            value={formData[name]}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded bg-gray-50 dark:bg-gray-700"
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-4 py-2 rounded w-full mb-3"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-indigo-600 dark:text-indigo-400 mb-2"
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>

        <button
          type="button"
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="w-full text-gray-600 dark:text-gray-300"
        >
          Cancel
        </button>
      </motion.form>
    </div>
  );
}
