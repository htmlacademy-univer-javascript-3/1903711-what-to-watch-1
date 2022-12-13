import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { resetMainScreen } from '../../store/action';

type FilmCardFavouriteType = {
    name: string,
    previewImage: string,
    id: number
  }

function FilmCardFavourite({ name, previewImage, id }: FilmCardFavouriteType): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={ previewImage } alt={ name } width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link"
          to={`${AppRoute.Film}/${id}`}
          onClick={() => {
            dispatch(resetMainScreen());
          }}
        >
          { name }
        </Link>
      </h3>
    </article>
  );
}

export default FilmCardFavourite;

