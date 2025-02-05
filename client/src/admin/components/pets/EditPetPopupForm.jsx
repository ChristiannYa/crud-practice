import PropTypes from 'prop-types';
import { useState } from 'react';
import { editablePetFields } from './constants/initial-pet-fields';
import { petPropTypes } from '../../../types/pet-prop-types';
import { handlePopupClose } from './utils/animations/handle-popup-close';
import BasePopup from './BasePopup';

const EditPetPopup = ({ pet, onSave, onCancel }) => {
  const [editedPet, setEditedPet] = useState(pet);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPet((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const editableFields = {
      pet_name: editedPet.pet_name,
      pet_breed: editedPet.pet_breed,
      pet_age: editedPet.pet_age,
      pet_weight: editedPet.pet_weight,
      last_vet_visit: editedPet.last_vet_visit,
    };
    onSave({ id: editedPet.id, ...editableFields });
  };

  return (
    <BasePopup title="Edit Pet" titleColor="amber-500">
      <div className="space-y-2">
        {editablePetFields.map((field) => (
          <div key={field} className="flex flex-col">
            <label className="tp-1 capitalize">
              {field.replace(/_/g, ' ')}
            </label>
            <input
              name={field}
              type={field === 'last_vet_visit' ? 'date' : 'text'}
              value={
                field === 'last_vet_visit'
                  ? editedPet[field].split('T')[0]
                  : editedPet[field]
              }
              onChange={handleChange}
              className="tp-1 bg-neutral-700 rounded-md px-2 py-1"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleSubmit}
          className="px-2 py-1 bg-amber-600 hover:bg-amber-700 rounded-md cursor-pointer text-white"
        >
          Save
        </button>
        <button
          onClick={() => handlePopupClose(onCancel)}
          className="px-2 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-md cursor-pointer text-white"
        >
          Cancel
        </button>
      </div>
    </BasePopup>
  );
};

EditPetPopup.propTypes = {
  pet: PropTypes.shape(petPropTypes).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditPetPopup;
