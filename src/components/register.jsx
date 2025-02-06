import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../Store/store";

const RegisterForm = ({
  inputFullName,
  setInputFulllName,
  inputUserName,
  setInputUserName,
  inputPassword,
  setInputPassword,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isRegistrationSuccessful = useSelector(
    (state) => state.auth.registrationSuccess
  );

  const handelRegister = (e) => {
    e.preventDefault();
    // بررسی وجود نام کامل، نام کاربری و رمز عبور
    if (!inputFullName || !inputUserName || !inputPassword) {
      alert("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    // ثبت نام کاربر
    dispatch(
      register({
        fullName: inputFullName,
        userName: inputUserName,
        password: inputPassword,
      })
    );
  };

  // استفاده از useEffect برای هدایت کاربر به صفحه لاگین
  useEffect(() => {
    if (isRegistrationSuccessful && isLoggedIn) {
      setInputFulllName("");
      setInputUserName("");
      setInputPassword("");
      navigate("/login");
    }
  }, [isRegistrationSuccessful, isLoggedIn, navigate]);

  return (
    <>
      <section className="flex justify-center items-center mt-32">
        <div className="container flex justify-center items-center m-auto max-w-md">
          <form className="w-full" onSubmit={handelRegister}>
            <div className="shadow-md shadow-slate-700 rounded px-8 pt-6 pb-8 flex flex-col">
              <div className="mb-5">
                <div className="relative">
                  <input
                    className="w-full text-gray-800 rounded py-3 px-4 outline-none"
                    type="text"
                    onChange={(e) => setInputFulllName(e.target.value)}
                    required
                  />
                  <label className="absolute left-3 top-3 text-gray-600 text-xs font-bold transition-transform duration-300 ease-in-out transform origin-top-left">
                    Full Name
                  </label>
                </div>
              </div>
              <div className="mb-5">
                <div className="relative">
                  <input
                    className="w-full text-gray-800 rounded py-3 px-4 outline-none"
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
                    className="w-full text-gray-800 rounded py-3 px-4 outline-none"
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
                  Register
                </button>
              </div>
              <div className="mt-5">
                <Link to="/login" className="text-white tracking-wider">
                  <span>Have you not already logged in?</span>
                  <span className="mx-2 underline decoration-amber-400 decoration-wavy">
                    Login
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

export default RegisterForm;
