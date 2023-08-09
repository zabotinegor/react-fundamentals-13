import React, { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onReset: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onReset }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

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
      <Button text="Search" onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
