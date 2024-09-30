import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../../components/NavMenu";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment"; 

const FormActor = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [errorText, setErrorText] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getActorById();
        }
    }, [id]);

    const getActorById = () => {
        axios.get(`http://localhost:3000/people/${id}`)
            .then(res => {
                const actor = res.data;
                setName(actor.name);
                setBirthdate(moment(actor.birthdate).format('YYYY-MM-DD'));  // Formatear la fecha para el campo de tipo "date"
            }).catch(error => {
                console.log(error);
            });
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeBirthdate = (e) => {
        setBirthdate(e.target.value);
    }

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        setErrorText('');

        const actor = {
            name,
            birthdate
        };

        if (id) {
            editActor(actor);
        } else {
            insertActor(actor);
        }
    }

    const editActor = (actor) => {
        axios.patch(`http://localhost:3000/people/${id}`, actor)
            .then(res => {
                console.log(res.data);
                navigate('/admin/people');  // Redirigir a la lista de actores
            }).catch(error => {
                const errorMsg = error.response.data.msg;
                setErrorText(errorMsg);
                console.log(error);
            });
    }

    const insertActor = (actor) => {
        axios.post('http://localhost:3000/people', actor)
            .then(res => {
                console.log(res.data);
                navigate('/admin/people');  // Redirigir a la lista de actores
            }).catch(error => {
                console.log(error);
                setErrorText('Error al crear el actor.');
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
                                    <h2>{id ? 'Editar Actor' : 'Crear Actor'}</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    {errorText && <Alert variant="danger">{errorText}</Alert>}

                                    {/* Campo Nombre */}
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control 
                                            required 
                                            value={name} 
                                            type="text" 
                                            onChange={onChangeName} 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese el nombre.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* Campo Fecha de Nacimiento */}
                                    <Form.Group>
                                        <Form.Label>Fecha de Nacimiento:</Form.Label>
                                        <Form.Control 
                                            required 
                                            value={birthdate} 
                                            type="date" 
                                            onChange={onChangeBirthdate} 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese una fecha de nacimiento válida.
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

export default FormActor;
