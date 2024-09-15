import React, { useState, useEffect, useContext } from "react";
import "../../styles/GenreFilter.css";
import { DataContext } from "../../DataContext/DataContext";

const GenreFilter = ({ onGenreChange }) => {
  const { genres } = useContext(DataContext);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreClick = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  useEffect(() => {
    onGenreChange(selectedGenres);
  }, [selectedGenres, onGenreChange]);

  return (
    <div className="genre-filter">
      {genres.map((genre) => (
        <div
          key={genre.id}
          className={`genre-item ${
            selectedGenres.includes(genre.id) ? "selected" : ""
          }`}
          onClick={() => handleGenreClick(genre.id)}
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
};

export default GenreFilter;
