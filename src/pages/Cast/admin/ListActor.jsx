import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenuAdmin from "../../../components/NavMenuAdmin";
import { Link } from "react-router-dom";
import moment from "moment";

const ListActor = () => {
    const [listaActores, setListaActores] = useState([]);

    useEffect(() => {
        getListaActores();
        document.title = "Listado de Actores";
    }, []);

    // Obtener la lista de actores desde el backend
    const getListaActores = () => {
        axios.get('http://localhost:3000/people')
            .then(res => {
                setListaActores(res.data);
            }).catch(error => {
                console.log(error);
            });
    }

    // Eliminar actor por ID
    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar este actor?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/people/${id}`)
            .then(res => {
                console.log(res.data);
                getListaActores();  // Recargar la lista después de eliminar
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
                                    <h2>Lista de Actores</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Foto</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Fecha de Nacimiento</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaActores.map(actor =>
                                            <tr key={actor.id}>
                                                <td>
                                                    {/* Mostrar la foto del actor desde la carpeta public */}
                                                    <img className="list-image" src={`http://localhost:3000/people/${actor.id}.jpg`} alt="Foto de perfil" width="100" />
                                                </td>
                                                <td>{actor.id}</td>
                                                <td>{actor.name}</td>
                                                <td>{moment(actor.birthdate).format('DD/MM/YYYY')}</td>
                                                <td>
                                                    <Link className="btn btn-secondary" to={`/admin/people/${actor.id}/photo`}>Cargar Foto</Link>{' '}
                                                    <Link className="btn btn-primary" to={`/admin/people/${actor.id}`}>Editar</Link>{' '}
                                                    <Button variant="danger" onClick={() => eliminar(actor.id)}>Eliminar</Button>
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

export default ListActor;
