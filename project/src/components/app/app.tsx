import {AppRoute, AuthorizationStatus } from '../../const';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import Film from '../../pages/film/film';
import Player from '../../pages/player/player';
import AddReview from '../../pages/add-review/add-review';
import MyList from '../../pages/my-list/my-list';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { TypeFilm, TypeGenres, FavouriteFilms } from '../../types/film';
import { Reviews } from '../../types/reviews';

type AppScreenProps = {
  title: string,
  genre: string,
  date: number,
  films: TypeFilm[],
  genres: TypeGenres[],
  favouriteList: FavouriteFilms[],
  reviews: Reviews
}

function App({title, genre, date, films, genres, favouriteList, reviews}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <Main
              title = { title }
              genre = { genre }
              date = { date }
              films = { films }
              genres = { genres }
            />
          }
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />
        <Route
          path={AppRoute.Film}
          element={<Film films={ films } reviews={ reviews } />}
        />
        <Route
          path={AppRoute.Player}
          element={<Player />}
        />
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <AddReview />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyList myList={ favouriteList } />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
