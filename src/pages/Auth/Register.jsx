import { useNavigate } from "react-router";
import InputField from "../../components/InputField";
import { handleRouter } from "../../functions/handleRoute";
import { useAuth } from "../../context/AuthContextProvider";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const navigate = useNavigate();

  const { users, setUsers } = useAuth();

  function handleChange(e, content) {
    setUser((prev) => ({ ...prev, [content.toLowerCase()]: e.target.value }));
  }

  function handleClick(navigate, path) {
    setUser((prev) => ({ ...prev, name: name.trim(), email: email.trim() }));

    const { name, email, password, confirm } = user;

    const findEmail = users.find((user) => user.email === email);
    if (!name || !email || !password || !confirm) {
      toast.error("Please fill all input fields");
      return;
    } else if (password !== confirm) {
      toast.error("Passwords are not same");
      return;
    } else if (findEmail) {
      toast.error("User already exists");
      return;
    }

    setUsers((prev) => [
      ...prev,
      { name, email, password, createdAt: new Date().getTime(), active: false },
    ]);
    handleRouter(navigate, path);
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
          onClick={() => handleClick(navigate, "/auth/login")}
        >
          Register
        </button>
      </div>

      <p className="text-gray-500 text-sm text-center mt-4">
        Already have an account?{" "}
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
