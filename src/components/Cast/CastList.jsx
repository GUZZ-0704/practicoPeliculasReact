import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ActorCard from './ActorCard'; 

const CastList = ({ cast }) => {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Reparto</h2>
      <Row>
        {cast.length > 0 ? (
          cast.map((actor) => (
            <Col key={actor.id} xs={12} sm={6} md={4} lg={2} className="mb-4">
              <ActorCard actor={actor} />
            </Col>
          ))
        ) : (
          <p>No hay actores disponibles.</p>
        )}
      </Row>
    </div>
  );
};

CastList.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
 })
  ).isRequired,
};

export default CastList;
