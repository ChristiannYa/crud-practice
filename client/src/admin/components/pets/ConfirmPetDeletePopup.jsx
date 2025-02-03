import PropTypes from 'prop-types';

import { formatDate } from '../../../utils/format-date';
import { handlePopupClose } from './utils/animations/handle-popup-close';

const ConfirmPetDeletePopup = ({ pet, onConfirm, onCancel }) => {
  const handleConfirmPetDelete = () => {
    handlePopupClose(onConfirm);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="text-xl text-red-500 font-bold mb-4">
          Confirm Pet Deletion
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
          <p className="tp-1-light">
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
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleConfirmPetDelete}
            className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded-md cursor-pointer text-white"
          >
            Delete
          </button>
          <button
            onClick={() => handlePopupClose(onCancel)}
            className="px-2 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-md cursor-pointer text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmPetDeletePopup.propTypes = {
  pet: PropTypes.shape({
    category_name: PropTypes.string.isRequired,
    pet_name: PropTypes.string.isRequired,
    pet_breed: PropTypes.string.isRequired,
    pet_age: PropTypes.number.isRequired,
    pet_weight: PropTypes.string.isRequired,
    last_vet_visit: PropTypes.string.isRequired,
  }).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmPetDeletePopup;
