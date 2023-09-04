import "./CourseCard.css";

import { formatDuration } from "../../../../helpers/getCourseDuration";
import { formatDate } from "../../../../helpers/formatDate";
import { getAuthorsList } from "../../../../helpers/getAuthorsList";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthors } from "../../../../store/authors/selectors";
import ManageBar from "../../../../common/ManageBar/ManageBar";
import { DeleteCourseRequest } from "../../../../types/courses";
import { actions as courseActions } from "../../../../store/course/reducer";
import { useNavigate } from "react-router-dom";
import { COURSES } from "../../../../constants/Pages";

interface CourseProps {
  id: string;
  title: string;
  duration: number;
  creationDate: string;
  description: string;
  authors: string[];
  onShowCourseInfo: () => void;
}

const Course: React.FC<CourseProps> = ({
  id,
  title,
  duration,
  creationDate,
  description,
  authors,
  onShowCourseInfo,
}) => {
  const dispatch = useDispatch();
  const authorsList = useSelector(selectAuthors);
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    const request: DeleteCourseRequest = {
      courseId: id,
      handleSuccess: () => {
        console.log("deleted");
      },
    };

    dispatch(courseActions.deleteCourse(request));
  };

  const handleUpdate = (id: string) => {
    navigate(`${COURSES}/update/${id}`, { replace: true });
  };

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
          <ManageBar
            onShowClick={onShowCourseInfo}
            onDeleteClick={() => handleDelete(id)}
            onUpdateClick={() => handleUpdate(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Course;
