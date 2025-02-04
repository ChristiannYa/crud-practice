import PropTypes from 'prop-types';
import { petPropTypes } from '../../../types/pet-prop-types';

import BasePopup from './BasePopup';
import PetDetailsPopup from './PetDetailsPopup';
import { handlePopupClose } from './utils/animations/handle-popup-close';

const SuccessPopUp = ({ pet, onClose }) => (
  <BasePopup title="Pet Added Successfully!" titleColor="white">
    <PetDetailsPopup pet={pet} />
    <button
      onClick={() => handlePopupClose(onClose)}
      className="mt-4 px-2 py-1 bg-neutral-700 rounded-md cursor-pointer text-white"
    >
      Close
    </button>
  </BasePopup>
);

SuccessPopUp.propTypes = {
  pet: PropTypes.shape(petPropTypes).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessPopUp;
