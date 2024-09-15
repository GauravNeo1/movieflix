import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "../../styles/MovieList.css";
import { getMovieListQuery } from "../../utils/utils";

const MovieList = () => {
  const [moviesByYear, setMoviesByYear] = useState({});
  const [currentYear, setCurrentYear] = useState(2012);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (year) => {
    setLoading(true);
    try {
      const res = await axios.get(getMovieListQuery(year));
      const movieList = res.data.results;

      setMoviesByYear((prevMovies) => ({
        ...prevMovies,
        [year]: movieList,
      }));

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    console.log(window.scrollY, "scroll");
    const scrollTop = window.scrollY;
    const scrollBottom = window.innerHeight + scrollTop;

    if (scrollBottom >= document.body.scrollHeight - 100) {
      setCurrentYear((prevYear) => prevYear + 1);
    }

    if (scrollTop === 0) {
      setCurrentYear((prevYear) => prevYear - 1);
    }
  }

  useEffect(() => {
    fetchMovies(currentYear);
  }, [currentYear]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="movie-list">
      {Object.keys(moviesByYear)
        .sort((a, b) => a - b)
        .map((year) => (
          <div key={year}>
            <h2 className="movie-year">{year}</h2>
            <div className="movie-grid">
              {
                moviesByYear[year].map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
            }
            </div>
          </div>
        ))}
      {loading && <div className="loading">Loading more movies...</div>}
    </div>
  );
};

export default MovieList;
