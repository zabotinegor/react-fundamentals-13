import React, { useState, useEffect } from "react";
import Button from "../../../../common/Button/Button";
import { formatDuration } from "../../../../helpers/getCourseDuration";
import { formatDate } from "../../../../helpers/formatDate";
import { getAuthorAPI, Author } from "../../../../helpers/requests"; // Import the getAuthorAPI function

import "./CourseCard.css";

interface CourseProps {
  title: string;
  duration: number;
  creationDate: string;
  description: string;
  authors: string[];
  onShowCourseInfo: () => void;
}

const Course: React.FC<CourseProps> = ({
  title,
  duration,
  creationDate,
  description,
  authors,
  onShowCourseInfo,
}) => {
  const [authorsData, setAuthorsData] = useState<(Author | null)[]>();

  useEffect(() => {
    const fetchData = async () => {
      const authorPromises = authors.map(async (authorId) => {
        try {
          const authorData = await getAuthorAPI(authorId);
          return authorData;
        } catch (error) {
          console.error("Error fetching author data:", error);
          return null;
        }
      });

      const fetchedAuthorsData = await Promise.all(authorPromises);
      setAuthorsData(fetchedAuthorsData.filter((data) => data !== null));
    };

    fetchData();
  }, [authors]);

  return (
    <div className="course">
      <h2 className="course-title">{title}</h2>
      <div className="course-details">
        <div className="course-description">
          <p>{description}</p>
        </div>
        <div className="course-details-content">
          <p className="authors-list">
            {authorsData
              ? authorsData.map((author) => author?.name).join(", ")
              : ""}
          </p>
          <p>Duration: {formatDuration(duration)}</p>
          <p>Creation Date: {formatDate(creationDate)}</p>
          <Button text="Show Course" onClick={onShowCourseInfo} />
        </div>
      </div>
    </div>
  );
};

export default Course;
