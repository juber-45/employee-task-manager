function TaskStatCard({ children, color }) {
  const colors = {
    blue: "border-blue-100 hover:shadow-blue-200 bg-black",
    emerald: "border-emerald-100 hover:shadow-green-200",
    amber: "border-amber-100 hover:shadow-amber-200",
    red: "border-red-100 hover:shadow-red-200",
  };

  return (
    <div
      className={`flex min-w-0 flex-col border-2 justify-between gap-4 sm:gap-5 rounded-2xl bg-white p-4 sm:p-6 shadow-sm transition-all duration-200 hover:shadow-md ${colors[color]}`}
    >
      {children}
    </div>
  );
}

const StatCard = ({ data }) => {
  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
      {/* New Tasks */}
      <TaskStatCard color="blue">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            New
          </span>
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {data.taskCount.newTask}
          </h2>
          <h3 className="mt-2 text-sm font-medium text-gray-500">New Tasks</h3>
        </div>

        <div className="h-1 w-full rounded-full bg-blue-100">
          <div className="h-1 w-2/3 rounded-full bg-blue-500" />
        </div>
      </TaskStatCard>

      {/* Completed Tasks */}
      <TaskStatCard color="emerald">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Done
          </span>
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {data.taskCount.completed}
          </h2>
          <h3 className="mt-2 text-sm font-medium text-gray-500">
            Completed Tasks
          </h3>
        </div>

        <div className="h-1 w-full rounded-full bg-emerald-100">
          <div className="h-1 w-2/3 rounded-full bg-emerald-500" />
        </div>
      </TaskStatCard>

      {/* Accepted Tasks */}
      <TaskStatCard color="amber">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4l3 2" />
            </svg>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            In Progress
          </span>
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {data.taskCount.active}
          </h2>
          <h3 className="mt-2 text-sm font-medium text-gray-500">
            Accepted Tasks
          </h3>
        </div>

        <div className="h-1 w-full rounded-full bg-amber-100">
          <div className="h-1 w-2/3 rounded-full bg-amber-500" />
        </div>
      </TaskStatCard>

      {/* Failed Tasks */}
      <TaskStatCard color="red">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
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
          </div>
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
            Failed
          </span>
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {data.taskCount.failed}
          </h2>
          <h3 className="mt-2 text-sm font-medium text-gray-500">
            Failed Tasks
          </h3>
        </div>

        <div className="h-1 w-full rounded-full bg-red-100">
          <div className="h-1 w-2/3 rounded-full bg-red-500" />
        </div>
      </TaskStatCard>
    </div>
  );
};

export default StatCard;
