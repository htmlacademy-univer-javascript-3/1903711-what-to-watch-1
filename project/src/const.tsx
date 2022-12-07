import { TypeGenres } from './types/film';

export enum AppRoute {
    Main = '/',
    SignIn = '/login',
    MyList = '/mylist',
    Film = '/films/:id',
    AddReview = '/films/:id/review',
    Player = '/player/:id'
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN'
}

export const GENRES_LIST: TypeGenres[] = [
  {
    titleGenre: 'Comedies',
    id: 1,
  },
  {
    titleGenre: 'Crime',
    id: 2,
  },
  {
    titleGenre: 'Documentary',
    id: 3.
  },
  {
    titleGenre: 'Dramas',
    id: 4,
  },
  {
    titleGenre: 'Horror',
    id: 5,
  },
  {
    titleGenre: 'Kids & Family',
    id: 6,
  },
  {
    titleGenre: 'Romance',
    id: 7
  },
  {
    titleGenre: 'Sci-Fi',
    id: 8
  },
  {
    titleGenre: 'Thrillers',
    id: 9
  },
];

export const ALL_GENRES = 'All genres';

export const NUMBER_OF_FILMS = 8;
