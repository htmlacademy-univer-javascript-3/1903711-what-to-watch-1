import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFavouriteCount, getPromo} from '../../store/main-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import { FilmStatus } from '../../types/film-status';
import { changePromoStatusToView } from '../../store/api-actions';
import { setFavouriteCount } from '../../store/main-data/main-data';
import { AuthorizationStatus } from '../../const';

function PromoCard(): JSX.Element {
  const promo = useAppSelector(getPromo);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const favouriteCount = useAppSelector(getFavouriteCount);

  const dispatch = useAppDispatch();

  const onAddFavouriteClick = () => {
    const filmStatus: FilmStatus = {
      filmId: promo?.id || NaN,
      status: promo?.isFavorite ? 0 : 1
    };

    dispatch(changePromoStatusToView(filmStatus));

    if (promo?.isFavorite) {
      dispatch(setFavouriteCount(favouriteCount - 1));
    } else {
      dispatch(setFavouriteCount(favouriteCount + 1));
    }
  };

  if (!promo) {
    return <section className="film-card"></section>;
  }

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={promo.backgroundImage} alt={promo.name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <Logo isLightVersion={false}/>

        <UserBlock />
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={promo.posterImage} alt={promo.name} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{promo.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promo.genre}</span>
              <span className="film-card__year">{promo.released.toString()}</span>
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
                  onClick={onAddFavouriteClick}
                >
                  {
                    promo?.isFavorite ? <span>✓</span> :
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                  }
                  <span>My list</span>
                  <span className="film-card__count">{favouriteCount}</span>
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoCard;
