import PropTypes from 'prop-types';

export const petPropTypes = {
  category_name: PropTypes.string.isRequired,
  pet_name: PropTypes.string.isRequired,
  pet_breed: PropTypes.string.isRequired,
  pet_age: PropTypes.number.isRequired,
  pet_weight: PropTypes.string.isRequired,
  last_vet_visit: PropTypes.string.isRequired,
};
