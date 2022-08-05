import axios from "axios";
import movieDetails from "../models/movieDetails";

const getMovieList = (movieListType : string) => {
    return axios.get<movieDetails[]>(`${process.env.REACT_APP_BASE_URL}/${movieListType}`)
    .then(response => response.data)
};

export default getMovieList;