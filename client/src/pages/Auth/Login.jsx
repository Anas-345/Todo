import { Link, useNavigate } from "react-router";
import InputField from "../../components/InputField";
import { useState } from "react";
import { handleLogin } from "../../services/axios";
import notification from "../../functions/notification";
import { useAuth } from "../../context/AuthContextProvider";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { readProfile } = useAuth();

  function handleChange(e, content) {
    setUser((prev) => ({ ...prev, [content.toLowerCase()]: e.target.value }));
  }

  async function handleClick(path) {
    let { email, password } = user;
    email = email.trim();

    if (!email || !password)
      return notification({
        success: false,
        message: "Please fill all input fields",
      });
    const token = await handleLogin(email, password);
    if (!token) return;
    localStorage.setItem("token", token);
    readProfile(token);
    navigate(path);
  }
  return (
    <>
      <h1 className="text-2xl font-semibold text-white mb-6">Welcome Back</h1>

      <div className="flex flex-col gap-4">
        {[
          {
            type: "email",
            content: "Email",
            placeholder: "Enter your email",
          },
          {
            type: "password",
            content: "Password",
            placeholder: "Enter password",
          },
        ].map((field) => (
          <InputField
            key={field.content}
            type={field.type}
            content={field.content}
            placeholder={field.placeholder}
            handleChange={handleChange}
          />
        ))}

        <button
          className="mt-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer"
          onClick={() => handleClick("/")}
        >
          Login
        </button>
      </div>

      <p className="text-gray-500 text-sm text-center mt-4">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
        >
          Register
        </Link>
      </p>
    </>
  );
}
