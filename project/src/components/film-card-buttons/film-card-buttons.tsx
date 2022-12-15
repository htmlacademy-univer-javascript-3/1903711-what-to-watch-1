import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, favouriteClickType } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeFilmStatusToView, changePromoStatusToView } from '../../store/api-actions';
import { setFavouriteCount } from '../../store/main-data/main-data';
import Film from '../../types/film';
import { FilmStatus } from '../../types/film-status';

type FilmCardButtonsProps = {
    id: number,
    authStatus: string,
    film: Film | null,
    favouriteCount: number,
    favouriteType: string
}

function FilmCardButtons(FilmCardButtonsProps: FilmCardButtonsProps): JSX.Element {
  const {id, film, favouriteType, favouriteCount, authStatus} = FilmCardButtonsProps;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onAddFavouriteClick = () => {
    const filmStatus: FilmStatus = {
      filmId: film?.id || NaN,
      status: film?.isFavorite ? 0 : 1
    };

    if (favouriteType === favouriteClickType.Film) {
      dispatch(changeFilmStatusToView(filmStatus));
    } else {
      dispatch(changePromoStatusToView(filmStatus));
    }

    if (film?.isFavorite) {
      dispatch(setFavouriteCount(favouriteCount - 1));
    } else {
      dispatch(setFavouriteCount(favouriteCount + 1));
    }
  };

  return (
    <div className="film-card__buttons">
      <button
        className="btn btn--play film-card__button"
        type="button"
        onClick={ () => {
          navigate(`${AppRoute.Player}/${id}`);
        }}
      >
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
            onClick={ onAddFavouriteClick }
          >
            {
              film?.isFavorite ?
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#in-list"></use>
                </svg> :
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
            }
            <span>My list</span>
            <span className="film-card__count">{ favouriteCount }</span>
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
  );
}

export default FilmCardButtons;
