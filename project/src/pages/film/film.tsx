import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import SimilarFilmComponent from '../../components/similar-film-component/similar-film-component';
import TabsComponent from '../../components/tabs-component/tabs-component';
import UserBlock from '../../components/user-block/user-block';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setDataLoadedStatus } from '../../store/action';
import { fetchCommentsByID, fetchFilmByID, fetchSimilarByID } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFound from '../not-found/not-found';

function Film(): JSX.Element {
  const [chooseTab, setChooseTab] = useState<string>('Overview');
  const navigate = useNavigate();
  const id = Number(useParams().id);
  const film = useAppSelector((state) => state.film);
  const comments = useAppSelector((state) => state.comments);
  const similar = useAppSelector((state) => state.similar);
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const loadStatus = useAppSelector((state) => state.isDataLoaded);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDataLoadedStatus(true));
    dispatch(fetchFilmByID(id.toString()));
    dispatch(fetchCommentsByID(id.toString()));
    dispatch(fetchSimilarByID(id.toString()));
    dispatch(setDataLoadedStatus(false));
  }, [id, dispatch]);

  if (loadStatus) {
    return(<LoadingScreen />);
  }

  if (!film) {
    return(<NotFound />);
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={ film?.backgroundImage } alt={ film?.name } />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{ film?.name }</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{ film?.genre }</span>
                <span className="film-card__year">{ film?.released }</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={ () => {navigate(`${AppRoute.Player}/${id}`);}}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                { authStatus === AuthorizationStatus.Auth &&
                  <Link to={`${AppRoute.Film}/${id}${AppRoute.AddReview}`} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={ film?.posterImage } alt={ film?.name } width="218" height="327" />
            </div>

            <TabsComponent
              film={ film }
              reviews={ comments }
              chooseTab={ chooseTab }
              onUpdateTab={ (tab: string) => { setChooseTab(tab);} }
            />
          </div>
        </div>
      </section>

      <div className="page-content">
        <SimilarFilmComponent similar={similar} />
        <Footer />
      </div>
    </>
  );
}

export default Film;
