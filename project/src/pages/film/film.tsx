import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilmCardButtons from '../../components/film-card-buttons/film-card-buttons';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import SimilarList from '../../components/similar-list/similar-list';
import TabsFilmDescription from '../../components/tabs-film-description/tabs-film-description';
import UserBlock from '../../components/user-block/user-block';
import { AuthorizationStatus, favouriteClickType, FilmPageTabs } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentsByID, fetchFavouriteFilmsAction, fetchFilmByID, fetchSimilarByID } from '../../store/api-actions';
import { changeFilmTab } from '../../store/film-data/film-data';
import { getFilm, getIsFilmFoundStatus, getIsFilmLoadingStatus, getSimilar } from '../../store/film-data/selectors';
import { getFavouriteCount } from '../../store/main-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFound from '../not-found/not-found';

function Film(): JSX.Element {
  const id = Number(useParams().id);
  const film = useAppSelector(getFilm);
  const similar = useAppSelector(getSimilar);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isFilmFoundStatus = useAppSelector(getIsFilmFoundStatus);
  const isFilmLoadingStatus = useAppSelector(getIsFilmLoadingStatus);
  const favouriteCount = useAppSelector(getFavouriteCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeFilmTab(FilmPageTabs.Overview));
    dispatch(fetchFilmByID(id.toString()));
    dispatch(fetchCommentsByID(id.toString()));
    dispatch(fetchSimilarByID(id.toString()));

    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavouriteFilmsAction());
    }

  }, [id, authStatus, dispatch]);

  if (isFilmLoadingStatus) {
    return <LoadingScreen />;
  }

  if (!isFilmFoundStatus) {
    return <NotFound />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo isLightVersion={false}/>
            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film?.genre}</span>
                <span className="film-card__year">{film?.released}</span>
              </p>

              <FilmCardButtons
                id={id}
                authStatus={authStatus}
                film={film}
                favouriteCount={favouriteCount}
                favouriteType={favouriteClickType.Film}
              />
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film?.posterImage} alt={film?.name} width="218" height="327" />
            </div>
            <TabsFilmDescription />
          </div>
        </div>
      </section>

      <div className="page-content">
        <SimilarList similar={similar} />
        <Footer />
      </div>
    </>
  );
}

export default Film;
