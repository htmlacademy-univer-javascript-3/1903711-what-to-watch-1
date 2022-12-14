import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavouriteFilms, getLoadedDataStatus } from '../../store/main-data/selectors';
import { useEffect } from 'react';
import { fetchFavoriteFilmsAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import SimpleFilmCard from '../../components/simple-film-card/simple-film-card';
import Footer from '../../components/footer/footer';

function MyList(): JSX.Element {
  const favourite = useAppSelector(getFavouriteFilms);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getLoadedDataStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [authStatus, dispatch]);

  if (isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo isLightVersion={false} />

        <h1 className="page-title user-page__title">
          My list<span className="user-page__film-count">{favourite.length}</span>
        </h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {favourite.map((film) => <SimpleFilmCard key={film.id} id={film.id} title={film.name} image={film.previewImage}/>)}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MyList;
