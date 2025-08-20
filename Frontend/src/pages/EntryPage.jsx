import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";

export default function EntryPage() {
  const { user, openAuthModal, showModal, closeAuthModal } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/home");
    } else {
      openAuthModal();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80')`
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Navbar (no button here) */}
      <header className="relative z-10 flex justify-start items-center p-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
          NestSpace
        </h1>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6">
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Discover Your Dream Home with <span className="text-primary">NestSpace</span>
        </motion.h2>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
          Explore listings, schedule visits, and manage your favorite properties—all in one place.
        </p>
        <motion.button
          onClick={handleGetStarted}
          className="px-8 py-4 bg-primary text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:bg-primary/90 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-sm text-gray-300 py-6">
        © {new Date().getFullYear()} NestSpace. All rights reserved.
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={showModal} onClose={closeAuthModal} />
    </div>
  );
}


