import PropTypes from 'prop-types';
import { petPropTypes } from '../../../types/pet-prop-types';

import PetDetailsPopup from './PetDetailsPopup';
import { handlePopupClose } from './utils/animations/handle-popup-close';
import BasePopup from '../BasePopup';

const ConfirmPetDeletePopup = ({ pet, onConfirm, onCancel }) => (
  <BasePopup title="Confirm Pet Deletion" titleColor="text-red-500">
    <PetDetailsPopup pet={pet} />
    <div className="mt-4 flex gap-2">
      <button
        onClick={() => handlePopupClose(onConfirm)}
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
  </BasePopup>
);

ConfirmPetDeletePopup.propTypes = {
  pet: PropTypes.shape(petPropTypes).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmPetDeletePopup;
