import PropTypes from 'prop-types';
import { petPropTypes } from '../../../types/pet-prop-types';

import { formatDate } from '../../../utils/format-date';

const PetDetailsPopup = ({ pet }) => {
  const details = [
    { label: 'Category', value: pet.category_name },
    { label: 'Name', value: pet.pet_name },
    { label: 'Breed', value: pet.pet_breed },
    { label: 'Age', value: `${pet.pet_age} years` },
    { label: 'Weight', value: pet.pet_weight },
    { label: 'Last Vet Visit', value: formatDate(pet.last_vet_visit) },
  ];

  return (
    <div className="space-y-2">
      {details.map(({ label, value }) => (
        <p key={label} className="capitalize tp-1-light">
          <span className="tp-1">{label}:</span> {value}
        </p>
      ))}
    </div>
  );
};

PetDetailsPopup.propTypes = {
  pet: PropTypes.shape(petPropTypes).isRequired,
};

export default PetDetailsPopup;
