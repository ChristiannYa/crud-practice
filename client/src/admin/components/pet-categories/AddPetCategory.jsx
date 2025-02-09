import { useState } from 'react';

import { addPetCategory } from '../../../requests/pet-categories';
import { validatePetCategoryData } from './utils/validate-pet-category-data';
import SuccessPopUp from '../pet-categories/SuccessPopup';
import ErrorPopUp from '../pet-categories/ErrorPopup';

const AddPetCategory = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [addedPetCategory, setAddedPetCategory] = useState(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [error, setError] = useState(null);

  const [petCategoryData, setPetCategoryData] = useState({
    category_name: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      validatePetCategoryData(petCategoryData);

      const newPetCategory = await addPetCategory(petCategoryData);
      setAddedPetCategory(newPetCategory);
      setShowSuccessPopup(true);
    } catch (error) {
      setError(error.message);
      setShowErrorPopup(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="screen400 bg-neutral-800 rounded-md mt-2 p-2"
      >
        <div className="flex flex-col">
          <label htmlFor="category_name" className="tp-1">
            Pet Category
          </label>

          <input
            id="category_name"
            name="category_name"
            type="text"
            value={petCategoryData.category_name}
            onChange={handleChange}
            placeholder="Enter pet category"
            className="tp-1 bg-neutral-700 rounded-md px-2 py-1"
          />
        </div>

        <button
          type="submit"
          className="tp-1 mt-4 px-2 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-md cursor-pointer"
        >
          add pet category
        </button>
      </form>
      {showSuccessPopup && addedPetCategory && (
        <SuccessPopUp
          category={addedPetCategory}
          onClose={() => setShowSuccessPopup(false)}
        />
      )}

      {showErrorPopup && error && (
        <ErrorPopUp error={error} onClose={() => setShowErrorPopup(false)} />
      )}
    </>
  );
};

export default AddPetCategory;
