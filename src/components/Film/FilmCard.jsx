import  { useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; 

const FilmCard = ({ film }) => {
  const navigate = useNavigate(); 
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const goToDetail = () => {
    navigate(`/film/${film.id}`);
  };

  return (
    <>
      <Card className="mb-4" style={{ width: '18rem' }}>
        <div className="embed-responsive embed-responsive-16by9" onClick={handleShowModal} style={{ cursor: 'pointer' }}>
          <iframe
            className="embed-responsive-item"
            src={`https://www.youtube.com/embed/${film.trailer}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={film.name}
            style={{ pointerEvents: 'none' }}
          ></iframe>
        </div>
        <Card.Body onClick={goToDetail}>
          <Card.Title>{film.name}</Card.Title>
          <Card.Text>
            <strong>Lanzamiento:</strong> {new Date(film.release_date).toLocaleDateString()} <br />
            <strong>Score:</strong> {film.score}% <br />
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Modal para reproducir el tráiler en pantalla media */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{film.name} - Tráiler</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item trailer"
              src={`https://www.youtube.com/embed/${film.trailer}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={film.name}
            ></iframe>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    trailer: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};

export default FilmCard;
