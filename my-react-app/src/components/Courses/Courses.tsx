import React, { useState, useEffect } from "react";
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
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const newFilteredCourses = courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        course.id.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
    setFilteredCourses(newFilteredCourses);
  }, [courses, searchTerm]);

  const handleShowCourseInfo = (course: CourseData) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setSearchTerm("");
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="courses">
      {selectedCourse ? (
        <CourseInfo {...selectedCourse} onBackToCourses={handleBackToCourses} />
      ) : (
        <div>
          <SearchBar onSearch={handleSearch} onReset={handleBackToCourses} />
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
