import React, { useState } from "react";
import axios from "axios";

const HerePlacesAutocomplete = ({ value, onChange }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    onChange(e); 

    if (searchQuery.length > 2) {
      try {
        const response = await axios.get(
          `https://autosuggest.search.hereapi.com/v1/autosuggest`,
          {
            params: {
              q: searchQuery,
              apiKey: import.meta.env.VITE_HERE_API_KEY,
              at: "52.5200,13.4050",
            },
          }
        );
        setSuggestions(response.data.items || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Search for a location..."
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {suggestions.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              setQuery(item.title);
              onChange({ target: { value: item.title } });
              setSuggestions([]);
            }}
            style={{
              padding: "8px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
            }}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HerePlacesAutocomplete;
