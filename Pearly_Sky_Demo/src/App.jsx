import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Loginpage/loginpage";
import RegistrationForm from "./components/Registrationpage/registration";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/userregistration" element={<RegistrationForm />} />
    </Routes>
  );
};

export default App;
