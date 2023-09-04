import "./Courses.css";

import React, { useState, useEffect } from "react";
import Course from "./components/CourseCard/CourseCard";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";
import SearchBar from "./components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import { COURSEADD, COURSES } from "../../constants/Pages";
import { actions as courseActions } from "../../store/courses/reducer";
import { actions as authorsActions } from "../../store/authors/reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCourses,
  selectIsCoursesLoading,
} from "../../store/courses/selectors";
import { GetCoursesRequest } from "../../types/courses";
import { selectRole } from "../../store/user/selectors";
import { Role } from "../../types/user";

const Courses: React.FC = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const coursesLoading = useSelector(selectIsCoursesLoading);
  const userRole = useSelector(selectRole);
  const [coursesRequest, setCoursesRequest] = useState<GetCoursesRequest>({
    searchTerm: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(courseActions.getCourses(coursesRequest));
    dispatch(authorsActions.getAuthors());
  }, []);

  const handleSearchBar = () => {
    dispatch(courseActions.getCourses(coursesRequest));
  };

  const handleBackToCourses = () => {
    setCoursesRequest({ searchTerm: "" });
    navigate(COURSES, { replace: true });
  };

  const handleAddCourse = () => {
    navigate(COURSEADD, { replace: true });
  };

  return (
    <div className="courses">
      <SearchBar
        searchTerm={coursesRequest.searchTerm || ""}
        setSearchTerm={(newSearchTerm) =>
          setCoursesRequest({
            searchTerm: newSearchTerm,
          })
        }
        onSearch={handleSearchBar}
        onReset={handleBackToCourses}
      />
      {coursesLoading ? (
        <div className="loading-icon">Loading...</div>
      ) : (
        <>
          {userRole === Role.admin && courses.length !== 0 && (
            <div className="add-course-button-container">
              <Button text="Add New Course" onClick={handleAddCourse} />
            </div>
          )}
          {courses.length === 0 ? (
            <EmptyCourseList />
          ) : (
            <div className="courses-list">
              {courses.map((course) => (
                <Course
                  key={course.id}
                  {...course}
                  onShowCourseInfo={() =>
                    navigate(`${COURSES}/${course.id}`, { replace: true })
                  }
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Courses;
