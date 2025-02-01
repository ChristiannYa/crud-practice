import { pets } from '../constants/index';
import PetCard from '../components/PetCard';

const PetList = () => {
  const petCategories = Object.keys(pets[0]);

  return (
    <div className="screen1200">
      {petCategories.map((category) => {
        const petsInCategory = pets[0][category];

        return (
          <div key={category} className="py-4">
            <h1 className="text-2xl text-amber-500 font-semibold capitalize mb-2">{category}</h1>
            <div className='flex'>
              {petsInCategory.map((pet) => (
                <PetCard
                  key={pet.id}
                  category={category}
                  img={pet.img}
                  name={pet.name}
                  breed={pet.breed}
                  age={pet.age}
                  weight={pet.weight}
                  lastVetVisit={pet.lastVetVisit}
                  vaccinations={pet.vaccinations}
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
