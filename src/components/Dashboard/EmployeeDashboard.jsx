import Header from "../componentsLite/Header";
import StatCard from "../componentsLite/StatCard";
import TaskCard from "../TaskList/TaskCard";

const EmployeeDashboard = (props) => {
  return (
    <div className="min-h-dvh w-full min-w-0 bg-gray-100 p-3 sm:p-6 lg:p-8">
      {/* Dashboard Header */}
      <div className="mb-5 sm:mb-6">
        <Header changeUser={props.changeUser} data={props.data} />
      </div>

      {/* Task Statistics */}
      <div className="mb-6 sm:mb-8">
        <StatCard data={props.data} />
      </div>

      {/* Task Cards */}
      <div className="w-full min-w-0">
        <TaskCard data={props.data} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
