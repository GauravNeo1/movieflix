import React, { useState } from "react";
import MovieList from "../components/MovieFlix/MovieList";
import GenreFilter from "../components/MovieFlix/GenreFilter";

const MovieFlix = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  
  return (
    <div>
      <h1>MOVIEFLIX</h1>

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
