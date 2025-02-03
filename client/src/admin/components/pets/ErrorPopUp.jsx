import PropTypes from 'prop-types';

import { handlePopupClose } from './utils/animations/handle-popup-close';

const ErrorPopUp = ({ error, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="text-xl text-red-500 font-bold mb-4">
          Error Adding Pet
        </h2>
        <p className="text-white">• {error}</p>
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

ErrorPopUp.propTypes = {
  error: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorPopUp;
