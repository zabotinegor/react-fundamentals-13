import React, { useState, useEffect } from "react";
import Course from "./components/CourseCard/CourseCard";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";
import SearchBar from "./components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import { COURSEADD, COURSES } from "../../constants/Pages";
import {
  CourseData,
  getAllCoursesAPI,
  getFilteredCoursesAPI,
} from "../../helpers/requests";

import "./Courses.css";

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [courses, setCourses] = useState<CourseData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
  }, []);

  const handleSearchBar = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    if (lowerCaseSearchTerm === "") {
      getCourses();
    } else {
      getFilteredCourses();
    }
  };

  const getCourses = () => {
    getAllCoursesAPI(
      (result) => {
        setCourses(result);
      },
      (error) => {
        console.error("Error fetching course data:", error);
      }
    );
  };

  const getFilteredCourses = () => {
    getFilteredCoursesAPI(
      searchTerm,
      (result) => {
        setCourses(result);
      },
      (error) => {
        console.error("Error fetching filtered course data:", error);
      }
    );
  };

  const handleBackToCourses = () => {
    setSearchTerm("");
    navigate(COURSES, { replace: true });
  };

  const handleAddCourse = () => {
    navigate(COURSEADD, { replace: true });
  };

  return (
    <div className="courses">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearchBar}
        onReset={handleBackToCourses}
      />
      {courses.length !== 0 && (
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
    </div>
  );
};

export default Courses;
