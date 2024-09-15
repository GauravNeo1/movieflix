import { GET_MOVIES } from "../constants/constants";

export const getMovieListQuery = (year) => {
    return `${GET_MOVIES}&primary_release_year=${year}&vote_count.gte=100&sort_by=popularity.desc&page=1`
};
