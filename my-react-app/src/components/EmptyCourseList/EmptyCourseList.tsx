import Button from "../../common/Button/Button";

const EmptyCourseList = () => {
  return (
    <div className="empty-course-list">
      <h2>Course List is Empty</h2>
      <p>Please use "Add New Course" button to add your first course.</p>
      <Button text="Add New Course" /> {/* Reuse the Button component */}
    </div>
  );
};

export default EmptyCourseList;
