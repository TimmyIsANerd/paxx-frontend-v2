"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });
  const [viewPassword, setViewPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const { storeAuthCookie, storeProfile } = useAuth();
  const { push } = useRouter();

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((formData) => ({ ...formData, [id]: value }));
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    if (formData.emailAddress === "" || formData.password === "") {
      toast("Please make sure to enter both Email Address & Password.");
      setLoading(false);
      return;
    }

    try {
      const data = await login(formData);
      storeAuthCookie(data.token);
      storeProfile(data.user);
      toast("Successfully Logged in User");
      push("/dashboard");
    } catch (error) {
      if (error && !error.response) {
        toast("Server Problems! ❌ Please try again later!");
      }
      if (error && error.response) {
        toast(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-10 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="relative px-7 pt-10 pb-8 bg-black bg-opacity-30 max-w-lg mx-auto rounded-3xl">
          <form className="text-center mx-auto" onSubmit={handleSubmit}>
            <a className="mb-9 flex justify-center" href="#">
              <img
                src="/images/logo/paxx-logo.png"
                className="w-[25%] h-[25%]"
                alt=""
              />
            </a>
            <h3 className="mb-10 text-3xl font-medium text-white tracking-5xl">
              Log in to your account
            </h3>
            <div className="mb-2 border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl">
              <input
                className="pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-300 outline-none bg-transparent"
                type="text"
                placeholder="Email Address"
                value={formData.emailAddress}
                onChange={handleChange}
                id="emailAddress"
              />
            </div>
            <div className="mb-6 relative border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl">
              {viewPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  className="absolute right-7 top-1/2 transform -translate-y-1/2 hover:cursor-pointer text-black"
                  onClick={() => setViewPassword(!viewPassword)}
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M6.873 17.129c-1.845-1.31-3.305-3.014-4.13-4.09a1.69 1.69 0 0 1 0-2.077C4.236 9.013 7.818 5 12 5c1.876 0 3.63.807 5.13 1.874" />
                    <path d="M14.13 9.887a3 3 0 1 0-4.243 4.242M4 20L20 4M10 18.704A7.1 7.1 0 0 0 12 19c4.182 0 7.764-4.013 9.257-5.962a1.694 1.694 0 0 0-.001-2.078A23 23 0 0 0 19.57 9" />
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 14 14"
                  className="absolute right-7 top-1/2 transform -translate-y-1/2 hover:cursor-pointer text-black"
                  onClick={() => setViewPassword(!viewPassword)}
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13.23 6.246c.166.207.258.476.258.754c0 .279-.092.547-.258.754C12.18 9.025 9.79 11.5 7 11.5S1.82 9.025.77 7.754A1.2 1.2 0 0 1 .512 7c0-.278.092-.547.258-.754C1.82 4.975 4.21 2.5 7 2.5s5.18 2.475 6.23 3.746" />
                    <path d="M7 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4" />
                  </g>
                </svg>
              )}
              <input
                className="pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-300 outline-none bg-transparent"
                type={viewPassword ? "password" : "text"}
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                id="password"
              />
            </div>
            <button
              className="mb-6 px-14 py-4 text-center font-medium tracking-2xl border-2 border-[#005BFE] bg-[#005BFE]/70 hover:bg-[#005BFE]/60 text-white focus:ring-4 focus:bg-[#005BFE]/60 capitalize focus:ring-opacity-40 rounded-full transition duration-700 w-full hover:shadow-2xl hover:shadow-[#005BFE] flex items-center justify-center"
              type="submit"
            >
              {loading ? <Loading /> : "Log In"}
            </button>

            <a
              className="mb-3 block text-sm text-gray-300 underline"
              href="/forgot-password"
            >
              Forgot password?
            </a>
            <span className="text-sm block">
              Don't have an Account?{" "}
              <a
                className="mb-10 inline-block text-gray-300 underline"
                href="/auth/signup"
              >
                Sign Up
              </a>
            </span>
            <div className="flex flex-wrap items-center mb-8">
              <div className="flex-1 bg-gray-900">
                <div className="h-px"></div>
              </div>
              <div className="px-5 text-xs text-gray-300 font-medium capitalize">
                or sign in with email
              </div>
              <div className="flex-1 bg-gray-900">
                <div className="h-px"></div>
              </div>
            </div>
            <div className="flex flex-wrap -1 mb-7">
              <div className="w-full p-1">
                <button
                  className="p-5 flex flex-wrap justify-center bg-gray-900 hover:bg-gray-900 bg-opacity-30 hover:bg-opacity-10 rounded-full transition duration-300 w-full"
                  onClick={() => toast("Feature in Development")}
                  type="button"
                >
                  <div className="mr-4 inline-block">
                    <img
                      src="https://static.shuffle.dev/components/preview/697340ff-5445-426e-84bf-57e856b9afbf/assets/public/nightsable-assets/images/sign-in/google.svg"
                      alt=""
                    />
                  </div>
                  <span className="text-sm text-white font-medium">
                    Sign in with Google
                  </span>
                </button>
              </div>
            </div>
          </form>
          <a className="absolute top-6 right-6" href="https://usepaxx.xyz">
            <img src="https://static.shuffle.dev/components/preview/697340ff-5445-426e-84bf-57e856b9afbf/assets/public/nightsable-assets/images/modals/close-icon.png" />
          </a>
        </div>
      </div>
    </section>
  );
}
