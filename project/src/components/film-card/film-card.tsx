import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

type FilmCardType = {
  id: number,
  name: string;
  previewImage: string,
  onMouseOver: (evt: MouseEvent<HTMLDivElement>) => void,
  activeCard: boolean
}

function FilmCard({id, name, previewImage, onMouseOver, activeCard}: FilmCardType): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card" onMouseOver={ onMouseOver }>
      <div className="small-film-card__image">
        <img src={ previewImage } alt={ name } width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${ id }`}>{ name }</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
