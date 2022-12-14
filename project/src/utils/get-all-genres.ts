import {ALL_GENRES} from '../const';
import Film from '../types/film';

export const getAllGenres = (films: Film[]) => (
  [...new Set([ALL_GENRES, ...films.map((film) => film.genre)])]
);
