import React, { useState, useEffect } from "react";
import Button from "../../common/Button/Button";
import { formatDuration } from "../../helpers/getCourseDuration";
import { formatDate } from "../../helpers/formatDate";
import { useParams, useNavigate } from "react-router-dom";
import { COURSES } from "../../constants/Pages";
import {
  CourseData,
  getAuthorAPI,
  getCourseDataAPI,
} from "../../helpers/requests";

import "./CourseInfo.css";

const CourseInfo: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCourseDataAPI(
      courseId,
      async (result) => {
        const authorPromises = result.authors.map(async (authorId) => {
          try {
            const authorData = await getAuthorAPI(authorId);
            return authorData?.name;
          } catch (error) {
            console.error("Error fetching author data:", error);
            return null;
          }
        });

        const authorsData = await Promise.all(authorPromises);

        const updatedCourse: CourseData = {
          ...result,
          authors: authorsData.filter(
            (authorName) => authorName !== null
          ) as string[],
        };
        setCourse(updatedCourse);
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
                {course.authors.map((author) => author).join(", ")}
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
