import { useContext, useEffect, useState } from "react";

import Login from "./components/Auth/Login";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";

import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null);

  const [loggedInUserData, setLoggedInUserData] = useState(null);

  const [userData] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);

      setUser(userData.role);
      setLoggedInUserData(userData.data);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (
      userData &&
      userData?.admin?.find(
        (e) => e.email === email && e.password === password
      )
    ) {
      setUser("admin");

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          role: "admin",
        })
      );
    } else if (userData?.employees) {
      const employee = userData.employees.find(
        (e) => e.email === email && password === e.password
      );

      if (employee) {
        setLoggedInUserData(employee);
        setUser("employee");

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            role: "employee",
            data: employee,
          })
        );
      } else {
        alert("Invalid Credentials");
      }
    }
  };

  useEffect(() => {
    if (user === "employee" && loggedInUserData && userData?.employees) {
      const updatedEmployee = userData.employees.find(
        (employee) => employee.id === loggedInUserData.id
      );

      if (updatedEmployee) {
        setLoggedInUserData(updatedEmployee);
      }
    }
  }, [userData]);

  return (
    <>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user === "admin" ? (
        <AdminDashboard changeUser={setUser} data={userData} />
      ) : (
        <EmployeeDashboard
          changeUser={setUser}
          data={loggedInUserData}
        />
      )}
    </>
  );
};

export default App;