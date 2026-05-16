import { useNavigate } from "react-router";
import InputField from "../../components/InputField";
import { handleRouter } from "../../functions/handleRoute";
import { useAuth } from "../../context/AuthContextProvider";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const { users, setUsers } = useAuth();

  function handleChange(e, content) {
    setUser((prev) => ({ ...prev, [content.toLowerCase()]: e.target.value }));
  }

  function handleClick(navigate, path) {
    const findUser = users.find(
      (u) => u.email === user.email && u.password === user.password,
    );
    if (!findUser) {
      toast.error("Email or password is incorrect");
      return;
    }
    setUsers((prev) =>
      prev.map((u) =>
        u.email === findUser.email ? { ...u, active: true } : u,
      ),
    );
    handleRouter(navigate, path);
  }
  return (
    <>
      <h1 className="text-2xl font-semibold text-white mb-6">Create Account</h1>

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
          onClick={() => handleClick(navigate, "/")}
        >
          Login
        </button>
      </div>

      <p className="text-gray-500 text-sm text-center mt-4">
        Don't have an account?{" "}
        <span
          className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
          onClick={() => handleRouter(navigate, "/auth/register")}
        >
          Register
        </span>
      </p>
    </>
  );
}
