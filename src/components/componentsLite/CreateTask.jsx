import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");

  const [priority, setPriority] = useState("Medium");

  const submitHandler = (e) => {
    e.preventDefault();

    const newTask = {
      id: crypto.randomUUID(),
      taskTitle,
      taskDesc,
      taskDate,
      category,
      priority,
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };

    const data = userData.employees;

    data.forEach(function (elem) {
      if (assignTo === elem.firstName) {
        elem.tasks.push(newTask);
        elem.taskCount.newTask = elem.taskCount.newTask + 1;
        console.log(elem);
      }
    });

    setUserData((prev) => ({
      ...prev,
      employees: data,
    }));
    console.log(data);

    setTaskTitle("");
    setCategory("");
    setTaskDate("");
    setAssignTo("");
    setTaskDesc("");
    setPriority("Medium");
  };

  return (
    <div className="mt-5 w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-7 sm-p-6 lg:p-8">

      <div className="mb-4 border-b border-slate-100 pb-4 sm:mb-7 sm:pb-5">

        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Create New Task
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Add task details, set a deadline, and assign it to an employee.
        </p>
      </div>

      <form
        onSubmit={submitHandler}
        className="grid min-w-0 grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2"
      >
        {/* Left Side */}
        <div className="min-w-0 space-y-5">
          {/* Task Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Task Title
            </label>

            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              type="text"
              placeholder="e.g. Design the dashboard UI"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          {/* Due Date & Priority */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Due Date
              </label>

              <input
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                type="date"
                className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Task Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full min-w-0 cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Assign To */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Assign To
            </label>

            <input
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              type="text"
              placeholder="Enter employee name"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>

            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              placeholder="e.g. Design, Development"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex min-w-0 flex-col">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Description
          </label>

          <textarea
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            className="min-h-48 w-full min-w-0 flex-1 resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:p-4"
            placeholder="Describe the task, expected outcome, and any important requirements..."
          />

          <div className="mt-5 border-t border-slate-100 pt-5">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition duration-200 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.99]"
            >
              Create Task
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              Make sure all task details are correct before creating.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
