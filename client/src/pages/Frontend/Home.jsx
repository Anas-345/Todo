import { useEffect, useState } from "react";
import { useTodo } from "../../context/TodoContextProvider";
import { ClipboardList, ListFilter } from "lucide-react";
import { handlePublicTodos } from "../../services/axios";
import Loader from "../../components/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { todos, setTodos } = useTodo();
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    privacy: "all",
    schedule: "all",
  });

  const filtered = todos.filter(
    (t) =>
      (filters.status === "all" || t.status === filters.status) &&
      (filters.priority === "all" || t.priority === filters.priority) &&
      (filters.privacy === "all" || t.privacy === filters.privacy) &&
      (filters.schedule === "all" || t.schedule === filters.schedule),
  );

  function formatDate(ts) {
    return new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const priorityBadge = {
    high: "bg-red-950 text-red-400 ring-1 ring-red-900",
    medium: "bg-amber-950 text-amber-400 ring-1 ring-amber-900",
    low: "bg-green-950 text-green-400 ring-1 ring-green-900",
  };

  async function getTodos() {
    const t = await handlePublicTodos();
    setTodos(t);
    setIsLoading(false);
  }

  useEffect(() => {
    getTodos();
  }, []);

  function updateFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  const selectClass =
    "bg-gray-900 border border-gray-800 text-gray-300 text-xs sm:text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 cursor-pointer w-full sm:w-auto";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col items-center justify-between mb-6 sm:mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Home
        </h2>
        <p className="text-gray-500 text-sm mt-1">Todos at a glance</p>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h3 className="text-sm text-gray-500 uppercase tracking-wider">
              Public Todos ({filtered.length})
            </h3>

            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 col-span-2 sm:hidden text-gray-600 text-xs mb-1">
                <ListFilter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </div>
              <select
                className={selectClass}
                value={filters.status}
                onChange={(e) => updateFilter("status", e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="done">Done</option>
              </select>
              <select
                className={selectClass}
                value={filters.priority}
                onChange={(e) => updateFilter("priority", e.target.value)}
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                className={selectClass}
                value={filters.privacy}
                onChange={(e) => updateFilter("privacy", e.target.value)}
              >
                <option value="all">All Privacy</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              <select
                className={selectClass}
                value={filters.schedule}
                onChange={(e) => updateFilter("schedule", e.target.value)}
              >
                <option value="all">All Schedule</option>
                <option value="today">Today</option>
                <option value="upcoming">Upcoming</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          {/* Empty state */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4">
              <div className="mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-950 to-gray-900 ring-1 ring-gray-800">
                <ClipboardList className="h-8 w-8 sm:h-10 sm:w-10 text-teal-500" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white">
                No Public Todos Yet
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                There aren't any public todos available right now. Be the
                first to share one and get the community started!
              </p>
            </div>
          ) : (
            /* Responsive grid: 1 col on mobile, 2 on tablet+ */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {filtered.map((t) => (
                <div
                  key={t.id}
                  className={`bg-gray-900 border border-gray-800 rounded-xl px-4 py-3.5 flex flex-col gap-2 transition-opacity duration-150 hover:border-gray-700 ${
                    t.status === "done" ? "opacity-50" : ""
                  }`}
                >
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-sm font-medium text-white break-words ${
                        t.status === "done" ? "line-through" : ""
                      }`}
                    >
                      {t.name}
                    </p>

                    {/* Status shown as text badge, not an interactive element */}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                        t.status === "done"
                          ? "bg-teal-950 text-teal-400 ring-1 ring-teal-900"
                          : "bg-gray-800 text-gray-400 ring-1 ring-gray-700"
                      }`}
                    >
                      {t.status === "done" ? "Done" : "Pending"}
                    </span>
                  </div>

                  {/* Description */}
                  {t.description && (
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {t.description}
                    </p>
                  )}

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityBadge[t.priority]}`}
                    >
                      {t.priority}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-950 text-blue-400 ring-1 ring-blue-900">
                      {t.privacy}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-purple-950 text-purple-400 ring-1 ring-purple-900">
                      {t.schedule}
                    </span>
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-600 mt-1">
                    {formatDate(t.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}