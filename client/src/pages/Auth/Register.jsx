import { Link, useNavigate } from "react-router";
import InputField from "../../components/InputField";
import { useState } from "react";
import { handleRegister } from "../../services/axios";
import notification from "../../functions/notification";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const navigate = useNavigate();

  function handleChange(e, content) {
    setUser((prev) => ({ ...prev, [content.toLowerCase()]: e.target.value }));
  }

  async function handleClick(path) {
    let { name, email, password, confirm } = user;

    name = name.trim();
    email = email.trim();

    if (!name || !email || !password || !confirm)
      return notification({
        success: false,
        message: "Please fill all input fields",
      });
    else if (password !== confirm)
      return notification({
        success: false,
        message: "Passwords are not same",
      });

    const res = await handleRegister(name, email, password);
    if (res) navigate(path);
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-white mb-6">Create Account</h1>

      <div className="flex flex-col gap-4">
        {[
          { type: "text", content: "Name", placeholder: "Enter your name" },
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
          {
            type: "password",
            content: "Confirm",
            placeholder: "Enter password again",
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
          onClick={() => handleClick("/auth/login")}
        >
          Register
        </button>
      </div>

      <p className="text-gray-500 text-sm text-center mt-4">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
        >
          Login
        </Link>
      </p>
    </>
  );
}
