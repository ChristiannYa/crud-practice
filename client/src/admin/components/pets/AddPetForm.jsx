import { useEffect, useState } from 'react';

import { addPet } from '../../requests/pets';
import { getPetCategories } from '../../requests/pet-categories';
import { validatePetData } from './utils/validate-pet-data';
import { initialPetFields, inputFields } from './constants/initial-pet-fields';
import SuccessPopUp from './SuccessPopUp';
import ErrorPopUp from './ErrorPopUp';

const AddPetForm = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [error, setError] = useState(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [addedPet, setAddedPet] = useState(null);
  const [categories, setCategories] = useState([]);

  const [petData, setPetData] = useState(initialPetFields);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getPetCategories();

      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      validatePetData(petData);

      const newPet = await addPet(petData);
      setAddedPet(newPet);
      setShowSuccessPopup(true);

      setPetData(initialPetFields);
    } catch (error) {
      setError(error.message);
      setShowErrorPopup(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="screen400 bg-neutral-800 mt-2 p-2"
      >
        <select
          name="category_name"
          value={petData.category_name}
          onChange={handleChange}
          className="tp-1 capitalize my-1 mt-2"
        >
          <option value="" className="text-black">
            Select a category
          </option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.category_name}
              className="tp-1 capitalize bg-neutral-800"
            >
              {category.category_name}
            </option>
          ))}
        </select>

        <div className="flex flex-col gap-y-2">
          {inputFields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label htmlFor={`pet-${field.name}`} className="tp-1">
                {field.label}
              </label>
              <input
                id={`pet-${field.name}`}
                type={field.type}
                name={field.name}
                value={petData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="tp-1 bg-neutral-700 rounded-md px-2 py-1"
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="tp-1 mt-4 px-2 py-1 bg-neutral-700 rounded-md cursor-pointer"
        >
          add pet
        </button>
      </form>
      {showSuccessPopup && addedPet && (
        <SuccessPopUp
          pet={addedPet}
          onClose={() => setShowSuccessPopup(false)}
        />
      )}

      {showErrorPopup && error && (
        <ErrorPopUp error={error} onClose={() => setShowErrorPopup(false)} />
      )}
    </>
  );
};

export default AddPetForm;
