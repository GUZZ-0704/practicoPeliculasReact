import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const FormFilm = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // Obtener el ID de la película si está en modo de edición

    // Estados para los campos de la película
    const [name, setName] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [release_date, setReleaseDate] = useState('');
    const [score, setScore] = useState('');
    const [trailer, setTrailer] = useState('');
    const [directorId, setDirectorId] = useState('');

    const [directorList, setDirectorList] = useState([]);  // Lista de directores para el select
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getFilmById();  // Si hay un ID, estamos en modo edición y obtenemos los datos
        }
        getListaDirectores();  // Obtener la lista de directores para el select
    }, [id]);

    const getFilmById = () => {
        axios.get(`http://localhost:3000/film/${id}`)
            .then(res => {
                const film = res.data;
                setName(film.name);
                setSynopsis(film.synopsis);
                setReleaseDate(moment(film.release_date).format('YYYY-MM-DD'));
                setScore(film.score);
                setTrailer(film.trailer);
                setDirectorId(film.directorId);
            }).catch(error => {
                console.log(error);
            });
    }

    const getListaDirectores = () => {
        axios.get('http://localhost:3000/people')  // Suponiendo que los directores están en la tabla 'people'
            .then(res => {
                setDirectorList(res.data);  // Guardamos la lista de directores
            }).catch(error => {
                console.log(error);
            });
    }

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const film = {
            name,
            synopsis,
            release_date,
            score,
            trailer,
            directorId
        };

        if (id) {
            editFilm(film);
        } else {
            insertFilm(film);
        }
    }

    const editFilm = (film) => {
        axios.put(`http://localhost:3000/film/${id}`, film)
            .then(res => {
                console.log(res.data);
                navigate('/admin/films');
            }).catch(error => {
                console.log(error);
            });
    }

    const insertFilm = (film) => {
        axios.post('http://localhost:3000/film', film)
            .then(res => {
                console.log(res.data);
                navigate('/admin/films');
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>{id ? 'Editar Película' : 'Crear Película'}</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control required value={name} type="text" onChange={(e) => setName(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un nombre para la película.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Sinopsis:</Form.Label>
                                        <Form.Control required value={synopsis} type="text" onChange={(e) => setSynopsis(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese una sinopsis.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Fecha de Lanzamiento:</Form.Label>
                                        <Form.Control required value={release_date} type="date" onChange={(e) => setReleaseDate(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese una fecha de lanzamiento válida.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Score:</Form.Label>
                                        <Form.Control
                                            required
                                            value={score}
                                            type="number"
                                            min={1}   // Mínimo permitido
                                            max={100} // Máximo permitido
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                // Si el valor está fuera del rango, no lo permitimos
                                                if (value >= 1 && value <= 100) {
                                                    setScore(value);
                                                }
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese el score (1-100).
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group>
                                        <Form.Label>Trailer (YouTube URL):</Form.Label>
                                        <Form.Control required value={trailer} type="text" onChange={(e) => setTrailer(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese el enlace del tráiler.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Director:</Form.Label>
                                        <Form.Select required value={directorId} onChange={(e) => setDirectorId(e.target.value)}>
                                            <option value="">Seleccione un Director...</option>
                                            {directorList.map(director => (
                                                <option key={"director-" + director.id} value={director.id}>{director.name}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un director.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar datos</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default FormFilm;
