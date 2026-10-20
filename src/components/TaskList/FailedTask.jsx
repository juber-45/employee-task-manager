const FailedTask = ({ data }) => {
return (
<div className="group relative flex min-h-70 w-[min(85vw,320px)] shrink-0 flex-col overflow-hidden rounded-2xl border border-red-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/5">
{/* Accent Header */}
<div className="h-1.5 w-full shrink-0 bg-linear-to-r from-red-400 via-rose-400 to-red-500" />

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

      <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
        <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
        Failed
      </span>
    </div>

    {/* Category & Date */}
    <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
      <span className="max-w-[60%] truncate rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold tracking-wide text-gray-600">
        {data.category}
      </span>

      <span className="shrink-0 text-xs font-medium text-gray-400">
        {data.taskDate}
      </span>
    </div>

    {/* Task Details */}
    <div className="flex-1 pt-4">
      <h2 className="mb-2 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-red-700">
        {data.taskTitle}
      </h2>

      <p className="line-clamp-3 text-sm leading-6 text-gray-500">
        {data.taskDesc}
      </p>
    </div>

    {/* Failed Status */}
    <div className="mt-5 border-t border-red-100 pt-4">
      <div className="mb-3 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/50 p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-lg font-bold text-red-600">
          !
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-red-700">
            Task Failed
          </p>
          <p className="mt-0.5 text-xs leading-5 text-red-500">
            This task was not completed
          </p>
        </div>
      </div>

      {/* Disabled Status Button */}
      <button
        type="button"
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600"
      >
        Failed
      </button>
    </div>
  </div>
</div>

);
};

export default FailedTask;