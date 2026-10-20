import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import NewTask from "./NewTask";
import FailedTask from "./FailedTask";

const TaskCard = ({ data }) => {
  return (
    <div
      id="task-cards"
      className="mt-5 flex min-h-85 w-full min-w-0 flex-nowrap items-stretch gap-4 overflow-x-auto overflow-y-hidden rounded-2xl border border-gray-200/80 bg-linear-to-br from-gray-50 via-white to-slate-50 p-3 shadow-sm scroll-smooth sm:mt-7 sm:gap-5 sm:p-5 lg:p-7"
    >
      {data.tasks.map((elem, idx) => {
        if (elem.active) {
          return (
            <div
              key={idx}
              className="h-full w-[min(85vw,320px)] shrink-0 overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-900/5"
            >
              <AcceptTask data={elem} />
            </div>
          );
        }

        if (elem.completed) {
          return (
            <div
              key={idx}
              className="h-full w-[min(85vw,320px)] shrink-0 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/5"
            >
              <CompleteTask data={elem} />
            </div>
          );
        }

        if (elem.newTask) {
          return (
            <div
              key={idx}
              className="h-full w-[min(85vw,320px)] shrink-0 overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-900/5"
            >
              <NewTask data={elem} />
            </div>
          );
        }

        if (elem.failed) {
          return (
            <div
              key={idx}
              className="h-full w-[min(85vw,320px)] shrink-0 overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/5"
            >
              <FailedTask data={elem} />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default TaskCard;
