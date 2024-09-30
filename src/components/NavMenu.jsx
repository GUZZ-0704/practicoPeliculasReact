import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import './NavMenu.css';  

const NavMenu = () => {
    return (
        <Navbar bg="dark" expand="lg" className="navbar-custom">
            <Container>
                <Navbar.Brand href="/" className="text-light fw-bold">
                    🎥 Proyecto Películas
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className="nav-link custom-link" to="/films">Películas</Link>
                        <Link className="nav-link custom-link" to="/cast">Actores</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;
