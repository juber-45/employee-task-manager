export const calculateTaskCounts = (tasks) => {
  return {
    newTask: tasks.filter((task) => task.newTask === true).length,
    active: tasks.filter((task) => task.active === true).length,
    completed: tasks.filter((task) => task.completed === true).length,
    failed: tasks.filter((task) => task.failed === true).length,
  };
};
