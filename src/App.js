import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import Store from './Store/store';
import Navigation from './components/navigation';
import Main from './components/main';
import Login from './components/login';
import RegisterForm from './components/register';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
  return (
    <Provider store={Store}> 
      <Router>
        <AppRoutes /> 
      </Router>
    </Provider>
  );
}


function AppRoutes() {
  const [inputFullName, setInputFulllName] = useState("");
  const [inputUserName, setInputUserName] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isRegistrationSuccessful = useSelector(
    (state) => state.auth.registrationSuccess
  );

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/login" element={
            isLoggedIn ? <Navigate to="/main" /> : <Login 
              inputUserName={inputUserName} 
              setInputUserName={setInputUserName} 
              inputPassword={inputPassword} 
              setInputPassword={setInputPassword}
            />
          } />
          
        <Route path="/register" element={
            isRegistrationSuccessful ? <Navigate to="/login" /> : (
              <RegisterForm 
                inputFullName={inputFullName} 
                setInputFulllName={setInputFulllName}
                inputUserName={inputUserName} 
                setInputUserName={setInputUserName} 
                inputPassword={inputPassword} 
                setInputPassword={setInputPassword}
              />
            )
        } />

        {/* مسیر پیش‌فرض به صفحه ثبت‌نام */}
        <Route path="/" element={<Navigate to={isLoggedIn ? "/main" : "/register"} />} />

        <Route path="/main" element={
          isLoggedIn ? <Main /> : <Navigate to="/register" /> 
        } />
      </Routes>
    </div>
  );
}

export default App;
