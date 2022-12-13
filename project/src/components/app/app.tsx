import {AppRoute, AuthorizationStatus } from '../../const';
import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import Film from '../../pages/film/film';
import Player from '../../pages/player/player';
import AddReview from '../../pages/add-review/add-review';
import MyList from '../../pages/my-list/my-list';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { FavouriteFilms } from '../../types/film';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useAppSelector } from '../../hooks';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-router/history-router';

type AppScreenProps = {
  title: string,
  genre: string,
  date: number,
  favouriteList: FavouriteFilms[],
}

const isCheckedAuth = (authorizationStatus: string): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function App({title, genre, date, favouriteList}: AppScreenProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isDataLoaded = useAppSelector((state) => state.isDataLoaded);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return ( <LoadingScreen /> );
  }

  return (
    <HistoryRouter history={ browserHistory }>
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
            element={<Film /> }
          />
        </Route>
        <Route path={AppRoute.Player}>
          <Route
            path={':id'}
            element={<Player />}
          />
        </Route>
        <Route path={AppRoute.Film}>
          <Route
            path={`:id${AppRoute.AddReview}`}
            element={
              <PrivateRoute authorizationStatus={ authorizationStatus }>
                <AddReview />
              </PrivateRoute>
            }
          />
        </Route>
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
    </HistoryRouter>
  );
}

export default App;
