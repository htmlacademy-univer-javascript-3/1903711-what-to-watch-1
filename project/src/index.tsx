import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { filmsList } from './mocks/films';
import { favoriteFilmMock } from './mocks/favourite-film-mock';
import { ReviewsMock } from './mocks/reviews-mock';
import { Provider } from 'react-redux';
import { store } from '../src/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const filmData = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  date: 2014,
  films: filmsList,
  favouriteList: favoriteFilmMock,
  reviews: ReviewsMock
};

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App
        title = { filmData.title }
        genre = { filmData.genre }
        date = { filmData.date }
        films = { filmData.films }
        favouriteList = { filmData.favouriteList }
        reviews = { filmData.reviews }
      />
    </Provider>
  </React.StrictMode>,
);
