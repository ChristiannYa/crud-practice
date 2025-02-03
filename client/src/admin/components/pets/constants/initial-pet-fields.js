export const initialPetFields = {
  category_name: '',
  pet_name: '',
  pet_breed: '',
  pet_age: '',
  pet_weight: '',
  last_vet_visit: '',
};

export const inputFields = [
  {
    label: 'Name',
    name: 'pet_name',
    type: 'text',
    placeholder: 'Enter pet name',
  },
  {
    label: 'Breed',
    name: 'pet_breed',
    type: 'text',
    placeholder: 'Enter pet breed',
  },
  {
    label: 'Age',
    name: 'pet_age',
    type: 'number',
    placeholder: 'Enter pet age',
  },
  {
    label: 'Weight',
    name: 'pet_weight',
    type: 'text',
    placeholder: 'Enter pet weight',
  },
  {
    label: 'Last Vet Visit',
    name: 'last_vet_visit',
    type: 'date',
    placeholder: 'Enter last vet visit date',
  },
];
