import React, { ChangeEvent, KeyboardEvent } from 'react';

interface SearchBarProps {
  location: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ location, onChange, onSearch, onKeyDown }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Enter Location"
      value={location}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
    <i className="fa-solid fa-magnifying-glass" onClick={onSearch}></i>
  </div>
);

export default SearchBar;
