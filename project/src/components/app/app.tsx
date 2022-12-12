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
import { TypeFilm, FavouriteFilms } from '../../types/film';
import { Reviews } from '../../types/reviews';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useAppSelector } from '../../hooks';

type AppScreenProps = {
  title: string,
  genre: string,
  date: number,
  films: TypeFilm[],
  favouriteList: FavouriteFilms[],
  reviews: Reviews
}

const isCheckedAuth = (authorizationStatus: string): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function App({title, genre, date, films, favouriteList, reviews}: AppScreenProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isDataLoaded = useAppSelector((state) => state.isDataLoaded);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return ( <LoadingScreen /> );
  }

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
            />
          }
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />
        <Route path={AppRoute.Film}>
          <Route
            path={':id'}
            element={<Film films={ films } reviews={ reviews } /> }
          />
        </Route>
        <Route path={AppRoute.Player}>
          <Route
            path={':id'}
            element={<Player />}
          />
        </Route>
        <Route
          path={`:id${AppRoute.AddReview}`}
          element={
            <PrivateRoute authorizationStatus={ authorizationStatus }>
              <AddReview />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={ authorizationStatus }>
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
