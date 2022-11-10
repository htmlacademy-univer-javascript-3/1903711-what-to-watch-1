import { FavouriteFilms } from '../types/film';

export const favoriteFilmMock: FavouriteFilms[] = [
  {
    id: 3,
    name: 'Macbeth',
    posterImage: 'img/Macbeth-poster.jpg',
    previewImage: 'img/macbeth.jpg',
    backgroundImage: 'img/macbeth-bg.jpg',
    backgroundColor: '#e5467b',
    videoLink: 'https://some-link',
    previewVideoLink: 'https://some-link',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima facilis enim aspernatur doloremque quos veritatis blanditiis deleniti explicabo ullam fuga animi, veniam aperiam illo dolor autem iste quaerat doloribus fugiat?',
    rating: 5.6,
    scoresCount: 34223,
    director: 'Joel Coen',
    starring: [
      'Denzel Washington', 'Frances McDormand', 'Bertie Carvel', 'Alex Hassell', 'Corey Hawkins'
    ],
    runTime: 105,
    genre: 'history',
    released: 2021,
    isFavorite: false,
  },
  {
    id: 5,
    name: 'Johnny English',
    posterImage: 'img/-poster.jpg',
    previewImage: 'img/johnny-english.jpg',
    backgroundImage: 'img/-bg.jpg',
    backgroundColor: '#D909C3',
    videoLink: 'https://some-link',
    previewVideoLink: 'https://some-link',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima facilis enim aspernatur doloremque quos veritatis blanditiis deleniti explicabo ullam fuga animi, veniam aperiam illo dolor autem iste quaerat doloribus fugiat?',
    rating: 3.4,
    scoresCount: 4567,
    director: 'Peter Howitt',
    starring: [
      'Rowan Atkinson', 'Natalie Imbruglia', 'Ben Miller', 'John Malkovich'
    ],
    runTime: 88,
    genre: 'Comedy',
    released: 2003,
    isFavorite: false,
  },
];
