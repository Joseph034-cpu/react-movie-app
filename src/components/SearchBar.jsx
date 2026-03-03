import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
        style={{ padding: "8px", width: "250px" }}
      />
    </div>
  );
}

export default SearchBar;
