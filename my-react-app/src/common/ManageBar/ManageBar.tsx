import "./ManageBar.css";

import React from "react";
import Button from "../../common/Button/Button";
import { useSelector } from "react-redux";
import { selectRole } from "../../store/user/selectors";
import { Role } from "../../types/user";

interface ManageBarProps {
  onShowClick: () => void;
  onUpdateClick: () => void;
  onDeleteClick: () => void;
}

const ManageBar: React.FC<ManageBarProps> = ({
  onShowClick,
  onUpdateClick,
  onDeleteClick,
}) => {
  const userRole = useSelector(selectRole);

  return (
    <div className="manage-bar">
      <div className="left-buttons">
        <Button text="Show" onClick={onShowClick} />
      </div>
      {userRole === Role.admin && (
        <div className="right-buttons">
          <Button text="Update" onClick={onUpdateClick} />
          <Button text="Delete" onClick={onDeleteClick} />
        </div>
      )}
    </div>
  );
};

export default ManageBar;
