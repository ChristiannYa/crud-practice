import { useEffect, useState } from 'react';

import { addPet } from '../requests/pets';
import { getPetCategories } from '../requests/pet-categories';

const AddPetForm = () => {
  const [categories, setCategories] = useState([]);
  const [petData, setPetData] = useState({
    category_name: '',
    name: '',
    breed: '',
    age: '',
    weight: '',
    lastVetVisit: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getPetCategories();

      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPet = await addPet(petData);
      console.log('New pet added:', newPet);
    } catch (error) {
      console.error('Error adding pet:', error);
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
    <form onSubmit={handleSubmit} className="screen500">
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
            className="tp-1 capitalize bg-[#1c1c1c] border-none"
          >
            {category.category_name}
          </option>
        ))}
      </select>

      <div className="flex flex-col gap-y-2">
        <input
          type="text"
          name="name"
          placeholder="Pet Name"
          value={petData.name}
          onChange={handleChange}
          className="tp-1 pl-[4px]"
        />

        <input
          type="text"
          name="breed"
          placeholder="Pet Breed"
          value={petData.breed}
          onChange={handleChange}
          className="tp-1 pl-[4px]"
        />

        <input
          type="text"
          name="age"
          placeholder="Pet Age"
          value={petData.age}
          onChange={handleChange}
          className="tp-1 pl-[4px]"
        />

        <input
          type="text"
          name="weight"
          placeholder="Pet Weight"
          value={petData.weight}
          onChange={handleChange}
          className="tp-1 pl-[4px]"
        />

        <input
          type="text"
          name="lastVetVisit"
          placeholder="Last Vet Visit"
          value={petData.lastVetVisit}
          onChange={handleChange}
          className="tp-1 pl-[4px]"
        />
      </div>
      <button
        type="submit"
        className="tp-1 mt-2 px-2 py-1 bg-neutral-800 rounded-md"
      >
        Add Pet
      </button>
    </form>
  );
};

export default AddPetForm;
