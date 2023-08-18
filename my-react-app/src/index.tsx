import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Courses from "./components/Courses/Courses";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="courses" element={<Courses />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Registration />} />
    </Routes>
  </BrowserRouter>
);
