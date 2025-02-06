import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Store/store";
import { useDispatch, useSelector } from "react-redux";

const Login = ({
  inputUserName,
  setInputUserName,
  inputPassword,
  setInputPassword,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedUserName = useSelector((state) => state.auth.userName);
  const storedPassword = useSelector((state) => state.auth.password);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogin = (e) => {
    e.preventDefault();

    if (inputUserName !== storedUserName || inputPassword !== storedPassword) {
      alert("نام کاربری یا رمز عبور اشتباه است");
      return; // متوقف کردن ادامه اجرای تابع
    }
    // اگر همخوانی داشت، ورود را انجام می‌دهیم
    dispatch(
      login({
        userName: inputUserName,
        password: inputPassword,
      })
    );

    // هدایت به صفحه اصلی در صورت موفقیت
    if (isLoggedIn) {
      navigate("/main");
    }
  };
  return (
    <>
      <section className="flex justify-center items-center mt-32">
        <div className="container flex justify-center items-center m-auto max-w-md">
          <form className="w-full" onSubmit={handleLogin}>
            <div className="shadow-md shadow-slate-700 rounded px-8 pt-6 pb-8 flex flex-col">
              <div className="mb-5">
                <div className="relative">
                  <input
                    className="w-full text-gray-800  rounded py-3 px-4  outline-none"
                    type="text"
                    onChange={(e) => setInputUserName(e.target.value)}
                    required
                  />
                  <label className="absolute left-3 top-3 text-gray-600 text-xs font-bold transition-transform duration-300 ease-in-out transform origin-top-left">
                    UserName
                  </label>
                </div>
              </div>
              <div className="mb-5">
                <div className="relative">
                  <input
                    className="w-full text-gray-800 rounded py-3 px-4  outline-none"
                    type="password"
                    onChange={(e) => setInputPassword(e.target.value)}
                    required
                  />
                  <label className="absolute left-3 top-3 text-gray-600 text-xs font-bold transition-transform duration-300 ease-in-out transform origin-top-left">
                    Password
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full mt-4 text-white font-medium py-3 px-4 duration-300 rounded-full from-amber-700 via-amber-600 to-amber-500 bg-gradient-to-r bg-clip-bg bg-transparent hover:shadow-md"
                >
                  Login
                </button>
              </div>
              <div className="mt-5">
                <Link to="/register" className="text-white tracking-wider">
                  <span>Have you not already registered?</span>
                  <span className="mx-2 underline decoration-amber-400 decoration-wavy">
                    register
                  </span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
