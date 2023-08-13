import React, { useState } from "react";
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

interface CoursesProps {
  courses: CourseData[];
}

const Courses: React.FC<CoursesProps> = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
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
