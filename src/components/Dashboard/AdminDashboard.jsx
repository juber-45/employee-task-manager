import AllTask from "../componentsLite/AllTask";
import CreateTask from "../componentsLite/CreateTask";
import Header from "../componentsLite/Header";
import AllTasks from "../componentsLite/AllTasks";

const AdminDashboard = (props) => {
  return (
    <div className="min-h-dvh w-full min-w-0 p-3 bg-white sm:p-5 md:p-6 lg:p-8">
      <div className="mb-5 sm:mb-6">
        <Header changeUser={props.changeUser} />
      </div>

      <div className="mb-6 sm:mb-8">
        <CreateTask />
      </div>

      <div className="mb-6 sm:mb-8 min-w-0">
        <AllTask />
      </div>

      <div className="min-w-0">
        <AllTasks />
      </div>
    </div>
  );
};

export default AdminDashboard;
