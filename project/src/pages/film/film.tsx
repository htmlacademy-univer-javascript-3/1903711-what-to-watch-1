import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import SimilarList from '../../components/similar-list/similar-list';
import TabsFilmDescription from '../../components/tabs-film-description/tabs-film-description';
import UserBlock from '../../components/user-block/user-block';
import { AppRoute, AuthorizationStatus, FilmPageTabs } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFilmStatusToView, fetchCommentsByID, fetchFavoriteFilmsAction, fetchFilmByID, fetchSimilarByID } from '../../store/api-actions';
import { changeFilmTab } from '../../store/film-data/film-data';
import { getFilm, getIsFilmFoundStatus, getIsFilmLoadingStatus, getSimilar } from '../../store/film-data/selectors';
import { setFavouriteCount } from '../../store/main-data/main-data';
import { getFavouriteCount } from '../../store/main-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { FilmStatus } from '../../types/film-status';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFound from '../not-found/not-found';

function Film(): JSX.Element {
  const id = Number(useParams().id);
  const film = useAppSelector(getFilm);
  const similar = useAppSelector(getSimilar);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isFilmFoundStatus = useAppSelector(getIsFilmFoundStatus);
  const isFilmLoadingStatus = useAppSelector(getIsFilmLoadingStatus);
  const favoriteCount = useAppSelector(getFavouriteCount);

  const dispatch = useAppDispatch();

  const onAddFavoriteClick = () => {
    const filmStatus: FilmStatus = {
      filmId: film?.id || NaN,
      status: film?.isFavorite ? 0 : 1
    };

    dispatch(changeFilmStatusToView(filmStatus));

    if (film?.isFavorite) {
      dispatch(setFavouriteCount(favoriteCount - 1));
    } else {
      dispatch(setFavouriteCount(favoriteCount + 1));
    }
  };

  useEffect(() => {
    dispatch(changeFilmTab(FilmPageTabs.Overview));
    dispatch(fetchFilmByID(id.toString()));
    dispatch(fetchCommentsByID(id.toString()));
    dispatch(fetchSimilarByID(id.toString()));

    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
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

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {
                  authStatus === AuthorizationStatus.Auth &&
                  <button
                    className="btn btn--list film-card__button"
                    type="button"
                    onClick={onAddFavoriteClick}
                  >
                    {
                      film?.isFavorite ? <span>✓</span> :
                        <svg viewBox="0 0 19 20" width="19" height="20">
                          <use xlinkHref="#add"></use>
                        </svg>
                    }
                    <span>My list</span>
                    <span className="film-card__count">{favoriteCount}</span>
                  </button>
                }
                {
                  authStatus === AuthorizationStatus.Auth &&
                  <Link
                    to={`${AppRoute.Film}/${id}${AppRoute.AddReview}`}
                    className="btn film-card__button"
                  >
                    Add review
                  </Link>
                }
              </div>
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

        <footer className="page-footer">
          <Logo isLightVersion />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Film;
