import React, { useState, useEffect } from "react";
import axios from "axios";
import Course from "./components/CourseCard/CourseCard";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";
import SearchBar from "./components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";

import "./Courses.css";

interface CourseData {
  id: string;
  title: string;
  duration: number;
  creationDate: string;
  description: string;
  authors: string[];
}

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
    axios
      .get("http://localhost:4000/courses/all")
      .then((response) => {
        setCourses(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  };

  const getFilteredCourses = () => {
    axios
      .get(`http://localhost:4000/courses/filter?title=${searchTerm}`)
      .then((response) => {
        setCourses(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching filtered course data:", error);
      });
  };

  const handleBackToCourses = () => {
    setSearchTerm("");
    navigate("/courses", { replace: true });
  };

  const handleAddCourse = () => {
    navigate("/courses/add", { replace: true });
  };

  return (
    <div className="courses">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearchBar}
        onReset={handleBackToCourses}
      />
      <div className="add-course-button-container">
        <Button text="Add New Course" onClick={handleAddCourse} />
      </div>
      {courses.length === 0 ? (
        <EmptyCourseList />
      ) : (
        <div className="courses-list">
          {courses.map((course) => (
            <Course
              key={course.id}
              {...course}
              onShowCourseInfo={() =>
                navigate(`/courses/${course.id}`, { replace: true })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
