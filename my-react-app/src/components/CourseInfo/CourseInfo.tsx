import React from "react";
import Button from "../../common/Button/Button";
import { formatDuration } from "../../helpers/getCourseDuration";
import { formatDate } from "../../helpers/formatDate";
import "./CourseInfo.css";
import { getAuthorsList } from "../../helpers/getAuthorsList";

interface CourseInfoProps {
  id: string;
  title: string;
  description: string;
  duration: number;
  authors: string[];
  creationDate: string;
  onBackToCourses: () => void;
}

const CourseInfo: React.FC<CourseInfoProps> = ({
  id,
  title,
  description,
  duration,
  authors,
  creationDate,
  onBackToCourses,
}) => {
  return (
    <div className="course">
      <h2 className="course-title">{title}</h2>
      <div className="course-details">
        <div className="course-description">
          <p>{description}</p>
        </div>
        <div className="course-details-content">
          <p>ID: {id}</p>
          <p className="authors-list">{getAuthorsList(authors)}</p>
          <p>Duration: {formatDuration(duration)}</p>
          <p>Creation Date: {formatDate(creationDate)}</p>
          <Button text="Back to Courses" onClick={onBackToCourses} />
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
