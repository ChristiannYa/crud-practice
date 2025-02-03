import PropTypes from 'prop-types';

const PetCard = ({ img, name, breed, age, weight, lastVetVisit }) => {
  return (
    <div className="w-[320px] bg-neutral-800 p-4 rounded-lg">
      <div className="flex gap-x-4">
        <div className="w-[50px] h-[50px] mb-2 bg-slate-600">
          <img
            src={img}
            alt={name}
            className="object-contain h-full rounded-md"
          />
        </div>
        <div className="w-full">
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Name:</h3>
            <p className="tp-1-light capitalize">{name}</p>
          </div>
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Breed:</h3>
            <p className="tp-1-light capitalize">{breed}</p>
          </div>
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Age:</h3>
            <p className="tp-1-light">{age} years</p>
          </div>
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Weight:</h3>
            <p className="tp-1-light capitalize">{weight}</p>
          </div>
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Last Vet Visit:</h3>
            <p className="tp-1-light capitalize">{lastVetVisit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

PetCard.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  breed: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  weight: PropTypes.string,
  lastVetVisit: PropTypes.string.isRequired,
};

export default PetCard;
