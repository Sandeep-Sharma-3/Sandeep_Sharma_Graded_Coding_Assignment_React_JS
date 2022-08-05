import { Col, Row } from "react-bootstrap";
import movieDetails from "../models/movieDetails";

type Props = {
    movieDetails : movieDetails
}
const ShowMovieDetails = ({movieDetails} : Props) => {
    return (
        <>
            <Row>
                <Col xs={12} lg={4} className="my-2">
                    <img style={{minHeight: '16rem', maxHeight: '16rem'}} src={`${process.env.REACT_APP_BASE_URL}/images/${movieDetails.poster}`}
                        alt={movieDetails.title}
                        className="w-100"
                    />
                </Col>
                <Col xs={12} lg={8} className="my-2">
                    <div>
                        <h1>{movieDetails.title}</h1>
                    </div>
                    <Row className="text-sm">
                        <Col xs={4} lg={3}>Imdb Rating</Col>
                        <Col xs={8} lg={9}>{movieDetails.imdbRating}</Col>
                    </Row>
                    <Row className="text-sm">
                        <Col xs={4} lg={3}>Content Rating</Col>
                        <Col xs={8} lg={9}>{movieDetails.contentRating}</Col>
                    </Row>
                    <Row className="text-sm">
                        <Col xs={4} lg={3}>Average Rating</Col>
                        <Col xs={8} lg={9}>{movieDetails.averageRating}</Col>
                    </Row>
                    <Row className="text-sm">
                        <Col xs={4} lg={3}>Duration</Col>
                        <Col xs={8} lg={9}>{movieDetails.duration}</Col>
                    </Row>
                    <Row className="text-sm">
                        <Col xs={4} lg={3}>Genres</Col>
                        <Col xs={8} lg={9}>{movieDetails.genres.join(", ")}</Col>
                    </Row>
                    <Row className="text-sm">
                        <Col xs={4} lg={3}>Actors</Col>
                        <Col xs={8} lg={9}>{movieDetails.actors.join(", ")}</Col>
                    </Row>
                    <Row className="text-sm">
                        <Col xs={4} lg={3}>Release Date</Col>
                        <Col xs={8} lg={9}>{movieDetails.releaseDate}</Col>
                    </Row>
                    <Row className="text-sm">
                        <Col xs={4} lg={3}>Story Line</Col>
                        <Col xs={8} lg={9}>{movieDetails.storyline}</Col>
                    </Row>
                </Col>
            </Row>  
        </>
    );
}

export default ShowMovieDetails;