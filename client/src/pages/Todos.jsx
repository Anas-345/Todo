import { useState } from "react";
import InputField from "../components/InputField";
import { toast } from "react-toastify";
import { useTodo } from "../context/TodoContextProvider";
import { handleRouter } from "../functions/handleRoute";
import { useNavigate } from "react-router";

export default function Todos() {
  const [todo, setTodo] = useState({
    name: "",
    description: "",
    priority: "low",
    privacy: "private",
    schedule: "once",
  });
  const navigate = useNavigate();

  const { todos, setTodos } = useTodo();

  function getRandomId() {
    return (
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
    );
  }

  function handleChange(e, content) {
    setTodo((prev) => ({ ...prev, [content.toLowerCase()]: e.target.value }));
  }

  function handleToggle(field, value) {
    setTodo((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log("todo", todo);
  }

  function handleClick(path) {
    const { name } = todo;
    const todoExist = todos.find((t) => t.name === name);
    if (!name) {
      toast.error("Please enter name of todo");
      return;
    } else if (todoExist) {
      setTodos((prev) =>
        prev.map((t) =>
          t.name === todoExist.name
            ? { ...t, status: "pending", createdAt: new Date().getTime() }
            : t,
        ),
      );
      return;
    }
    setTodos((prev) => [
      ...prev,
      {
        ...todo,
        createdAt: new Date().getTime(),
        status: "pending",
        id: getRandomId(),
      },
    ]);
    toast.success("Todo added successfully");
    handleRouter(navigate, path);
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Add your Todos
        </h2>

        <div className="flex flex-col gap-4">
          {[
            { type: "text", content: "Name", placeholder: "Enter todo name" },
            {
              type: "text",
              content: "Description",
              placeholder: "Enter description of todo",
            },
          ].map((todo) => (
            <InputField
              key={todo.content}
              type={todo.type}
              content={todo.content}
              placeholder={todo.placeholder}
              handleChange={handleChange}
            />
          ))}

          <div className="flex flex-col gap-1">
            <label
              htmlFor="priority"
              className="text-sm text-gray-400 font-medium"
            >
              Priority
            </label>
            <select
              id="priority"
              className="bg-gray-800 border border-gray-700 text-gray-100 rounded-md px-3 py-2 text-sm cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-150"
              onChange={(e) => handleChange(e, "priority")}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Privacy</label>
            <div className="flex rounded-md border border-gray-700 overflow-hidden">
              <button
                className={`flex-1 py-2 text-sm transition-colors duration-150 cursor-pointer ${todo.privacy === "private" ? "bg-indigo-600 text-white" : " bg-gray-800 text-gray-400 hover:text-white"}`}
                onClick={() => handleToggle("privacy", "private")}
              >
                Private
              </button>
              <button
                className={`flex-1 py-2 text-sm transition-colors duration-150 cursor-pointer ${todo.privacy === "public" ? "bg-indigo-600 text-white" : " bg-gray-800 text-gray-400 hover:text-white"}`}
                onClick={() => handleToggle("privacy", "public")}
              >
                Public
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Schedule
            </label>
            <div className="flex rounded-md border border-gray-700 overflow-hidden">
              <button
                className={`flex-1 py-2 text-sm transition-colors duration-150 cursor-pointer ${todo.schedule === "once" ? "bg-indigo-600 text-white" : " bg-gray-800 text-gray-400 hover:text-white"}`}
                onClick={() => handleToggle("schedule", "once")}
              >
                Once
              </button>
              <button
                className={`flex-1 py-2 text-sm transition-colors duration-150 cursor-pointer ${todo.schedule === "daily" ? "bg-indigo-600 text-white" : " bg-gray-800 text-gray-400 hover:text-white"}`}
                onClick={() => handleToggle("schedule", "daily")}
              >
                Daily
              </button>
            </div>
          </div>

          <button
            className="mt-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer"
            onClick={() => handleClick("/dashboard")}
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
}
