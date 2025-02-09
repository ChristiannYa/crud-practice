import PropTypes from 'prop-types';
import { handlePopupClose } from '../pets/utils/animations/handle-popup-close';
import BasePopup from '../BasePopup';

const CategoryErrorPopUp = ({ error, onClose }) => (
  <BasePopup title="Error Adding Category" titleColor="text-red-500">
    <p className="text-white">• {error}</p>
    <button
      onClick={() => handlePopupClose(onClose)}
      className="mt-4 px-2 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-md cursor-pointer text-white"
    >
      Close
    </button>
  </BasePopup>
);

CategoryErrorPopUp.propTypes = {
  error: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CategoryErrorPopUp;
