import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AcceptTask = ({ data }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const markAsCompleted = () => {
    setUserData((prev) => {
      const updatedEmployees = prev.employees.map((employee) => {
        const hasTask = employee.tasks.some((task) => task.id === data.id);

        if (!hasTask) {
          return employee;
        }

        return {
          ...employee,

          tasks: employee.tasks.map((task) => {
            if (task.id === data.id) {
              return {
                ...task,
                active: false,
                completed: true,
                failed: false,
                newTask: false,
              };
            }

            return task;
          }),

          taskCount: {
            ...employee.taskCount,
            active: employee.taskCount.active - 1,
            completed: employee.taskCount.completed + 1,
          },
        };
      });

      localStorage.setItem("employees", JSON.stringify(updatedEmployees));

      return {
        ...prev,
        employees: updatedEmployees,
      };
    });
  };

  const markAsFailed = () => {
    if (!window.confirm("Are you sure you want to mark this task as failed?")) {
      return;
    }
    setUserData((prev) => {
      const updatedEmployees = prev.employees.map((employee) => {
        const hasTask = employee.tasks.some(
          (task) => task.id === data.id && task.active === true,
        );

        if (!hasTask) {
          return employee;
        }

        return {
          ...employee,

          tasks: employee.tasks.map((task) => {
            if (task.id === data.id && task.active === true) {
              return {
                ...task,
                active: false,
                failed: true,
                completed: false,
                newTask: false,
              };
            }

            return task;
          }),

          taskCount: {
            ...employee.taskCount,
            active: employee.taskCount.active - 1,
            failed: employee.taskCount.failed + 1,
          },
        };
      });

      localStorage.setItem("employees", JSON.stringify(updatedEmployees));

      return {
        ...prev,
        employees: updatedEmployees,
      };
    });
  };

  return (
    <div className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-900/5">
      {/* Accent Header */}
      <div className="h-1.5 w-full bg-linear-to-r from-amber-400 via-orange-400 to-amber-500" />

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        {/* Priority & Status */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              data.priority === "High"
                ? "bg-red-50 text-red-600"
                : data.priority === "Medium"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {data.priority || "Medium"} Priority
          </span>

          <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-amber-400 opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-amber-500" />
            </span>
            In Progress
          </span>
        </div>

        {/* Category & Date */}
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <span className="max-w-[55%] truncate rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold tracking-wide text-amber-800">
            {data.category}
          </span>

          <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 11h18" />
            </svg>
            <span>{data.taskDate}</span>
          </div>
        </div>

        {/* Task Details */}
        <div className="flex-1 pt-4">
          <h2 className="mb-2 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-amber-800">
            {data.taskTitle}
          </h2>

          <p className="line-clamp-3 text-sm leading-6 text-gray-500">
            {data.taskDesc}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-2.5 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={markAsCompleted}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
            Mark as Completed
          </button>

          <button
            type="button"
            onClick={markAsFailed}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-50 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-red-500/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="m15 9-6 6m0-6 6 6" />
            </svg>
            Mark as Failed
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptTask;
