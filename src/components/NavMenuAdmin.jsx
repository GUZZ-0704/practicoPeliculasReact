import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import './NavMenu.css';  // Manteniendo el mismo archivo CSS para consistencia

const NavMenuAdmin = () => {
    return (
        <Navbar bg="dark" expand="lg" className="navbar-custom">
            <Container>
                <Navbar.Brand href="/" className="text-light fw-bold">
                    🎥 Proyecto Películas - Admin
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown title="Películas" id="films-dropdown" className="custom-link">
                            <NavDropdown.Item as={Link} to="/admin/films">Lista de Películas</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/films/create">Crear Película</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Actores" id="actors-dropdown" className="custom-link">
                            <NavDropdown.Item as={Link} to="/admin/people">Lista de Actores</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/people/create">Crear Actor</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenuAdmin;
