import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { resetMainScreen } from '../../store/main-data/main-data';
import PreviewPlayer from '../preview-player/preview-player';

type FilmCardProps = {
  id: number,
  title: string,
  image: string,
  previewVideo: string
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const {id, title, image, previewVideo} = props;

  const [isPointed, setIsPointed] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => setIsPointed(true)}
      onMouseLeave={() => setIsPointed(false)}
    >
      <Link
        className="small-film-card__link"
        to={`${AppRoute.Film}/${id}`}
        onClick={() => {
          dispatch(resetMainScreen());
        }}
      >
        <div className="small-film-card__image">
          {
            isPointed ? <PreviewPlayer image={image} previewVideo={previewVideo} />
              : <img src={image} alt={title} width="280" height="175"/>
          }
        </div>
        <h3 className="small-film-card__title">{title}</h3>
      </Link>
    </article>
  );
}

export default FilmCard;
