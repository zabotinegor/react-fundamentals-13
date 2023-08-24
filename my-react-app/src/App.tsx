import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import {
  COURSEADD,
  COURSEINFO,
  COURSES,
  LOGIN,
  REGISTRATION,
  TOKEN,
} from "./constants/Pages";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (!token && location.pathname !== REGISTRATION) {
      navigate(LOGIN, { replace: true });
    }
  }, [navigate]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={COURSES} replace />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTRATION} element={<Registration />} />
        <Route path={COURSES} element={<Courses />} />
        <Route path={COURSEINFO} element={<CourseInfo />} />
        <Route path={COURSEADD} element={<CreateCourse />} />
      </Routes>
    </div>
  );
}

export default App;
