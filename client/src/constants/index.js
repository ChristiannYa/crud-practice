import { default as dogs } from '../assets/images/pets/dogs/index';
import { default as cats } from '../assets/images/pets/cats/index';
import { default as birds } from '../assets/images/pets/birds/index';

export const pets = [
  {
    dogs: [
      {
        id: 1,
        img: dogs.dog1,
        name: 'Winston',
        breed: 'Pug',
        age: 5,
        weight: '25 lbs',
        lastVetVisit: '2025-01-15',
        vaccinations: [
          {
            name: 'Rabies',
            dateAdministered: '2024-01-15'
          },
          {
            name: 'DHPP',
            dateAdministered: '2024-02-20'
          },
          {
            name: 'Bordetella',
            dateAdministered: '2024-03-10'
          },
          {
            name: 'Lyme Disease',
            dateAdministered: '2024-04-05'
          }
        ],
      },
    ],
    cats: [
      {
        id: 1,
        img: cats.cat1,
        name: 'Atlas',
        breed: 'Maine Coon',
        age: 4,
        weight: '15 lbs',
        lastVetVisit: '2025-02-01',
        vaccinations: [
          {
            name: 'FVRCP',
            dateAdministered: '2024-02-01'
          },
          {
            name: 'Rabies',
            dateAdministered: '2024-02-15'
          },
          {
            name: 'FeLV',
            dateAdministered: '2024-03-01'
          }
        ],
      },
    ],
    birds: [
      {
        id: 1,
        img: birds.bird1,
        name: 'Einstein',
        breed: 'African Grey Parrot',
        age: 2,
        weight: '400 grams',
        lastVetVisit: '2025-01-20',
        vaccinations: [
          {
            name: 'Polyomavirus',
            dateAdministered: '2024-01-20'
          },
          {
            name: "Pacheco's Disease",
            dateAdministered: '2024-02-05'
          },
          {
            name: 'Avian Pox',
            dateAdministered: '2024-03-15'
          }
        ],
      },
    ],
  },
];

