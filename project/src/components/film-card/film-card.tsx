import { Link } from 'react-router-dom';
import VideoPlayerComponent from '../video-player-component/video-player-component';

type FilmCardType = {
  id: number,
  name: string;
  previewImage: string,
  previewVideo: string,
  onMouseOver: (id: number) => void,
  activeCard: boolean
}

function FilmCard({id, name, previewImage, activeCard, previewVideo, onMouseOver}: FilmCardType): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={() => onMouseOver(id)} onMouseLeave={() => onMouseOver(NaN)} >
      <div className="small-film-card__image">
        { activeCard ? <VideoPlayerComponent previewVideo={ previewVideo } srcImage={ previewImage } /> : <img src={ previewImage } alt={ name } width="280" height="175" /> }
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${ id }`}>{ name }</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
