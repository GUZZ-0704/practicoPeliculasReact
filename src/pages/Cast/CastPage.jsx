import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Spinner, Alert } from 'react-bootstrap';
import NavMenu from './../../components/NavMenu';  
import CastList from './../../components/Cast/CastList';  

const CastPage = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/people/') 
      .then((response) => {
        setCast(response.data); 
        setLoading(false);
      })
      .catch(() => {
        setError('Hubo un problema al cargar el elenco.');
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NavMenu />
      
      <Container className="my-5">
        <h1 className="mb-4">Elenco Disponible</h1>
        
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

        {!loading && !error && <CastList cast={cast} />}
      </Container>
    </>
  );
};

export default CastPage;
