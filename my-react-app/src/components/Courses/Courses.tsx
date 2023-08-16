import React, { useState, useEffect } from "react";
import axios from "axios";
import Course from "./components/CourseCard/CourseCard";
import CourseInfo from "../CourseInfo/CourseInfo";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";
import SearchBar from "./components/SearchBar/SearchBar";

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
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  // Q1. Is it still necessary? Or can we do away with the work of methods with parameters?
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [courses, setCourses] = useState<CourseData[]>([]);

  // Q2. Why does this endpoint request go twice on page load?
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
      // Q3. Can we take the root url out somewhere?
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

  const handleShowCourseInfo = (course: CourseData) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setSearchTerm("");
  };

  return (
    <div className="courses">
      {selectedCourse ? (
        <CourseInfo {...selectedCourse} onBackToCourses={handleBackToCourses} />
      ) : (
        <div>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearchBar}
            onReset={handleBackToCourses}
          />
          {courses.length === 0 ? (
            <EmptyCourseList />
          ) : (
            <div className="courses-list">
              {courses.map((course) => (
                <Course
                  key={course.id}
                  {...course}
                  onShowCourseInfo={() => handleShowCourseInfo(course)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Courses;
