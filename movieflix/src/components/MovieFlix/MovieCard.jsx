import React, { useContext } from "react";
import "../../styles/MovieCard.css";
import { BASE_IMAGE_PATH } from "../../constants/constants";
import { DataContext } from "../../DataContext/DataContext";

const MovieCard = ({ movie }) => {
  const {
    title,
    overview,
    poster_path,
    genre_ids,
    release_date,
    vote_average,
  } = movie;

  const { genreMap } = useContext(DataContext);
  const genreNames = genre_ids.map((id) => genreMap[id] || null);

  return (
    <div className="movie-card">
      <img src={`${BASE_IMAGE_PATH}${poster_path}`} alt={title} />
      <div className="movie-footer">
        <h2>{title}</h2>
      </div>
      <div className="movie-overlay">
        <h2>{title}</h2>

        <p>
          <strong>Genre : </strong>
          {genreNames.toString()}
        </p>
        <p>
          <strong>Rating : </strong>
          {Math.floor(vote_average)} / 10
        </p>
        <p>
          <strong>Release Date : </strong>
          {release_date}
        </p>

        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
