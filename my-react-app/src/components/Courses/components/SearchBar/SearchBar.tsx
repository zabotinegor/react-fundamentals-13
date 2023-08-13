import React from "react";
import Input from "../../../../common/Input/Input";
import Button from "../../../../common/Button/Button";

import "./SearchBar.css";

interface SearchBarProps {
  onSearch: () => void;
  onReset: () => void;
  searchTerm: string;
  setSearchTerm: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  onReset,
}) => {
  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    if (value === "") {
      onReset();
    }
  };

  return (
    <div className="search-bar">
      <Input
        type="text"
        placeholder="Search courses"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button text="Search" onClick={onSearch} />
    </div>
  );
};

export default SearchBar;
