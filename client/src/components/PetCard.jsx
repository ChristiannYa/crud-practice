import PropTypes from 'prop-types';
import { petPropTypes } from '../types/pet-prop-types';

import { formatDate } from '../utils/format-date';
import PetDetailField from './PetDataField';

const PetCard = ({
  id,
  img_url,
  pet_name,
  pet_breed,
  pet_age,
  pet_weight,
  last_vet_visit,
  onDeleteClick,
  onEditClick,
}) => (
  <div className="w-[350px] bg-neutral-800 p-4 rounded-lg relative">
    <div className="absolute top-1 right-1 ">
      <button
        onClick={() => onDeleteClick(id)}
        className="cursor-pointer tp-1 bg-neutral-700 hover:bg-red-600 rounded-full px-2 scale-75"
      >
        x
      </button>
      <button
        onClick={() => onEditClick(id)}
        className="cursor-pointer tp-1 bg-neutral-700 hover:bg-amber-600 rounded-full px-2 scale-75"
      >
        ✎
      </button>
    </div>
    <div className="flex gap-x-4">
      <div className="bg-slate-700 rounded-md w-[52px] h-[52px]">
        <img
          src={img_url}
          alt={pet_name}
          className="object-contain h-full rounded-md"
        />
      </div>
      <div className="w-full">
        <PetDetailField label="Name" value={pet_name} />
        <PetDetailField label="Breed" value={pet_breed} />
        <PetDetailField label="Age" value={`${pet_age} years`} />
        <PetDetailField label="Weight" value={pet_weight} />
        <PetDetailField
          label="Last Vet Visit"
          value={formatDate(last_vet_visit)}
        />
      </div>
    </div>
  </div>
);

PetCard.propTypes = {
  id: PropTypes.number.isRequired,
  img_url: PropTypes.string,
  ...petPropTypes,
  onDeleteClick: PropTypes.func.isRequired,
};

export default PetCard;
