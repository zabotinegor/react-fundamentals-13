import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import { COURSEADD } from "../../constants/Pages";

const EmptyCourseList = () => {
  const navigate = useNavigate();

  const handleAddCourse = () => {
    navigate(COURSEADD, { replace: true });
  };

  return (
    <div className="empty-course-list">
      <h2>Course List is Empty</h2>
      <p>Please use "Add New Course" button to add your first course.</p>
      <Button text="Add New Course" onClick={handleAddCourse} />
    </div>
  );
};

export default EmptyCourseList;
