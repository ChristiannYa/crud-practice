import PropTypes from 'prop-types';

import { handlePopupClose } from './utils/animations/handle-popup-close';
import BasePopup from './BasePopup';

const ErrorPopUp = ({ error, onClose }) => (
  <BasePopup title="Error Adding Pet" titleColor="red-500">
    <p className="text-white">• {error}</p>
    <button
      onClick={() => handlePopupClose(onClose)}
      className="mt-4 px-2 py-1 bg-neutral-700 rounded-md cursor-pointer text-white"
    >
      Close
    </button>
  </BasePopup>
);

ErrorPopUp.propTypes = {
  error: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorPopUp;
