import PropTypes from 'prop-types';

const PetDetailField = ({ label, value }) => (
  <div className="flex gap-x-1 badge">
    <h3 className="font-semibold tp-1">{label}:</h3>
    <p className="tp-1-light capitalize">{value}</p>
  </div>
);

PetDetailField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default PetDetailField;
