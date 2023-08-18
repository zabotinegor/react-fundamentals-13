import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:courseId" element={<CourseInfo />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
