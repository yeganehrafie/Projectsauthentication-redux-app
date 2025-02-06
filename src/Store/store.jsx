import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    fullName: "",
    userName: "",
    password: "",
    registrationSuccess: false,
  },
  reducers: {
    register(state, action) {
      state.fullName = action.payload.fullName;
      state.userName = action.payload.userName;
      state.password = action.payload.password;
      state.registrationSuccess = true; // به‌روزرسانی وضعیت ثبت‌نام موفق
    },
    login(state, action) {
      state.isLoggedIn = true;
      state.userName = action.payload.userName;
      state.password = action.payload.password;
      state.registrationSuccess = false; // بازنشانی وضعیت ثبت‌نام
    },
    logout(state) {
      state.isLoggedIn = false;
      state.fullName = "";
      state.userName = "";
      state.password = "";
      state.registrationSuccess = false;
    },
  },
});

export const { register, login, logout } = authSlice.actions;

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

// بازیابی اطلاعات کاربر از لوکال استوریج
const savedUser = localStorage.getItem("auth");
if (savedUser) {
  const parsedUser = JSON.parse(savedUser);
  store.dispatch(login(parsedUser)); // ورود کاربر با اطلاعات بازیابی شده
}

// به‌روزرسانی لوکال استوریج هنگام تغییر وضعیت
store.subscribe(() => {
  const state = store.getState().auth;
  if (state.isLoggedIn) {
    localStorage.setItem(
      "auth",
      JSON.stringify({ userName: state.userName, fullName: state.fullName })
    );
  } else {
    localStorage.removeItem("auth");
  }
});

export default store;
