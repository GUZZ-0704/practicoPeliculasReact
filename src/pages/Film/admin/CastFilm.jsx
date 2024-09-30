import axios from "axios";
import { useEffect, useState } from "react";
import NavMenuAdmin from "../../../components/NavMenuAdmin";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const CastFilm = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [actors, setActors] = useState([]); 
    const [cast, setCast] = useState([]);
    const [checkedActors, setCheckedActors] = useState(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActorsAndCast();
    }, [id]);

    const fetchActorsAndCast = async () => {
        try {
            const actorResponse = await axios.get("http://localhost:3000/people");
            setActors(actorResponse.data);

            const castResponse = await axios.get(`http://localhost:3000/film/${id}/cast`);
            setCast(castResponse.data);

            const initialCheckedActors = new Set(castResponse.data.map(castItem => castItem.cast.actorId));
            setCheckedActors(initialCheckedActors);

            setLoading(false);
        } catch (error) {
            console.error("Error al obtener datos:", error);
            setLoading(false);
        }
    };

    const handleCheckboxChange = (actorId) => {
        const updatedCheckedActors = new Set(checkedActors);
        if (updatedCheckedActors.has(actorId)) {
            updatedCheckedActors.delete(actorId); 
        } else {
            updatedCheckedActors.add(actorId); 
        }
        setCheckedActors(updatedCheckedActors);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        for (const actor of actors) {
            const actorId = actor.id;
            const isChecked = checkedActors.has(actorId);
            const isInCast = cast.some(castItem => castItem.cast.actorId === actorId);

            if (isChecked && !isInCast) {
                await axios.post(`http://localhost:3000/cast/${id}`, { actorId });
            } else if (!isChecked && isInCast) {
                const castItem = cast.find(castItem => castItem.cast.actorId === actorId);
                await axios.delete(`http://localhost:3000/cast/${id}/actor/${castItem.cast.actorId}`);
            }
        }
        navigate('/admin/films');
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            <NavMenuAdmin />
            <Container className="mt-4">
                <h2>Gestionar Reparto de la Película</h2>
                <Form onSubmit={onSubmit}>
                    <Row>
                        {actors.map((actor) => (
                            <Col md={4} key={actor.id} className="mb-3">
                                <Card 
                                    className="shadow-sm" 
                            
                                    style={{ cursor: 'pointer' }} // Cambiar el cursor para indicar que se puede hacer clic
                                >
                                    <Card.Body onClick={() => handleCheckboxChange(actor.id)} >
                                        <Form.Check
                                            type="checkbox"
                                            id={`actor-${actor.id}`}
                                            label={actor.name}
                                            checked={checkedActors.has(actor.id)}
                                            onChange={() => handleCheckboxChange(actor.id)}
                                            onClick={(e) => e.stopPropagation()} // Evitar que el clic en el checkbox cierre el evento en el Card
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Button type="submit" variant="success" className="mt-3">
                        Guardar cambios y volver a la lista de películas
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default CastFilm;
