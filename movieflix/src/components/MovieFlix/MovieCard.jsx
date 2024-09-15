import React from "react";
import "../../styles/MovieCard.css";
import { BASE_IMAGE_PATH } from "../../constants/constants";

const MovieCard = ({ movie }) => {
  const {
    title,
    poster_path,
  } = movie;

  return (
    <div className="movie-card">
      <img src={`${BASE_IMAGE_PATH}${poster_path}`} alt={title} />
      <div className="movie-footer">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default MovieCard;
