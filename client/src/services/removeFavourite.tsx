import axios from "axios";

const removeFavourite = (movieId : string) => {
    return axios.delete(`${process.env.REACT_APP_BASE_URL}/favourite/${movieId}`);
};

export default removeFavourite;