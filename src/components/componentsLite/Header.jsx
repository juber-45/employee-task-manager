const Header = (props) => {
  const logOutUser = () => {
    localStorage.setItem("loggedInUser", "");
    props.changeUser("");
  };
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  // console.log(props);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-[#FAFFFD] px-4 py-4 shadow-lg sm:flex-row sm:items-center  sm:justify-between sm:px-6 sm:py-5">
      <div className="flex min-w-0 items-center justify-between gap-3 sm:gap-4">
        {/* Existing Greeting */}
        <h1 className="min-w-0 text-xl font-medium text-black sm:text-2xl">
          Hello
          <br />
          <span className="wrap-break-word text-3xl font-semibold sm:text-4xl">
            {loggedInUser?.role === "admin" ? "Admin" : props?.data?.firstName}
          </span>
        </h1>

        {/* User Icon */}
        <div className="sm:hidden flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-600"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
          </svg>
        </div>
      </div>

      <button
        onClick={logOutUser}
        className="
        w-full rounded-lg border border-neutral-700 bg-neutral-900 px-5 py-2.5 font-medium text-neutral-200 transition cursor-pointer hover:bg-neutral-800 hover:text-white active:scale-95 sm:w-auto
    "
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
