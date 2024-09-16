import React, { useState } from "react";
import MovieList from "../components/MovieFlix/MovieList";
import GenreFilter from "../components/MovieFlix/GenreFilter";
import "../styles/MovieFlix.css";

const MovieFlix = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  
  return (
    <div>
      <div class="logo-container">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" />
      </div>

      <GenreFilter
        onGenreChange={(selectedGenres) => {
          setSelectedGenres(selectedGenres);
        }}
      />
      <MovieList selectedGenres={selectedGenres} />
    </div>
  );
};

export default MovieFlix;
