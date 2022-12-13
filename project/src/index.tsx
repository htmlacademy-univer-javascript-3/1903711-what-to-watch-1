import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { favoriteFilmMock } from './mocks/favourite-film-mock';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction, fetchFilmAction } from './store/api-actions';

store.dispatch(fetchFilmAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const filmData = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  date: 2014,
  favouriteList: favoriteFilmMock,
};

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <ErrorMessage />
      <App
        title = { filmData.title }
        genre = { filmData.genre }
        date = { filmData.date }
        favouriteList = { filmData.favouriteList }
      />
    </Provider>
  </React.StrictMode>,
);
