import "./CourseInfo.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../common/Button/Button";
import { formatDuration } from "../../helpers/getCourseDuration";
import { formatDate } from "../../helpers/formatDate";
import { useParams, useNavigate } from "react-router-dom";
import { COURSES } from "../../constants/Pages";
import { actions as courseActions } from "../../store/course/reducer";
import { actions as authorsActions } from "../../store/authors/reducer";
import { selectAuthors } from "../../store/authors/selectors";
import { getAuthorsList } from "../../helpers/getAuthorsList";
import {
  selectCurrentCourse,
  selectIsCurrentCourseLoading,
} from "../../store/course/selectors";

const CourseInfo: React.FC = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams<{ courseId: string }>();
  const course = useSelector(selectCurrentCourse);
  const authorsList = useSelector(selectAuthors);
  const isCourseLoading = useSelector(selectIsCurrentCourseLoading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authorsActions.getAuthors());
    dispatch(courseActions.getCurrentCourse({ courseId: courseId }));
  }, []);

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
                {getAuthorsList(course.authors, authorsList)}
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
