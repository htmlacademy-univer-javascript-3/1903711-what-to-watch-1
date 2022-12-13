import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import AddReviewComponent from '../../components/add-review-component/add-review-component';
import UserBlock from '../../components/user-block/user-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setDataLoadedStatus } from '../../store/action';
import { fetchFilmByID } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import { AppRoute } from '../../const';

function AddReview(): JSX.Element {
  const id = Number(useParams().id);

  const film = useAppSelector((state) => state.film);
  const loadStatus = useAppSelector((state) => state.isDataLoaded);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDataLoadedStatus(true));
    dispatch(fetchFilmByID(id.toString()));
    dispatch(setDataLoadedStatus(false));
  }, [id, dispatch]);


  if (loadStatus) {
    return(<LoadingScreen />);
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.backgroundImage} alt={film?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Film}/${id}`} className="breadcrumbs__link">{film?.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={`${AppRoute.Film}/${id}${AppRoute.AddReview}`}>
                  Add review
                </Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film?.posterImage} alt={film?.name} width="218" height="327" />
        </div>
      </div>

      <AddReviewComponent />

    </section>
  );
}

export default AddReview;
