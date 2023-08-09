import React, { useState } from "react";
import Course from "./components/CourseCard/CourseCard";
import CourseInfo from "../CourseInfo/CourseInfo";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";

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

  const handleShowCourseInfo = (course: CourseData) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="courses">
      {selectedCourse ? (
        <CourseInfo {...selectedCourse} onBackToCourses={handleBackToCourses} />
      ) : courses.length === 0 ? (
        <EmptyCourseList />
      ) : (
        courses.map((course) => (
          <Course
            key={course.id}
            {...course}
            onShowCourseInfo={() => handleShowCourseInfo(course)}
          />
        ))
      )}
    </div>
  );
};

export default Courses;
