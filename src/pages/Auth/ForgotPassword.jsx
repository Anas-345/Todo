import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContextProvider";
import InputField from "../../components/InputField";
import { handleRouter } from "../../functions/handleRoute";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const { users } = useAuth();

  function handleChange(e, content) {
    setUser((prev) => ({ ...prev, [content.toLowerCase()]: e.target.value }));
  }

  function handleClick() {
    if (!user.email.trim()) {
      toast.error("Please fill input field");
      return;
    }
    const findEmail = users.find((u) => u.email === user.email);
    setUser(findEmail);
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-white mb-6">Create Account</h1>

      <div className="flex flex-col gap-4">
        <InputField
          type="email"
          content="Email"
          placeholder="Enter your email"
          handleChange={handleChange}
        />

        {user.password && <p>Your password is {user.password}</p>}

        <button
          className="mt-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer"
          onClick={handleClick}
        >
          Forgot Password
        </button>
      </div>

      <p className="text-gray-500 text-sm text-center mt-4">
        Remember Password?{" "}
        <span
          className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
          onClick={() => handleRouter(navigate, "/auth/login")}
        >
          Login
        </span>
      </p>
    </>
  );
}
