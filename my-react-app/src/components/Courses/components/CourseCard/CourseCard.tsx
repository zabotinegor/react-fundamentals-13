import "./CourseCard.css";

import Button from "../../../../common/Button/Button";
import { formatDuration } from "../../../../helpers/getCourseDuration";
import { formatDate } from "../../../../helpers/formatDate";
import { getAuthorsList } from "../../../../helpers/getAuthorsList";
import { useSelector } from "react-redux";
import { selectAuthors } from "../../../../store/authors/selectors";

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
  const authorsList = useSelector(selectAuthors);

  return (
    <div className="course">
      <h2 className="course-title">{title}</h2>
      <div className="course-details">
        <div className="course-description">
          <p>{description}</p>
        </div>
        <div className="course-details-content">
          <p className="authors-list">{getAuthorsList(authors, authorsList)}</p>
          <p>Duration: {formatDuration(duration)}</p>
          <p>Creation Date: {formatDate(creationDate)}</p>
          <Button text="Show Course" onClick={onShowCourseInfo} />
        </div>
      </div>
    </div>
  );
};

export default Course;
