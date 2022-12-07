import { useState } from 'react';
import { NUMBER_OF_FILMS } from '../../const';
import { useAppSelector } from '../../hooks';
import FilmCard from '../film-card/film-card';
import Genre from '../genre/genre';
import ShowMoreComponent from '../show-more-component/show-more-component';

function FilmList( ): JSX.Element {
  const [userCard, setUserCard] = useState(NaN);
  const films = useAppSelector((state) => state.shownFilms);
  const [numberOfFilms, onSetNumberOfFilms] = useState(NUMBER_OF_FILMS);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <Genre onSetNumberOfFilms={ onSetNumberOfFilms }/>

      <div className="catalog__films-list">
        { films.slice(0, numberOfFilms).map((film) => (
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

      {
        films.length > numberOfFilms && <ShowMoreComponent onSetNumberOfFilms={ onSetNumberOfFilms } />
      }
    </section>
  );
}

export default FilmList;
