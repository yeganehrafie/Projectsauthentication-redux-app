import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUserLarge } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { logout } from "../Store/store";
const Navigation = () => {
  const selector = useSelector((state) => state.auth);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  return (
    <>
      <div className="container max-w-full md:w-full m-0 p-4 shadow-lg shadow-slate-700">
        <nav className="flex max-w-full items-center justify-between">
          <div className="flex items-center">
            <div className="logo-nav font-bold text-2xl tracking-widest text-amber-400 underline decoration-amber-50 decoration-wavy">
              <a href="#">
                <h1>Logo</h1>
              </a>
            </div>
            <div className="task-nav text-white font-semibold tracking-widest mx-10 mt-1">
              <a
                href="#"
                className="hover:text-amber-400 hover:underline hover:decoration-amber-50 hover:decoration-wavy duration-300"
              >
                Home
              </a>
              <a
                href="#"
                className="mx-8 hover:text-amber-400 hover:underline hover:decoration-amber-50 hover:decoration-wavy duration-300"
              >
                About
              </a>
              <a
                href="#"
                className="hover:text-amber-400 hover:underline hover:decoration-amber-50 hover:decoration-wavy duration-300"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="login-nav flex items-center justify-end">
            {isLoggedIn && (
              <>
                <span className="mx-2 text-xl font-semibold tracking-widest text-amber-50 underline decoration-amber-400 decoration-wavy">
                  {selector.userName}
                </span>
                <Link to="/main">
                  <button
                    onClick={() => dispatch(logout())}
                    className="flex items-center mx-2 text-red-500 bg-transparent border-2 border-red-500 hover:bg-red-500 hover:text-white rounded-md duration-300 px-4 py-2 font-semibold"
                  >
                    LogOut
                    <BiLogOut className="mx-2 bg-transparent" />
                  </button>
                </Link>
              </>
            )}
            {!isLoggedIn && (
              <Link to="/login">
                <button className="flex items-center text-white bg-amber-500 border-2 border-amber-500 hover:bg-transparent rounded-md duration-300 px-4 py-2 font-semibold">
                  Login
                  <FaUserLarge className="mx-2 bg-transparent" />
                </button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
