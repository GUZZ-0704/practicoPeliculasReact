import { Card } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom'; // Para la navegación
import PropTypes from 'prop-types';
import './ActorCard.css';

const ActorCard = ({ actor }) => {
  const navigate = useNavigate(); 

  const goToDetail = () => {
    navigate(`/cast/${actor.id}`);
  };

  return (
    <Card 
      className="actor-card mb-4" 
      style={{ width: '10rem', cursor: 'pointer', position: 'relative' }} 
      onClick={goToDetail}
    >
      <Card.Img 
        variant="top" 
        src={`http://localhost:3000/people/${actor.id}.jpg`}
        alt={actor.name} 
        style={{ borderRadius: '10px' }}
      />
      <div className="overlay-gradient"></div>
      <Card.Body 
        className="text-white" 
        style={{
          position: 'absolute', 
          bottom: 0, 
          width: '100%', 
          background: 'transparent',
          borderRadius: '10px'
        }}
      >
        <Card.Title className="mb-0">{actor.name}</Card.Title>
      </Card.Body>
    </Card>
  );
};
ActorCard.propTypes = {
  actor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default ActorCard;
