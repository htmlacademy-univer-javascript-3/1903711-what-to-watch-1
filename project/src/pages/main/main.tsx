import PromoCard from '../../components/promo-card/promo-card';
import FilmList from '../../components/film-list/film-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../const';
import { fetchFavouriteFilmsAction } from '../../store/api-actions';
import Footer from '../../components/footer/footer';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavouriteFilmsAction());
    }
  }, [authStatus, dispatch]);

  return (
    <>
      <PromoCard />

      <div className="page-content">
        <FilmList />
        <Footer />
      </div>
    </>
  );
}

export default Main;
