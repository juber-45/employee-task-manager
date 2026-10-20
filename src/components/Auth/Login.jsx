import { useState } from "react";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-gray-50 px-4 py-6 sm:py-8">

      {/* Login Card */}
      <div className="w-full max-w-md min-w-0 bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-200/50">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-2xl bg-emerald-50">
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
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Sign in to continue to your account
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={(e) => {
            formHandler(e);
          }}
          className="flex flex-col gap-6"
        >
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email address
            </label>

            <input
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              autoComplete="email"
              className="w-full min-w-0 bg-white border border-gray-200 text-gray-900 py-3.5 px-4 rounded-xl text-base placeholder:text-gray-400 outline-none transition-all duration-200 hover:border-gray-300 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/10"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              autoComplete="current-password"
              className="w-full min-w-0 bg-white border border-gray-200 text-gray-900 py-3.5 px-4 rounded-xl text-base placeholder:text-gray-400 outline-none transition-all duration-200 hover:border-gray-300 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/10"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-base py-3.5 px-6 rounded-xl cursor-pointer transition-all duration-200 shadow-md shadow-emerald-600/10 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
          >
            Log in
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Secure login · Welcome to your workspace
        </p>
      </div>
    </div>
  );
};

export default Login;
