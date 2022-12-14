import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import Film from '../../pages/film/film';
import Player from '../../pages/player/player';
import AddReview from '../../pages/add-review/add-review';
import MyList from '../../pages/my-list/my-list';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useAppSelector } from '../../hooks';
import { isCheckedAuth } from '../../utils/check-auth';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (isCheckedAuth(authorizationStatus)) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={ browserHistory }>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={ authorizationStatus }>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Player}>
          <Route
            path={':id'}
            element={<Player />}
          />
        </Route>
        <Route path={AppRoute.Film}>
          <Route
            path={':id'}
            element={<Film />}
          >
          </Route>
          <Route
            path={`:id${AppRoute.AddReview}`}
            element={
              <PrivateRoute authorizationStatus={ authorizationStatus }>
                <AddReview />
              </PrivateRoute>
            }
          >
          </Route>
        </Route>
        <Route
          path={'*'}
          element={<NotFound />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
