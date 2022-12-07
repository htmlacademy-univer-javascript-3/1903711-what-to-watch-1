import { createReducer } from '@reduxjs/toolkit';
import { filmsList } from '../mocks/films';
import { ALL_GENRES } from '../const';
import { changeGenre, resetMainScreen, getFilmsByGenre } from './action';
import { TypeFilm} from '../types/film';

export const sortFilmsByGenre = (films: TypeFilm[], genre: string) => {
  if(genre === ALL_GENRES) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};

const initialState = {
  films: filmsList,
  currentGenre: ALL_GENRES,
  shownFilms: filmsList,
  shownCount: filmsList.length < 8 ? filmsList.length : 8,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.currentGenre = action.payload.currentGenre;
    })
    .addCase(resetMainScreen, (state) => {
      state.currentGenre = ALL_GENRES;
      state.shownFilms = filmsList;
      state.shownCount = filmsList.length < 8 ? filmsList.length : 8;
    })
    .addCase(getFilmsByGenre, (state) => {
      state.shownFilms = sortFilmsByGenre(state.films, state.currentGenre);
    });
});
