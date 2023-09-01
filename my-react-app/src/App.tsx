import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import {
  COURSEADD,
  COURSEINFO,
  COURSES,
  LOGIN,
  REGISTRATION,
} from "./constants/Pages";
import AuthPrivateRoute from "./routes/AuthPrivateRoute";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import RolePrivateRoute from "./routes/RolesPrivateRoute";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import { Role } from "./types/user";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTRATION} element={<Registration />} />
        <Route
          path="/*"
          element={
            <AuthPrivateRoute>
              <MainContent />
            </AuthPrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

function MainContent() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={COURSES} replace />} />
      <Route path={COURSES} element={<Courses />} />
      <Route path={COURSEINFO} element={<CourseInfo />} />
      <Route
        path={COURSEADD}
        element={
          <RolePrivateRoute requiredRoles={[Role.admin]}>
            <CreateCourse />
          </RolePrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
