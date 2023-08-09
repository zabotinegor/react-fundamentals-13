import React from "react";
import Button from "../../common/Button/Button";
import { mockedAuthorsList } from "../../mocks/Authors";
import { formatDuration } from "../../helpers/getCourseDuration";
import { formatDate } from "../../helpers/formatDate";
import "./CourseInfo.css";

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
  const authorMap = new Map(
    mockedAuthorsList.map((author) => [author.id, author.name])
  );
  const authorsList = authors
    .map((authorId) => authorMap.get(authorId))
    .join(", ");

  return (
    <div className="course">
      <h2 className="course-title">{title}</h2>
      <div className="course-details">
        <div className="course-description">
          <p>{description}</p>
        </div>
        <div className="course-details-content">
          <p>ID: {id}</p>
          <p className="authors-list">{authorsList}</p>
          <p>Duration: {formatDuration(duration)}</p>
          <p>Creation Date: {formatDate(creationDate)}</p>
          <Button text="Back to Courses" onClick={onBackToCourses} />
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
