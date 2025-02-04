import { useState, useEffect } from 'react';
import PetCard from '../components/PetCard';
import ConfirmPetDeletePopup from '../admin/components/pets/ConfirmPetDeletePopup';
import AddPetForm from '../admin/components/pets/AddPetForm';
import { deletePet } from '../requests/pets';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pets');
        const data = await response.json();

        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

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

  // Group pets by category
  const groupedPets = pets.reduce((accumulator, pet) => {
    const category = pet.category_name;

    if (!accumulator[category]) {
      accumulator[category] = [];
    }

    accumulator[category].push(pet);

    return accumulator;
  }, {});

  return (
    <div className="screen1200 w-full h-full py-2">
      {/* add pet button */}
      <button
        className="text-lg text-white px-2 py-1 bg-neutral-700 rounded-md cursor-pointer"
        onClick={() => setShowAddPetForm(!showAddPetForm)}
      >
        <p>{showAddPetForm ? 'close form' : 'add pet'}</p>
      </button>

      {/* pet form */}
      {showAddPetForm && <AddPetForm />}

      {/* pets */}
      {Object.entries(groupedPets).map(([category, petsInCategory]) => {
        return (
          <div key={category} className="py-4">
            <h1 className="text-2xl text-amber-500 font-semibold capitalize mb-2">
              {category}
            </h1>
            <div className="flex flex-wrap gap-2">
              {petsInCategory.map((pet) => (
                <PetCard
                  key={pet.id}
                  {...pet}
                  onDeleteClick={() => handleDeleteClick(pet)}
                />
              ))}
            </div>
          </div>
        );
      })}

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
