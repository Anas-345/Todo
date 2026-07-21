import { useState } from "react";
import { useTodo } from "../../context/TodoContextProvider";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { todos, setTodos } = useTodo();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    privacy: "all",
    schedule: "all",
  });

  function toggleFilter(group, value) {
    setFilters((prev) => ({
      ...prev,
      [group]: prev[group] === value ? "all" : value,
    }));
  }

  function markDone(id) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "done" } : t
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  const filtered = todos.filter(
    (t) =>
      (filters.status === "all" || t.status === filters.status) &&
      (filters.priority === "all" || t.priority === filters.priority) &&
      (filters.privacy === "all" || t.privacy === filters.privacy) &&
      (filters.schedule === "all" || t.schedule === filters.schedule)
  );

  function formatDate(ts) {
    return new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const chipClass = (group, value) =>
    `flex items-center gap-1 px-3 py-1 rounded-full text-xs border cursor-pointer transition-colors duration-150 ${
      filters[group] === value
        ? "bg-indigo-600 border-indigo-600 text-white"
        : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"
    }`;

  const priorityBadge = {
    high: "bg-red-950 text-red-400",
    medium: "bg-amber-950 text-amber-400",
    low: "bg-green-950 text-green-400",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
          <p className="text-gray-500 text-sm">Your todos at a glance</p>
        </div>
        <button
          onClick={() => navigate("/todo")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-md transition-colors duration-150 cursor-pointer"
        >
          + Add Todo
        </button>
      </div>

      <div className="mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Filters</p>
        <div className="flex flex-wrap gap-2">
          {[
            { group: "status", value: "pending", label: "Pending" },
            { group: "status", value: "done", label: "Done" },
            { group: "priority", value: "high", label: "High" },
            { group: "priority", value: "medium", label: "Medium" },
            { group: "priority", value: "low", label: "Low" },
            { group: "privacy", value: "private", label: "Private" },
            { group: "privacy", value: "public", label: "Public" },
            { group: "schedule", value: "daily", label: "Daily" },
            { group: "schedule", value: "once", label: "Once" },
          ].map((chip) => (
            <button
              key={chip.group + chip.value}
              className={chipClass(chip.group, chip.value)}
              onClick={() => toggleFilter(chip.group, chip.value)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">
        Your Todos ({filtered.length})
      </h3>

      {filtered.length === 0 ? (
        <p className="text-gray-600 text-sm text-center py-10">No todos match your filters.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((t) => (
            <div
              key={t.id}
              className={`bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 flex items-start gap-3 ${t.status === "done" ? "opacity-50" : ""}`}
            >
              <button
                onClick={() => markDone(t.id)}
                title={t.status === "done" ? "Mark as pending" : "Mark as done"}
                className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 cursor-pointer transition-colors duration-150 ${
                  t.status === "done"
                    ? "bg-teal-600 border-teal-600"
                    : "border-gray-600 hover:border-teal-500"
                }`}
              >
                {t.status === "done" && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className={`text-sm font-medium text-white ${t.status === "done" ? "line-through" : ""}`}>
                    {t.name}
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityBadge[t.priority]}`}>
                      {t.priority}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-950 text-blue-400">
                      {t.privacy}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-purple-950 text-purple-400">
                      {t.schedule}
                    </span>

                    <button
                      onClick={() => deleteTodo(t.id)}
                      title="Delete todo"
                      className="ml-1 w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-red-950 cursor-pointer transition-colors duration-150"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                {t.description && (
                  <p className="text-xs text-gray-500 mt-1">{t.description}</p>
                )}
                <p className="text-xs text-gray-600 mt-1">{formatDate(t.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}