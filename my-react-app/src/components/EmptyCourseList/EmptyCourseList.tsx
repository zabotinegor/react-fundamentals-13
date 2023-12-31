import { useSelector } from "react-redux";
import Button from "../../common/Button/Button";
import { COURSEADD } from "../../constants/Pages";
import { selectRole } from "../../store/user/selectors";
import { Role } from "../../types/user";
import { useNavigate } from "react-router-dom";

const EmptyCourseList = () => {
  const navigate = useNavigate();
  const userRole = useSelector(selectRole);

  const handleAddCourse = () => {
    navigate(COURSEADD, { replace: true });
  };

  return (
    <div className="empty-course-list">
      <h2>Course List is Empty</h2>
      {userRole === Role.admin && (
        <>
          <p>Please use "Add New Course" button to add your first course.</p>
          <Button text="Add New Course" onClick={handleAddCourse} />
        </>
      )}
    </div>
  );
};

export default EmptyCourseList;
