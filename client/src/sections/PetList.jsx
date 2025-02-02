import { useState, useEffect } from 'react';
import PetCard from '../components/PetCard';

const PetList = () => {
  const [pets, setPets] = useState([]);

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
    <div className="screen1200">
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
                  img={pet.img_url}
                  name={pet.pet_name}
                  breed={pet.pet_breed}
                  age={pet.pet_age}
                  weight={pet.pet_weight}
                  lastVetVisit={pet.last_vet_visit}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PetList;
