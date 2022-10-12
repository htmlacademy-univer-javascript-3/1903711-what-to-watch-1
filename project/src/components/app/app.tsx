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

type AppScreenProps = {
  title: string,
  genre: string,
  date: number
}

function App({title, genre, date}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main title={title} genre={genre} date={date} />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />
        <Route
          path={AppRoute.Film}
          element={<Film />}
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
              <MyList />
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
