import React from "react";
import "./CourseCard.css";
import Button from "../../../../common/Button/Button";
import { formatDuration } from "../../../../helpers/getCourseDuration";
import { formatDate } from "../../../../helpers/formatDate";
import { mockedAuthorsList } from "../../../../mocks/Authors";

interface CourseProps {
  title: string;
  duration: number;
  creationDate: string;
  description: string;
  authors: string[];
}

const Course: React.FC<CourseProps> = ({
  title,
  duration,
  creationDate,
  description,
  authors,
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
          <p className="authors-list">{authorsList}</p>
          <p>Duration: {formatDuration(duration)}</p>
          <p>Creation Date: {formatDate(creationDate)}</p>
          <Button text="Show Course" />
        </div>
      </div>
    </div>
  );
};

export default Course;
