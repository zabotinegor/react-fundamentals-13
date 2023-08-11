import React, { useState, useEffect, useCallback } from "react";
import Course from "./components/CourseCard/CourseCard";
import CourseInfo from "../CourseInfo/CourseInfo";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";
import SearchBar from "../SearchBar/SearchBar";

import "./Courses.css";

interface CourseData {
  id: string;
  title: string;
  duration: number;
  creationDate: string;
  description: string;
  authors: string[];
}

interface CoursesProps {
  courses: CourseData[];
}

const Courses: React.FC<CoursesProps> = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // Pass courses in state
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>(courses);

  const handleSearchBar = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const newFilteredCourses = courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        course.id.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
    setFilteredCourses(newFilteredCourses);
  };

  // useEffect(() => {
  // const lowerCaseSearchTerm = searchTerm.toLowerCase();
  // const newFilteredCourses = courses.filter((course) => {
  //   return (
  //     course.title.toLowerCase().includes(lowerCaseSearchTerm) ||
  //     course.id.toLowerCase().includes(lowerCaseSearchTerm)
  //   );
  // });
  // setFilteredCourses(newFilteredCourses);

  // }, [searchTerm]);

  const handleShowCourseInfo = (course: CourseData) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setSearchTerm("");
  };

  // const handleSearch = (searchTerm: string) => {
  //   setSearchTerm(searchTerm);
  // };

  return (
    <div className="courses">
      {selectedCourse ? (
        <CourseInfo {...selectedCourse} onBackToCourses={handleBackToCourses} />
      ) : (
        <div>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            // onSearch={handleSearch}
            onSearch={handleSearchBar}
            onReset={handleBackToCourses}
          />
          {filteredCourses.length === 0 || courses.length === 0 ? (
            <EmptyCourseList />
          ) : (
            <div className="courses-list">
              {filteredCourses.map((course) => (
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
