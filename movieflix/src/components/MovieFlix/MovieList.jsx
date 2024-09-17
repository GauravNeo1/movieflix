import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "../../styles/MovieList.css";
import { getMovieListQuery } from "../../utils/utils";
import NoMoviesMessage from "../NotAvailable/NoMoviesMessage";

const MovieList = ({ selectedGenres }) => {
  const [moviesByYear, setMoviesByYear] = useState({});
  const [currentYear, setCurrentYear] = useState(2012);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (year, selectedGenres) => {
    const current = new Date().getFullYear();
    if (year > current) {
      console.warn(`Skipping fetch for future year ${year}`);
      return;
    }

    if (
      moviesByYear[year] &&
      moviesByYear[year][selectedGenres.join()]?.length
    ) {
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(getMovieListQuery(year, selectedGenres));
      const movieList = res.data.results;

      setMoviesByYear((prevMovies) => ({
        ...prevMovies,
        [year]: {
          ...prevMovies[year],
          [selectedGenres.join()]: movieList, 
        },
      }));

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollBottom = window.innerHeight + scrollTop;

    if (scrollBottom >= document.body.scrollHeight - 100) {
      setCurrentYear((prevYear) => prevYear + 1);
    }

    if (scrollTop === 0) {
      setCurrentYear((prevYear) => prevYear - 1);
    }
  };

  useEffect(() => {
    fetchMovies(currentYear, selectedGenres);
  }, [currentYear]);

  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 
  useEffect(() => {
    const fetchFilterMovies = async () => {
      setLoading(true);
      try {
        const promises = Object.keys(moviesByYear).map((year) =>
          fetchMovies(year, selectedGenres)
        );
        await Promise.all(promises);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterMovies();
  }, [selectedGenres]);

  return (
    <div className="movie-list">
      {Object.keys(moviesByYear)
        .sort((a, b) => a - b)
        .map((year) => (
          <div key={year}>
            <h2 className="movie-year">{year}</h2>
            <div className="movie-grid">
              {moviesByYear[year] &&
              moviesByYear[year][selectedGenres.join()]?.length ? (
                moviesByYear[year][selectedGenres.join()].map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              ) : loading ? (
                <div className="loading">
                          <img src={`${process.env.PUBLIC_URL}/spinner.gif`} height={100} width={100} alt="Loading..." />
                </div>
              ) : (
                <NoMoviesMessage selectedGenres={selectedGenres} />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MovieList;
