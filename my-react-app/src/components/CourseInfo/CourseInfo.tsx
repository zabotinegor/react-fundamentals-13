import React, { useState, useEffect } from "react";
import Button from "../../common/Button/Button";
import { formatDuration } from "../../helpers/getCourseDuration";
import { formatDate } from "../../helpers/formatDate";
import { getAuthorsList } from "../../helpers/getAuthorsList";
import { mockedAuthorsList } from "../../mocks/Authors";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { COURSES } from "../../constants/Pages";

import "./CourseInfo.css";

interface CourseData {
  id: string;
  title: string;
  description: string;
  duration: number;
  authors: string[];
  creationDate: string;
}

const CourseInfo: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/courses/${courseId}`)
      .then((response) => {
        setCourse(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
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
        <p>Loading course information...</p>
      )}
    </div>
  );
};

export default CourseInfo;
