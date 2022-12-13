import { SimilarFilm } from '../../types/film';
import FilmCardFavourite from '../favourite-film-card/favourite-film-card';

type SimilarListProps = {
  similar: SimilarFilm;
}

function SimilarFilmComponent({similar}: SimilarListProps): JSX.Element {
  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      <div className="catalog__films-list">
        {similar.map((film) => <FilmCardFavourite key={film.id} id={film.id} name={film.name} previewImage={film.previewImage}/>)}
      </div>
    </section>
  );
}
export default SimilarFilmComponent;
