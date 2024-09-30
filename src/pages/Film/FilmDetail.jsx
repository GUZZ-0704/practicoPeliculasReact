import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import NavMenu from './../../components/NavMenu';
import CastList from './../../components/Cast/CastList'; 
import ActorCard from '../../components/Cast/ActorCard';

const FilmDetail = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/film/${id}`)
      .then((response) => {
        setFilm(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Hubo un problema al cargar los detalles de la película.');
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

  if (!film) {
    return null;
  }

  return (
    <>
      <NavMenu />

      <Container className="my-5">
        <Row>
          <Col md={4}>
            <img 
              src={`http://localhost:3000/film/${film.id}.jpg`}
              alt={film.name}
              className="img-fluid"
            />
          </Col>

          <Col md={8}>
            <h2>{film.name}</h2>
            <p>
              <strong>Puntuación:</strong> {film.score}%<br />
              <strong>Lanzamiento:</strong> {new Date(film.release_date).toLocaleDateString()}
            </p>
            <p>{film.synopsis}</p>
          </Col>
        </Row>

        <hr />

        <Row className="my-4">
          <Col md={12}>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item trailer"
                src={`https://www.youtube.com/embed/${film.trailer}?autoplay=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={film.name}
              ></iframe>
            </div>
          </Col>
        </Row>

        <hr />


        <h3 className="mt-4">Director</h3>
        <Row className="mt-3">
          <Col md={12}>
            <ActorCard actor={film.director} />
          </Col>

          <Col md={12} className="d-flex flex-wrap">
            <CastList cast={film.actors} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FilmDetail;
