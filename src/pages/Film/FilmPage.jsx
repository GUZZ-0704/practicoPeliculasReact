import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Spinner, Alert, Row } from 'react-bootstrap';
import NavMenu from './../../components/NavMenu';  
import FilmList from './../../components/Film/FilmList';  


const FilmPage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/film/') 
      .then((response) => {
        setFilms(response.data);  
        setLoading(false);
      })
      .catch(() => {
        setError('Hubo un problema al cargar las películas.');
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NavMenu /> 
      
      <Container fluid className="my-5">
        <h1 className="mb-4 text-center">Películas Disponibles</h1>
        
        {loading && (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        )}
        
        {error && (
          <Alert variant="danger" className="my-4">
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <Row className="justify-content-around"> 
            <FilmList films={films} />
          </Row>
        )}
      </Container>
    </>
  );
};

export default FilmPage;
