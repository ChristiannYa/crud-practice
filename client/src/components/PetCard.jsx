import PropTypes from 'prop-types';
import { formatDate } from '../utils/format-date';

const PetCard = ({
  id,
  img_url,
  pet_name,
  pet_breed,
  pet_age,
  pet_weight,
  last_vet_visit,
  onDeleteClick,
}) => {
  return (
    <div className="w-[350px] bg-neutral-800 p-4 rounded-lg relative">
      <button
        onClick={() => onDeleteClick(id)}
        className="cursor-pointer tp-1 bg-neutral-700 hover:bg-red-600 rounded-full px-2 absolute top-1 right-1 scale-75"
      >
        x
      </button>

      <div className="flex gap-x-4">
        <div className="w-[50px] h-[50px] mb-2 bg-slate-600">
          <img
            src={img_url}
            alt={pet_name}
            className="object-contain h-full rounded-md"
          />
        </div>
        <div className="w-full">
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Name:</h3>
            <p className="tp-1-light capitalize">{pet_name}</p>
          </div>
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Breed:</h3>
            <p className="tp-1-light capitalize">{pet_breed}</p>
          </div>
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Age:</h3>
            <p className="tp-1-light">{pet_age} years</p>
          </div>
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Weight:</h3>
            <p className="tp-1-light capitalize">{pet_weight}</p>
          </div>
          <div className="flex gap-x-1 badge">
            <h3 className="font-semibold tp-1">Last Vet Visit:</h3>
            <p className="tp-1-light capitalize">
              {formatDate(last_vet_visit)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

PetCard.propTypes = {
  id: PropTypes.number.isRequired,
  img_url: PropTypes.string,
  pet_name: PropTypes.string,
  pet_breed: PropTypes.string.isRequired,
  pet_age: PropTypes.number.isRequired,
  pet_weight: PropTypes.string,
  last_vet_visit: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default PetCard;
