import React, { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

import "./SearchBar.css";

interface SearchBarProps {
  // onSearch: (searchTerm: string) => void;
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
  // const [searchTerm, setSearchTerm] = useState("");

  // const handleSearch = () => {
  //   onSearch(searchTerm);
  // };

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
        onChange={handleInputChange} // Pass the onChange function directly
      />
      {/* <Button text="Search" onClick={handleSearch} /> */}
      <Button text="Search" onClick={onSearch} />
    </div>
  );
};

export default SearchBar;
