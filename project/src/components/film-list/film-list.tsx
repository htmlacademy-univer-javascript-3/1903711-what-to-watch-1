import { useState, MouseEvent } from 'react';
import { TypeFilm, TypeGenres } from '../../types/film';
import FilmCard from '../film-card/film-card';
import Genre from '../genre/genre';

type MovieListProps = {
  films: TypeFilm[],
  genres: TypeGenres[],
}

function FilmList({ films, genres }: MovieListProps): JSX.Element {
  const [userCard, setUserCard] = useState(NaN);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ul className="catalog__genres-list">
        <li className="catalog__genres-item catalog__genres-item--active">
          <a href="#todo"className="catalog__genres-link">All genres</a>
        </li>
        { genres.map((genre) => <Genre key={ genre.id } nameGenre={ genre.titleGenre }/>) }
      </ul>

      <div className="catalog__films-list">
        { films.map((film) => (
          <FilmCard
            key={ film.id }
            id={ film.id }
            name={ film.name }
            previewImage={ film.previewImage }
            activeCard={ film.id === userCard }
            onMouseOver={ (evt: MouseEvent<HTMLDivElement>) => {
              evt.preventDefault();
              setUserCard(film.id);
            }}
          />)
        ) }
      </div>

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
}

export default FilmList;
