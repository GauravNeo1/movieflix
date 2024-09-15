import { GET_MOVIES } from "../constants/constants";

export const getMovieListQuery = (year, selectedGenres) => {
    const genreQuery = selectedGenres.length ? `&with_genres=${selectedGenres.join(',')}` : '';
    return `${GET_MOVIES}&primary_release_year=${year}&vote_count.gte=100&sort_by=popularity.desc${genreQuery}&page=1`
};
