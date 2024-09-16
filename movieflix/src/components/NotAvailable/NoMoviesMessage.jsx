import React, { useContext} from 'react';
import '../../styles/NoMoviesMessage.css'; 
import { DataContext } from '../../DataContext/DataContext';

const NoMoviesMessage = ({ selectedGenres }) => {

  const { genreMap } = useContext(DataContext);
  const genreNames = selectedGenres.map((id) => genreMap[id] || []).toString();

  return (
    <div className="no-movies-message">
      <h2>No Movies Available</h2>
      <p>
        Unfortunately, there are no movies available for the selected genres: <strong>{genreNames}</strong> for this year.
      </p>
    </div>
  );
};

export default NoMoviesMessage;
