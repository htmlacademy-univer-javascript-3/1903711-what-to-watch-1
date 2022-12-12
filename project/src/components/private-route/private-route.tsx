import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  authorizationStatus: string;
  children: JSX.Element;
};

function PrivateRoute({ authorizationStatus, children }: PrivateRouteProps): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
