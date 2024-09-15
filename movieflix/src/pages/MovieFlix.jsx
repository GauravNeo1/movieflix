import React from "react";
import MovieList from "../components/MovieFlix/MovieList";
import GenreFilter from "../components/MovieFlix/GenreFilter";

const MovieFlix = () => {
  return (
    <div>
      <h1>MOVIEFLIX</h1>
      <GenreFilter/>
      <MovieList />
    </div>
  );
};

export default MovieFlix;
