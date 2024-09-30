import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import NavMenu from './../../components/NavMenu';
import FilmList from './../../components/Film/FilmList'; // Importa tu componente FilmList

const ActorDetail = () => {
  const { id } = useParams(); // Obtener el ID del actor desde la URL
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/people/${id}`) // Cambia esta URL por tu API real
      .then((response) => {
        setActor(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Hubo un problema al cargar los detalles del actor.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-5">
        {error}
      </Alert>
    );
  }

  if (!actor) {
    return null; 
  }

  return (
    <>
      <NavMenu />

      <Container className="my-5">
        <Row>
          <Col md={4}>
            <img 
              src={`http://localhost:3000/people/${actor.id}.jpg`} // Ruta donde se encuentra la imagen en la carpeta public
              alt={actor.name}
              className="img-fluid"
            />
          </Col>

          <Col md={8}>
            <h2>{actor.name}</h2>
            <p>
              <strong>Fecha de Nacimiento:</strong> {new Date(actor.birthdate).toLocaleDateString()}
            </p>
          </Col>
        </Row>

        <hr />

        <h3 className="mt-4">Películas como Director</h3>
        <Row className="mt-3">
          {actor.directedFilms.length > 0 ? (
            <FilmList films={actor.directedFilms} /> 
          ) : (
            <p>No hay películas en las que haya sido director.</p>
          )}
        </Row>

        <hr />

        <h3 className="mt-4">Películas como Actor</h3>
        <Row className="mt-3">
          {actor.films.length > 0 ? (
            <FilmList films={actor.films} />
          ) : (
            <p>No hay películas en las que haya sido actor.</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default ActorDetail;
