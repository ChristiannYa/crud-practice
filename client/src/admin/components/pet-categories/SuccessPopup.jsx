import PropTypes from 'prop-types';
import BasePopup from '../BasePopup';
import { handlePopupClose } from '../pets/utils/animations/handle-popup-close';

const SuccessPopup = ({ category, onClose }) => (
  <BasePopup title="Category Added Successfully!" titleColor="text-white">
    <p className="text-white">Category Name: {category.category_name}</p>
    <button
      onClick={() => handlePopupClose(onClose)}
      className="mt-4 px-2 py-1 bg-neutral-700 rounded-md cursor-pointer text-white"
    >
      Close
    </button>
  </BasePopup>
);

SuccessPopup.propTypes = {
  category: PropTypes.shape({
    category_name: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessPopup;
