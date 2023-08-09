import React from "react";
import "./CourseCard.css";
import Button from "../../common/Button/Button";

interface Author {
  name: string;
}

interface CourseProps {
  title: string;
  duration: string;
  creationDate: string;
  description: string;
  showCourseButton: boolean;
  authors: Author[];
}

const Course: React.FC<CourseProps> = ({
  title,
  duration,
  creationDate,
  description,
  showCourseButton,
  authors,
}) => {
  const authorsList = authors.map((author, index) => (
    <span key={index} className="author">
      {author.name}
    </span>
  ));

  return (
    <div className="course">
      <h2 className="course-title">{title}</h2>
      <div className="course-details">
        <div className="course-description">
          <p>{description}</p>
        </div>
        <div className="course-details-content">
          <p className="authors-list">{authorsList}</p>
          <p>Duration: {duration}</p>
          <p>Creation Date: {creationDate}</p>
          {showCourseButton && <Button text="Show Course" />}
        </div>
      </div>
    </div>
  );
};

export default Course;
