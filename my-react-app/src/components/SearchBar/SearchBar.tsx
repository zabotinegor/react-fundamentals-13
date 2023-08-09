import React from "react";
import "./SearchBar.css";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
      <Input type="text" placeholder="Search courses" />
      <Button text="Search" />
    </div>
  );
};

export default SearchBar;
