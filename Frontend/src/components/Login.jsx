import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [state, SetState] = useState("Login");
  const [name, Setname] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setshowPassword] = useState(false);

  const navigate = useNavigate();
  const Togglepassword = () => setshowPassword((c) => !c);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Login") {
        // Login request
        const { data } = await axios.post(
          "http://localhost:5000/api/user/login",
          { email, password }
        );

        if (data.success) {
          // Save user & role
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("role", data.user.role);
          setUser(data.user);

          // Redirect to welcome screen
          navigate("/welcome");
        } else {
          alert(data.message);
        }
      } else {
        // Signup request
        const { data } = await axios.post(
          "http://localhost:5000/api/user/register",
          { name, email, password, role }
        );

        if (data.success) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("role", data.user.role);
          setUser(data.user);

          // After signup, also show welcome page
          navigate("/welcome");
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  // Disable background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white relative p-10 rounded-xl text-slate-500 w-full max-w-md shadow-lg"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium mb-2">
          {state}
        </h1>
        <p className="text-sm text-blue-900 mb-6">
          {state === "Login"
            ? "Welcome back! Please sign in to continue"
            : "Create your account"}
        </p>

        {/* Sign up fields */}
        {state !== "Login" && (
          <>
            {/* Name */}
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-3">
              <img src={assets.profile_icon} alt="" className="w-4 h-4" />
              <input
                onChange={(e) => Setname(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="outline-none text-sm w-full"
              />
            </div>

            {/* Role */}
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-3">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="outline-none text-sm w-full"
              >
                <option value="user">Buyer / Renter</option>
                <option value="owner">Property Owner</option>
              </select>
            </div>
          </>
        )}

        {/* Email */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-3">
          <img src={assets.email_icon} alt="" className="w-4 h-4" />
          <input
            onChange={(e) => Setemail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
            className="outline-none text-sm w-full"
          />
        </div>

        {/* Password */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-3">
          <img src={assets.lock_icon} alt="" className="w-4 h-4" />
          <div className="relative w-full">
            <input
              onChange={(e) => Setpassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="outline-none text-sm w-full"
            />
            <button
              type="button"
              onClick={Togglepassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-lg"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <h3 className="text-sm mt-5 text-blue-500 cursor-pointer">
          Forgot password?
        </h3>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-full py-2 mt-4 hover:bg-blue-600"
        >
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {/* Switch Login/Signup */}
        {state === "Login" ? (
          <p
            className="text-sm mt-4 text-center"
            onClick={() => SetState("Sign up")}
          >
            Don’t have an account?
            <span className="text-blue-500 underline cursor-pointer">
              {" "}Sign up
            </span>
          </p>
        ) : (
          <p
            className="text-sm mt-4 text-center"
            onClick={() => SetState("Login")}
          >
            Already have an account?
            <span className="text-blue-500 underline cursor-pointer">
              {" "}Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
}


