const CompleteTask = ({ data }) => {

  return (
    <div className="group relative flex h-full min-w-0 shrink-0 flex-col overflow-hidden rounded-2xl border border-emerald-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/5">
      {/* Accent Header */}
      <div className="h-1.5 w-full bg-linear-to-r from-emerald-400 via-teal-400 to-emerald-500" />

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

          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
            Completed
          </span>
        </div>

        {/* Category & Date */}
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <span className="max-w-[55%] truncate rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold tracking-wide text-emerald-800">
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
          <h2 className="mb-2 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-emerald-800">
            {data.taskTitle}
          </h2>

          <p className="line-clamp-3 text-sm leading-6 text-gray-500">
            {data.taskDesc}
          </p>
        </div>

        {/* Completion Status */}
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
          </div>

          <div>
            <p className="text-sm font-semibold text-emerald-800">
              Successfully completed
            </p>
            <p className="mt-0.5 text-xs text-emerald-600">
              Great work! Task finished.
            </p>
          </div>
        </div>

        {/* Completed Button */}
        <div className="mt-auto border-t border-gray-100 pt-4">
          <button
            type="button"
            disabled
            className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-700"
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
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteTask;
