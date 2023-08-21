import React, { useState, useEffect } from "react";
import Button from "../../common/Button/Button";
import { formatDuration } from "../../helpers/getCourseDuration";
import { formatDate } from "../../helpers/formatDate";
import { getAuthorsList } from "../../helpers/getAuthorsList";
import { mockedAuthorsList } from "../../mocks/Authors";
import { useParams, useNavigate } from "react-router-dom";
import { COURSES } from "../../constants/Pages";
import { CourseData, getCourseDataAPI } from "../../helpers/requests";

import "./CourseInfo.css";

const CourseInfo: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCourseDataAPI(
      courseId,
      (result) => {
        setCourse(result);
      },
      (error) => {
        console.error("Error fetching course data:", error);
      }
    );
  }, [courseId]);

  const handleBackToCourses = () => {
    navigate(COURSES);
  };

  return (
    <div className="course">
      {course ? (
        <>
          <h2 className="course-title">{course.title}</h2>
          <div className="course-details">
            <div className="course-description">
              <p>{course.description}</p>
            </div>
            <div className="course-details-content">
              <p>ID: {course.id}</p>
              <p className="authors-list">
                {getAuthorsList(course.authors, mockedAuthorsList)}
              </p>
              <p>Duration: {formatDuration(course.duration)}</p>
              <p>Creation Date: {formatDate(course.creationDate)}</p>
              <Button text="Back to Courses" onClick={handleBackToCourses} />
            </div>
          </div>
        </>
      ) : (
        <p>Course was not found.</p>
      )}
    </div>
  );
};

export default CourseInfo;
