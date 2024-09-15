import React, { useState, useEffect } from "react";
import "../../styles/GenreFilter.css";
import { GET_GENRES } from "../../constants/constants";
import axios from "axios";

const GenreFilter = ({ onGenreChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
 
  useEffect(() => {
    const fetchGenres = async () => {
      const res = await axios.get(GET_GENRES);
      setGenres(res.data.genres);
    };
    fetchGenres();
  }, []);


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
