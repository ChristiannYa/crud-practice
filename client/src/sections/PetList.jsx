import { useState, useEffect } from 'react';

import PetCard from '../components/PetCard';
import ConfirmPetDeletePopup from '../admin/components/pets/ConfirmPetDeletePopup';
import AddPetForm from '../admin/components/pets/AddPetForm';
import AddPetCategory from '../admin/components/pet-categories/AddPetCategory';
import { deletePet, updatePet } from '../requests/pets';
import EditPetPopup from '../admin/components/pets/EditPetPopupForm';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [showAddPetCategoryForm, setShowAddPetCategoryForm] = useState(false);
  const [petToEdit, setPetToEdit] = useState(null);
  const [petToDelete, setPetToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pets');
        const petsData = await response.json();
        console.log('Fetched pets data:', petsData);
        setPets(petsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (pet) => {
    setPetToEdit(pet);
  };

  const handlePetUpdate = async (updatedPet) => {
    console.log('Data being sent:', updatedPet);
    try {
      const result = await updatePet(updatedPet.id, updatedPet);
      setPets(pets.map((pet) => (pet.id === result.id ? result : pet)));

      setPetToEdit(null);
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  const handleDeleteClick = (pet) => {
    setPetToDelete(pet);
  };

  const handleConfirmPetDelete = async () => {
    if (petToDelete) {
      await handlePetDelete(petToDelete.id);
      setPetToDelete(null);
    }
  };

  const handlePetDelete = async (id) => {
    try {
      await deletePet(id);
      setPets(pets.filter((pet) => pet.id !== id));
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  return (
    <div className="screen1200 w-full h-full py-2">
      <div className="flex gap-x-2">
        {/* add pet button */}
        <button
          className="text-lg text-white px-2 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-md cursor-pointer"
          onClick={() => setShowAddPetForm(!showAddPetForm)}
        >
          <p>{showAddPetForm ? 'close pet form' : 'add pet'}</p>
        </button>

        {/* add pet category */}
        <button
          className="text-lg text-white px-2 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-md cursor-pointer"
          onClick={() => setShowAddPetCategoryForm(!showAddPetCategoryForm)}
        >
          <p>{showAddPetCategoryForm ? 'close pet form' : 'add category'}</p>
        </button>
      </div>

      {/* pet form */}
      {showAddPetForm && <AddPetForm />}

      {/* pet category form */}
      {showAddPetCategoryForm && <AddPetCategory />}

      {/* pets */}
      {Object.entries(pets).map(([category, petsInCategory]) => {
        return (
          <div key={category} className="py-4">
            <h1 className="text-2xl text-amber-500 font-semibold capitalize mb-2">
              {category}
            </h1>
            <div className="flex flex-wrap gap-2">
              {petsInCategory.length > 0 ? (
                petsInCategory.map((pet) => (
                  <PetCard
                    key={pet.id}
                    {...pet}
                    onDeleteClick={() => handleDeleteClick(pet)}
                    onEditClick={() => handleEditClick(pet)}
                  />
                ))
              ) : (
                <p className="text-gray-500">No pets found in this category</p>
              )}
            </div>
          </div>
        );
      })}

      {petToEdit && (
        <EditPetPopup
          pet={petToEdit}
          onSave={handlePetUpdate}
          onCancel={() => setPetToEdit(null)}
        />
      )}

      {petToDelete && (
        <ConfirmPetDeletePopup
          pet={petToDelete}
          onConfirm={handleConfirmPetDelete}
          onCancel={() => setPetToDelete(null)}
        />
      )}
    </div>
  );
};

export default PetList;
