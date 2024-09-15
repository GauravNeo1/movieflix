import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { GET_GENRES } from "../constants/constants";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(GET_GENRES);
        setGenres(res.data.genres);
        console.log("data", res.data.genres)
      } catch (err) {
        console.log("Something went wrong");
      }
    };
    fetchGenres();
  }, []);

  const genreMap = genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  return (
    <DataContext.Provider value={{ genres, genreMap }}>
      {children}
    </DataContext.Provider>
  );
};
