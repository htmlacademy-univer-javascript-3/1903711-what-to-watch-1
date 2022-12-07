import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import FilmCard from '../film-card/film-card';
import Genre from '../genre/genre';

function FilmList( ): JSX.Element {
  const [userCard, setUserCard] = useState(NaN);
  const films = useAppSelector((state) => state.shownFilms);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <Genre />

      <div className="catalog__films-list">
        { films.map((film) => (
          <FilmCard
            key={ film.id }
            id={ film.id }
            name={ film.name }
            previewImage={ film.previewImage }
            activeCard={ film.id === userCard }
            previewVideo={ film.previewVideoLink }
            onMouseOver={ (pointedId: number) => {
              setUserCard(pointedId);
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
