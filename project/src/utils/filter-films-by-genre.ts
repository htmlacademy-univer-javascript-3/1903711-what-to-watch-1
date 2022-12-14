import {ALL_GENRES} from '../const';
import Film from '../types/film';

export const filterFilmsByGenre = (films: Film[], genre: string) => {
  if(genre === ALL_GENRES) {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};
