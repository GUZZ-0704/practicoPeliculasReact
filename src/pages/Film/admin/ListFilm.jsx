import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenuAdmin from "../../../components/NavMenuAdmin";	
import { Link } from "react-router-dom";
import moment from "moment";

const ListFilm = () => {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        getFilms();
        document.title = "Listado de Películas";
    }, []);

    // Obtener la lista de películas desde el backend
    const getFilms = () => {
        axios.get('http://localhost:3000/film')
            .then(res => {
                setFilms(res.data);
            }).catch(error => {
                console.log(error);
            });
    }


    // Eliminar película por ID
    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar esta película?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/film/${id}`)
            .then(res => {
                console.log(res.data);
                getFilms();  // Recargar la lista después de eliminar
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <NavMenuAdmin />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Películas</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Fecha de Estreno</th>
                                            <th>Puntuación</th>
                                            <th>Director</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {films.map(film =>
                                            <tr key={film.id}>
                                                <td>
                                                    {/* Mostrar la imagen de la película */}
                                                    <img className="list-image" src={`http://localhost:3000/film/${film.id}.jpg`} alt="Portada de la película" width="100" />
                                                </td>
                                                <td>{film.id}</td>
                                                <td>{film.name}</td>
                                                <td>{moment(film.release_date).format('DD/MM/YYYY')}</td>
                                                <td>{film.score}%</td>
                                                <td>{film.director.name}</td>
                                                <td>
                                                    <Link className="btn btn-secondary" to={`/admin/films/${film.id}/photo`}>Cargar Foto</Link>{' '}
                                                    <Link className="btn btn-success" to={`/admin/cast/${film.id}`}>Modificar Reparto</Link>{' '}
                                                    <Link className="btn btn-primary" to={`/admin/films/${film.id}`}>Editar</Link>{' '}
                                                    <Button variant="danger" onClick={() => eliminar(film.id)}>Eliminar</Button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ListFilm;
