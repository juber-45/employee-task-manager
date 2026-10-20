const employees = [
  {
    id: 1,
    email: "employee1@example.com",
    firstName: "Rahul",
    password: "123",
    taskCount: {
      active: 1,
      newTask: 0,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        id: 101,
        active: true,
        completed: false,
        newTask: false,
        failed: false,
        taskTitle: "Complete Dashboard UI",
        taskDesc:
          "Build the employee dashboard with responsive layout and navigation.",
        taskDate: "2026-09-18",
        category: "Development",
      },
      {
        id: 102,
        active: false,
        completed: true,
        newTask: false,
        failed: false,
        taskTitle: "Fix Login Bug",
        taskDesc:
          "Investigate and fix the issue causing incorrect login validation.",
        taskDate: "2026-09-17",
        category: "Bug Fixing",
      },
    ],
  },

  {
    id: 2,
    email: "employee2@example.com",
    firstName: "Rajesh",
    password: "123",
    taskCount: {
      active: 1,
      newTask: 0,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        id: 201,
        active: true,
        completed: false,
        newTask: false,
        failed: false,
        taskTitle: "Design Landing Page",
        taskDesc: "Create a modern and responsive landing page design.",
        taskDate: "2026-09-18",
        category: "Design",
      },
      {
        id: 202,
        active: false,
        completed: true,
        newTask: false,
        failed: false,
        taskTitle: "Optimize Images",
        taskDesc:
          "Compress website images to improve page loading speed.",
        taskDate: "2026-09-17",
        category: "Optimization",
      },
    ],
  },

  {
    id: 3,
    email: "employee3@example.com",
    firstName: "Karan",
    password: "123",
    taskCount: {
      active: 1,
      newTask: 0,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        id: 301,
        active: true,
        completed: false,
        newTask: false,
        failed: false,
        taskTitle: "Build Authentication",
        taskDesc:
          "Implement login and logout functionality for the application.",
        taskDate: "2026-09-19",
        category: "Development",
      },
      {
        id: 302,
        active: false,
        completed: true,
        newTask: false,
        failed: false,
        taskTitle: "Connect API",
        taskDesc:
          "Connect the frontend application with the backend API.",
        taskDate: "2026-09-18",
        category: "API",
      },
    ],
  },

  {
    id: 4,
    email: "employee4@example.com",
    firstName: "Pruthvi",
    password: "123",
    taskCount: {
      active: 1,
      newTask: 0,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        id: 401,
        active: true,
        completed: false,
        newTask: false,
        failed: false,
        taskTitle: "Write Test Cases",
        taskDesc:
          "Create test cases for the employee management module.",
        taskDate: "2026-09-18",
        category: "Testing",
      },
      {
        id: 402,
        active: false,
        completed: true,
        newTask: false,
        failed: false,
        taskTitle: "Test Login Flow",
        taskDesc:
          "Test login functionality with valid and invalid credentials.",
        taskDate: "2026-09-17",
        category: "Testing",
      },
    ],
  },

  {
    id: 5,
    email: "employee5@example.com",
    firstName: "Harsh",
    password: "123",
    taskCount: {
      active: 1,
      newTask: 0,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        id: 501,
         active: true,
        completed: false,
        newTask: false,
        failed: false,
        taskTitle: "Prepare Project Report",
        taskDesc:
          "Prepare a report containing the project's current progress.",
        taskDate: "2026-09-19",
        category: "Documentation",
      },
      {
        id: 502,
        active: false,
        completed: true,
        newTask: false,
        failed: false,
        taskTitle: "Update Documentation",
        taskDesc:
          "Update the project documentation with recent changes.",
        taskDate: "2026-09-18",
        category: "Documentation",
      },
    ],
  },
];

const admin = [
  {
    id: 1,
    email: "admin@example.com",
    firstName: "Admin",
    password: "123",
  },
];

export const setLocalStorage = () => {
  localStorage.setItem("employees", JSON.stringify(employees));
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem("employees"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  return { employees, admin };
};
