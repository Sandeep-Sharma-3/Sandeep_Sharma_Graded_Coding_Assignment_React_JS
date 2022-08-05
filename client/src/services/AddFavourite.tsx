import axios from "axios";
import movieDetails from "../models/movieDetails";

const addFavourite = (movie : Omit<movieDetails,'id'>) => {
    return axios.post<movieDetails>(`${process.env.REACT_APP_BASE_URL}/favourite`,movie, {
        headers : {
            'Content-type' : 'application/json'
        }
    })
};

export default addFavourite;