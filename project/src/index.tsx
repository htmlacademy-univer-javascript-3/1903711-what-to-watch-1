import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { filmsList } from './mocks/films';
import { GENRES_LIST } from './const';
import { favoriteFilmMock } from './mocks/favourite-film-mock';
import { ReviewsMock } from './mocks/reviews-mock';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const filmData = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  date: 2014,
  films: filmsList,
  genres: GENRES_LIST,
  favouriteList: favoriteFilmMock,
  reviews: ReviewsMock
};

root.render(
  <React.StrictMode>
    <App
      title = { filmData.title }
      genre = { filmData.genre }
      date = { filmData.date }
      films = { filmData.films }
      genres = { filmData.genres }
      favouriteList = { filmData.favouriteList }
      reviews = { filmData.reviews }
    />
  </React.StrictMode>,
);
