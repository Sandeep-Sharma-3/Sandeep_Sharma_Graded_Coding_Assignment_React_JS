import { Component } from "react";
import { Alert, Button, Col, Modal, Row } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import movieDetails from "../models/movieDetails";
import getMovieList from "../services/GetMovieList";
import LoadingIndicator from "./common/LoadingIndicator";
import MovieItem from "./MovieItem";

type Props = {
    searchQuery : string|undefined
};

type State = {
    status: "LOADING" | "LOADED" | "ERROR_LOADING",
    movies?: movieDetails[],
    error?: Error
    movieDeleted: boolean
};

class ListMovieItems extends Component<RouteComponentProps<{movieListType:string}> & Props, State> {
    state : State = {
        status: 'LOADING',
        movieDeleted: false
    };

    render() {
        let el;
        const deleteCallback = (movieDeleted : boolean) => {
            this.setState({
                movieDeleted : true
            });
        };

        switch(this.state.status) {
            case 'LOADING':
                el = (<LoadingIndicator size="large" message="Fetching movie list. Please Wait!"/>);
                break;
            case 'LOADED':
                el = (
                    <>
                        <>
                        <Modal show={this.state.movieDeleted} onHide={() => this.setState({movieDeleted:false})}>
                            <Modal.Body>The movie has been removed from your favourites.</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.setState({movieDeleted:false})}>
                                    Okay
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        </>
                        
                        <h3 className="my-3">Movies</h3>
                        <hr/>
                        <Row xs={2} md={3} lg={5}>
                            {
                                this.state.movies?.filter(post => {
                                    if (this.props.searchQuery === '' || this.props.searchQuery === undefined) {
                                      return post;
                                    } else {
                                        const query = this.props.searchQuery as string;
                                        if (post.title.toLowerCase().includes(query.toLowerCase())) {
                                            return post;
                                        }
                                    }
                                }).map(
                                    movie => (
                                        <Col key={movie.id}>
                                            <MovieItem deleteCallback={deleteCallback} moviedetails={movie} movieListType={this.props.match.params.movieListType} />
                                        </Col>
                                    )
                                )
                            }
                        </Row>
                    </>
                );
                break;
            case 'ERROR_LOADING':
                el = (
                    <Alert variant="danger my-3">
                        {this.state.error?.message}
                    </Alert>
                );
                break;
        };

        return el;
    }

    async componentDidMount() {
        const {match} = this.props;
        this.setState({
            status: 'LOADING',
            movieDeleted: false
        });

        try {
            const data = await getMovieList(match.params.movieListType);
            this.setState({
                status: 'LOADED',
                movies: data
            });
        } catch(error:any) {
            this.setState({
                status: 'ERROR_LOADING',
                error
            });
        }
    }

    async componentDidUpdate(prevProps:RouteComponentProps<{movieListType:string}>, prevState : State) {
        if(prevProps.match.params.movieListType !== this.props.match.params.movieListType || prevState.movieDeleted !== this.state.movieDeleted) {
            const {match} = this.props;
            this.setState({
                status: 'LOADING',
            });

            try {
                const data = await getMovieList(match.params.movieListType);
                this.setState({
                    status: 'LOADED',
                    movies: data
                });
            } catch(error:any) {
                this.setState({
                    status: 'ERROR_LOADING',
                    error
                });
            }
        }
    }
};

export default ListMovieItems;