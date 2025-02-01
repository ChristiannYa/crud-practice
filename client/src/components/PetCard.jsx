import PropTypes from 'prop-types';

const PetCard = ({
  img,
  name,
  breed,
  age,
  weight,
  lastVetVisit,
  vaccinations,
}) => {
  return (
    <div className="w-[400px] bg-neutral-800 p-4 rounded-xl">
      <div className='flex gap-x-4'>
        <div className="w-[150px] h-full mb-2">
          <img
            src={img}
            alt={breed}
            className="object-contain h-full rounded-md"
          />
        </div>
        <div className='w-full'>
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Name:</h3>
            <p className="tp-1-light">{name}</p>
          </div>
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Breed:</h3>
            <p className="tp-1-light">{breed}</p>
          </div>
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Age:</h3>
            <p className="tp-1-light">{age} Years</p>
          </div>
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Weight:</h3>
            <p className="tp-1-light">{weight}</p>
          </div>
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Last Vet Visit:</h3>
            <p className="tp-1-light">{lastVetVisit}</p>
          </div>
        </div>
      </div>
      <div className="mt-[6px]">
        <h3 className="font-semibold tp-1">Vaccinations:</h3>
        <ul className="flex flex-col gap-y-2">
          {vaccinations.map((vaccination, index) => (
            <li key={index} className="tp-1-light bg-[#2c2c2c] px-2 py-1">
              <div>
                <p>&#8226; {vaccination.name}</p>
                <div>
                  <p>Date administered:</p>
                  <p>{vaccination.dateAdministered}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
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
  vaccinations: PropTypes.array.isRequired,
};

export default PetCard;
