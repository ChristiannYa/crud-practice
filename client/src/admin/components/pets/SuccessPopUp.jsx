import PropTypes from 'prop-types';

import { handlePopupClose } from './utils/animations/handle-popup-close';
import { formatDate } from '../../../utils/format-date';

const SuccessPopUp = ({ pet, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="text-xl text-white font-bold mb-4">
          Pet Added Successfully!
        </h2>
        <div className="space-y-2">
          <p className="capitalize tp-1-light">
            <span className="tp-1">Category:</span> {pet.category_name}
          </p>
          <p className="capitalize tp-1-light">
            <span className="tp-1">Name:</span> {pet.pet_name}
          </p>
          <p className="capitalize tp-1-light">
            <span className="tp-1">Breed:</span> {pet.pet_breed}
          </p>
          <p className="capitalize tp-1-light">
            <span className="tp-1">Age:</span> {pet.pet_age} years
          </p>
          <p className="capitalize tp-1-light">
            <span className="tp-1">Weight:</span> {pet.pet_weight}
          </p>
          <p className="capitalize tp-1-light">
            <span className="tp-1">Last Vet Visit:</span>{' '}
            {formatDate(pet.last_vet_visit)}
          </p>
        </div>
        <button
          onClick={() => handlePopupClose(onClose)}
          className="mt-4 px-2 py-1 bg-neutral-700 rounded-md cursor-pointer text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

SuccessPopUp.propTypes = {
  pet: PropTypes.shape({
    category_name: PropTypes.string.isRequired,
    pet_name: PropTypes.string.isRequired,
    pet_breed: PropTypes.string.isRequired,
    pet_age: PropTypes.number.isRequired,
    pet_weight: PropTypes.string.isRequired,
    last_vet_visit: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessPopUp;
