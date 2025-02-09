import PropTypes from 'prop-types';

const BasePopup = ({ title, titleColor, children }) => (
  <div className="popup-overlay">
    <div className="popup-content">
      <h2 className={`text-xl ${titleColor} font-bold mb-4`}>{title}</h2>
      {children}
    </div>
  </div>
);

BasePopup.propTypes = {
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default BasePopup;
