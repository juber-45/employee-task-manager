import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AllTask = () => {
  const [userData] = useContext(AuthContext);

  const isOverdue = (task) => {
    if (!task.taskDate || task.completed || task.failed) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(task.taskDate);
    deadline.setHours(0, 0, 0, 0);

    return deadline < today;
  };

  const employees = userData?.employees ?? [];

  const getInitials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");

  const getProgress = (employee) => {
    const counts = employee.taskCount ?? {};
    const total =
      (counts.newTask ?? 0) +
      (counts.active ?? 0) +
      (counts.completed ?? 0) +
      (counts.failed ?? 0);

    return total > 0 ? Math.round(((counts.completed ?? 0) / total) * 100) : 0;
  };

  const totalEmployees = employees.length;
  const totalOverdue = employees.reduce(
    (total, employee) =>
      total + (employee.tasks ?? []).filter(isOverdue).length,
    0,
  );
  const totalActive = employees.reduce(
    (total, employee) => total + (employee.taskCount?.active ?? 0),
    0,
  );
  const totalCompleted = employees.reduce(
    (total, employee) => total + (employee.taskCount?.completed ?? 0),
    0,
  );

  const stats = [
    {
      label: "Total Employees",
      value: totalEmployees,
      icon: "users",
      color: "text-violet-700",
      iconBg: "bg-violet-100",
    },
    {
      label: "Active Tasks",
      value: totalActive,
      icon: "activity",
      color: "text-blue-700",
      iconBg: "bg-blue-100",
    },
    {
      label: "Completed Tasks",
      value: totalCompleted,
      icon: "check-circle-2",
      color: "text-emerald-700",
      iconBg: "bg-emerald-100",
    },
    {
      label: "Overdue Tasks",
      value: totalOverdue,
      icon: "clock-alert",
      color: "text-red-700",
      iconBg: "bg-red-100",
    },
  ];

  return (
    <section className="mt-5 w-full min-w-0 space-y-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 shadow-sm sm:mt-7 sm:space-y-6 sm:p-5 lg:p-6">
      {/* Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Employee Overview
            </h2>
            <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
              {totalEmployees} employees
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-5 text-slate-500">
            Monitor team workloads, progress, and overdue tasks.
          </p>
        </div>
        <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Live task summary
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="min-w-0 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium leading-5 text-slate-500 sm:text-sm">
                {stat.label}
              </p>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.color}`}
              >
                {stat.icon === "users" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path
                      d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6m3-3h-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {stat.icon === "activity" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path
                      d="M3 12h4l3-8 4 16 3-8h4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {stat.icon === "check-circle-2" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path
                      d="m8 12 2.5 2.5L16 9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {stat.icon === "clock-alert" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path
                      d="M12 7v5l3 2m-3-2h.01"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>
            <p
              className={`mt-3 text-2xl font-bold tracking-tight sm:text-3xl ${stat.color}`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Employee table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-1 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <h3 className="font-bold text-slate-800">Team workload</h3>
          <p className="text-xs text-slate-500">Task counts by employee</p>
        </div>

        {employees.length === 0 ? (
          <div className="flex flex-col items-center px-4 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-6 w-6"
              >
                <path
                  d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6m3-3h-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="mt-3 font-semibold text-slate-700">
              No employees yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Employee task summaries will appear here.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3.5 sm:px-5">Employee</th>
                  <th className="px-3 py-3.5 text-center">Overdue</th>
                  <th className="px-3 py-3.5 text-center">New</th>
                  <th className="px-3 py-3.5 text-center">Active</th>
                  <th className="px-3 py-3.5 text-center">Completed</th>
                  <th className="px-3 py-3.5 text-center">Failed</th>
                  <th className="px-4 py-3.5 sm:px-5">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employees.map((employee, index) => {
                  const counts = employee.taskCount ?? {};
                  const overdueCount = (employee.tasks ?? []).filter(
                    isOverdue,
                  ).length;
                  const progress = getProgress(employee);
                  const employeeName = employee.firstName || "Employee";
                  const initials = getInitials(employeeName);

                  return (
                    <tr
                      key={employee.id ?? employee._id ?? employeeName + index}
                      className="transition-colors duration-150 hover:bg-violet-50/40"
                    >
                      <td className="px-4 py-4 sm:px-5">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-100 to-fuchsia-100 text-sm font-bold text-violet-800 ring-1 ring-violet-200/70">
                            {initials || "E"}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {employeeName}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-400">
                              Team member
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 text-center">
                        <span
                          className={`inline-flex min-w-8 items-center justify-center rounded-lg px-2.5 py-1.5 text-xs font-bold ${overdueCount > 0 ? "bg-red-50 text-red-700 ring-1 ring-red-100" : "bg-slate-100 text-slate-500"}`}
                        >
                          {overdueCount}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-center">
                        <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-700">
                          {counts.newTask ?? 0}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-center">
                        <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-700">
                          {counts.active ?? 0}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-center">
                        <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700">
                          {counts.completed ?? 0}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-center">
                        <span
                          className={`inline-flex min-w-8 items-center justify-center rounded-lg px-2.5 py-1.5 text-xs font-bold ${counts.failed > 0 ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-500"}`}
                        >
                          {counts.failed ?? 0}
                        </span>
                      </td>
                      <td className="px-4 py-4 sm:px-5">
                        <div className="w-28">
                          <div className="mb-1.5 flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-slate-700">
                              {progress}%
                            </span>
                            <span className="text-[10px] text-slate-400">
                              done
                            </span>
                          </div>
                          <div
                            className="h-1.5 overflow-hidden rounded-full bg-slate-100"
                            role="progressbar"
                            aria-label={`${employeeName} task completion`}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={progress}
                          >
                            <div
                              className="h-full rounded-full bg-linear-to-r from-violet-600 to-fuchsia-500 transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {employees.length > 0 && (
          <div className="flex flex-col gap-1 border-t border-slate-100 bg-slate-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-slate-500">
              Showing {employees.length} employee
              {employees.length === 1 ? "" : "s"}
            </p>
            <p className="text-xs text-slate-400">
              Scroll horizontally to view all columns
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllTask;
