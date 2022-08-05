import React, { useRef } from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faVideoCamera} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import {faSearch} from '@fortawesome/free-solid-svg-icons';

type Props = {
    searchMovie : (searchMovie : string|undefined) => void
};

const NavigationMenu = ({searchMovie} : Props) => {
    const searchInput = useRef<HTMLInputElement>(null);
    const onType = () => {
        searchMovie(searchInput?.current?.value);
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <FontAwesomeIcon icon={faVideoCamera} className="me-2"/>
                    Movie Bar
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link to="/movies-in-theaters" as={NavLink}>Movies In Theaters</Nav.Link>
                        <Nav.Link to="/movies-coming" as={NavLink}>Coming Soon</Nav.Link>
                        <Nav.Link to="/top-rated-india" as={NavLink}>Top Rated Indian</Nav.Link>
                        <Nav.Link to="/top-rated-movies" as={NavLink}>Top Rated Movies</Nav.Link>
                        <Nav.Link to="/favourite" as={NavLink}>Favourites</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        ref={searchInput}
                        onChange={onType}
                    />
                    <div style={{display: "flex", alignItems: "center", background:"silver", borderRadius:"10px", padding:"0.5rem", marginLeft:"0.25rem"}}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </Form>
            </Container>
        </Navbar>
    );
};

export default NavigationMenu;