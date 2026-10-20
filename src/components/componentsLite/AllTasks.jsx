import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AllTasks = () => {
  const [userData, setUserData] = useContext(AuthContext);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [editForm, setEditForm] = useState({
    taskTitle: "",
    taskDesc: "",
    category: "",
    taskDate: "",
  });

  const editTask = (taskId, employeeId) => {
    const employee = userData.employees.find((emp) => emp.id === employeeId);

    const task = employee?.tasks.find((task) => task.id === taskId);

    if (!task) return;

    setEditingTask({ taskId, employeeId });

    setEditForm({
      taskTitle: task.taskTitle ?? "",
      taskDesc: task.taskDesc ?? "",
      category: task.category ?? "",
      taskDate: task.taskDate ?? "",
    });
  };

  const deleteTask = (taskId, employeeId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    const updatedEmployees = userData.employees.map((employee) => {
      if (employee.id !== employeeId) {
        return employee;
      }

      const task = employee.tasks.find((task) => task.id === taskId);

      if (!task) {
        return employee;
      }

      const updatedTaskCount = {
        ...employee.taskCount,
      };

      if (task.newTask) {
        updatedTaskCount.newTask -= 1;
      }

      if (task.active) {
        updatedTaskCount.active -= 1;
      }

      if (task.completed) {
        updatedTaskCount.completed -= 1;
      }

      if (task.failed) {
        updatedTaskCount.failed -= 1;
      }

      return {
        ...employee,

        tasks: employee.tasks.filter((task) => task.id !== taskId),

        taskCount: updatedTaskCount,
      };
    });

    setUserData((prev) => ({
      ...prev,
      employees: updatedEmployees,
    }));

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const handleSaveTask = (e) => {
    e.preventDefault();

    if (!editingTask) return;

    const updatedEmployees = userData.employees.map((employee) => {
      if (employee.id !== editingTask.employeeId) {
        return employee;
      }

      return {
        ...employee,
        tasks: employee.tasks.map((task) =>
          task.id === editingTask.taskId ? { ...task, ...editForm } : task,
        ),
      };
    });

    setUserData((prev) => ({
      ...prev,
      employees: updatedEmployees,
    }));

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    setEditingTask(null);
  };

  const query = searchQuery.trim().toLowerCase();

  const filteredEmployees = (userData?.employees ?? [])
    .map((employee) => ({
      ...employee,
      tasks: (employee.tasks ?? []).filter((task) =>
        [task.taskTitle, task.taskDesc, task.category, employee.firstName].some(
          (value) => value?.toLowerCase().includes(query),
        ),
      ),
    }))
    .filter((employee) => employee.tasks.length > 0);

  const matchingTaskCount = filteredEmployees.reduce(
    (total, employee) => total + employee.tasks.length,
    0,
  );

  return (
    <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
      {/* Section Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
              Team workspace
            </p>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            All Tasks
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Manage, review, and track tasks across your team in one place.
          </p>
        </div>

        <div className="relative w-full sm:w-72 lg:w-80">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <circle cx="11" cy="11" r="7" />
            <path
              strokeLinecapgit="round"
              strokeLinejoin="round"
              d="m20 20-4-4"
            />
          </svg>

          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-1 text-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-sm text-slate-500">
          {query
            ? `Search results for "${searchQuery.trim()}"`
            : "All team tasks"}
        </p>

        <span className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
          {matchingTaskCount}{" "}
          {matchingTaskCount === 1 ? "task found" : "tasks found"}
        </span>
      </div>

      {/* Scrollable Task Grid */}
      <div className="max-h-[70vh] overflow-y-auto overscroll-contain rounded-2xl bg-slate-50/70 p-2 sm:p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
          {matchingTaskCount === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
              <h3 className="text-base font-semibold text-slate-800">
                {query ? "No matching tasks" : "No tasks yet"}
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                {query
                  ? "Try another task title, description, category, or employee name."
                  : "Tasks assigned to your team will appear here."}
              </p>

              {query && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            filteredEmployees.map((employee) =>
              employee.tasks.map((task) => (
                <div
                  key={task.id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-900/5 sm:p-5"
                >
                  {/* Category and status */}
                  <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                    <span className="max-w-full wrap-break-words rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      {task.category}
                    </span>

                    <div className="flex flex-wrap gap-1.5">
                      {task.newTask && (
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                          New
                        </span>
                      )}
                      {task.active && (
                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                          Active
                        </span>
                      )}
                      {task.completed && (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          Completed
                        </span>
                      )}
                      {task.failed && (
                        <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                          Failed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Task details */}
                  <div className="mt-5 min-w-0 flex-1">
                    <h3 className="wrap-break-words text-lg font-bold leading-snug tracking-tight text-slate-900">
                      {task.taskTitle}
                    </h3>

                    <p className="mt-2 line-clamp-3 wrap-break-words text-sm leading-6 text-slate-500">
                      {task.taskDesc || "No description provided."}
                    </p>

                    {/* Assigned employee */}
                    <div className="mt-5 flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-700 ring-1 ring-indigo-100">
                        {employee.firstName?.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Assigned to
                        </p>
                        <p className="truncate text-sm font-semibold text-slate-700">
                          {employee.firstName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Due date */}
                  <div className="mt-5 flex min-w-0 items-center gap-2 border-t border-slate-100 pt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 shrink-0 text-slate-400"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M16 3v4M8 3v4M3 11h18" />
                    </svg>
                    <span className="min-w-0 wrap-break-words text-sm font-medium text-slate-500">
                      Due: {task.taskDate || "No due date"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => editTask(task.id, employee.id)}
                      className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2.5 text-sm font-semibold text-indigo-700 transition hover:border-indigo-200 hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                      </svg>
                      Edit task
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteTask(task.id, employee.id)}
                      aria-label={`Delete ${task.taskTitle}`}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-100 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:px-3.5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="m19 6-1 14H6L5 6" />
                        <path d="M10 11v5M14 11v5" />
                      </svg>
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              )),
            )
          )}
        </div>
      </div>

      {editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={handleSaveTask}
            className="max-h-[90dvh] w-full max-w-lg space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl sm:p-6"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Edit task</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update the task details below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="rounded-lg px-3 py-1 text-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close edit form"
              >
                &times;
              </button>
            </div>

            <div>
              <label
                htmlFor="taskTitle"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Task title
              </label>
              <input
                id="taskTitle"
                type="text"
                value={editForm.taskTitle}
                onChange={(e) =>
                  setEditForm({ ...editForm, taskTitle: e.target.value })
                }
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={editForm.taskDesc}
                onChange={(e) =>
                  setEditForm({ ...editForm, taskDesc: e.target.value })
                }
                required
                rows={3}
                className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                id="category"
                type="text"
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="due-date"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Due date
              </label>
              <input
                id="due-date"
                type="date"
                value={editForm.taskDate}
                onChange={(e) =>
                  setEditForm({ ...editForm, taskDate: e.target.value })
                }
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
