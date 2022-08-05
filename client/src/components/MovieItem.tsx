import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import movieDetails from "../models/movieDetails";
import {faHeart, faXmarkCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getMovieList from "../services/GetMovieList";
import addFavourite from "../services/AddFavourite";
import removeFavourite from "../services/removeFavourite";

type Props = {
    moviedetails : movieDetails,
    movieListType : string,
    deleteCallback : (movieDeleted : boolean) => void
};

const MovieItem = ({moviedetails, movieListType, deleteCallback} : Props) => {
    const [showFound, setShowFound] = useState<boolean>(false);
    const [showMovieAdded, setShowMovieAdded] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);  
    const [isFav, setIsFav] = useState<boolean>(false);
    
    useEffect(() => {
        if(movieListType === "favourite") {
            setIsFav(true);
        } else setIsFav(false);
    },[]);
    
    const addMovieFavourite = async () => {
        try {
            const data = await getMovieList('favourite');
            const found = data.find(obj => {
                return obj.title === moviedetails.title;
            });

            if(found) {
                setShowFound(true);
            } else {
                const movieDetailsNoId = {
                    title : moviedetails.title,
                    year : moviedetails.year,
                    genres : moviedetails.genres,
                    ratings : moviedetails.ratings,
                    poster : moviedetails.poster,
                    contentRating : moviedetails.contentRating,
                    duration : moviedetails.duration,
                    releaseDate : moviedetails.releaseDate,
                    averageRating : moviedetails.averageRating,
                    originalTitle : moviedetails.originalTitle,
                    storyline : moviedetails.storyline,
                    actors : moviedetails.actors,
                    imdbRating : moviedetails.imdbRating,
                    posterurl : moviedetails.posterurl
                } as Omit<movieDetails, 'id'>;

                await addFavourite(movieDetailsNoId);
                setShowMovieAdded(true);
            }
        } catch (error: any) {
            setError(error)
        }
    };

    const removeMovieFavourite = async () => {
        await removeFavourite(moviedetails.id);
        const data = await getMovieList('favourite');
        const found = data.find(obj => obj.title === moviedetails.title);
        if(found === undefined) {
            deleteCallback(true);
        }
    };

    return (
        <>
            {
                <>
                <Modal show={error===null ? false : true} onHide={() => setError(null)}>
                    <Modal.Body>Error! {error?.message}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setError(null)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                </>
            }
            {
                <>
                <Modal show={showMovieAdded} onHide={() => setShowMovieAdded(false)}>
                    <Modal.Body>Movie ||{moviedetails.title}|| added to your favourites.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowMovieAdded(false)}>
                            Okay
                        </Button>
                    </Modal.Footer>
                </Modal>
                </>
            }
            {
                <>
                <Modal show={showFound} onHide={() => setShowFound(false)}>
                    <Modal.Body>Movie ||{moviedetails.title}|| is already present in favourites.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowFound(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                </>
            }
            <Card className="my-3" style={{ width: '14rem', height: '22rem'}}>
                <Card.Img variant="top" src={`${process.env.REACT_APP_BASE_URL}/images/${moviedetails.poster}`} style={{minHeight: '16rem', maxHeight: '16rem'}}/>
                <Card.Body>
                    <Card.Title style={{fontSize: '1rem', overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{moviedetails.title}</Card.Title>
                    <div className="text-center my-4" style={{fontSize: '0.8rem'}}>
                        {
                            !isFav &&
                            <button onClick={addMovieFavourite} style={{backgroundColor: "transparent", border: "none", color: "black"}}>
                                Add to Favourites
                                <FontAwesomeIcon icon={faHeart} className="ms-2" />
                            </button>
                        }
                        {
                            isFav &&
                            <button onClick={removeMovieFavourite} style={{backgroundColor: "transparent", border: "none", color: "black"}}>
                                Remove from Favourites
                                <FontAwesomeIcon icon={faXmarkCircle} className="ms-2" />
                            </button>
                        }
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default MovieItem;