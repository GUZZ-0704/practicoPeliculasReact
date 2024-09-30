import { Col } from 'react-bootstrap';
import FilmCard from './FilmCard';  
import PropTypes from 'prop-types';

const FilmList = ({ films }) => {
  return (
    <>
      {films.length > 0 ? (
        films.map((film) => (
          <Col key={film.id} xs={12} sm={6} md={4} lg={3} className="mb-4">  {/* Col para gestionar la distribución */}
            <FilmCard film={film} />
          </Col>
        ))
      ) : (
        <p>No hay películas disponibles.</p>
      )}
    </>
  );
};
FilmList.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // Add other film properties here if needed
    })
  ).isRequired,
};

export default FilmList;
