import { ALL_GENRES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre, getFilmsByGenre } from '../../store/action';
import { MouseEvent, useState } from 'react';
import { TypeFilm } from '../../types/film';

export const getAllGenres = (films: TypeFilm[]) => (
  [...new Set([ALL_GENRES, ...films.map((film) => film.genre)])]
);

function GenresFilter(): JSX.Element {
  const [currentGenre, setCurrentGenre] = useState(ALL_GENRES);

  const dispatch = useAppDispatch();

  const films = useAppSelector((state) => state.shownFilms);
  const genres = getAllGenres(films);

  const handleChangeGenreClick = (evt: MouseEvent<HTMLAnchorElement>, genre: string) => {
    evt.preventDefault();
    dispatch(changeGenre({ currentGenre: genre }));
    dispatch(getFilmsByGenre());
    setCurrentGenre(genre);
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          className={`catalog__genres-item ${currentGenre === genre && 'catalog__genres-item--active'}`}
          key={genre}
        >
          <a href="/" className="catalog__genres-link" onClick={(evt) => handleChangeGenreClick(evt, genre)}>
            {genre}
          </a>
        </li>))}
    </ul>
  );
}

export default GenresFilter;
