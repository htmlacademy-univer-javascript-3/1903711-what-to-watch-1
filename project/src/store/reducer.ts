import { createReducer } from '@reduxjs/toolkit';
import { ALL_GENRES, AuthorizationStatus, NUMBER_OF_FILMS } from '../const';
import { changeGenre, resetMainScreen, loadFilms, requireAuthorization, getFilmsByGenre, setError, setDataLoadedStatus } from './action';
import { TypeFilm } from '../types/film';

export const sortFilmsByGenre = (films: TypeFilm[], genre: string) => {
  if(genre === ALL_GENRES) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};

type InitialState = {
  currentGenre: string,
  filmsList: TypeFilm[];
  shownCount: number,
  shownFilms: TypeFilm[],
  authorizationStatus: string,
  error: string | null,
  isDataLoaded: boolean
}

const initialState: InitialState = {
  filmsList: [],
  currentGenre: ALL_GENRES,
  shownFilms: [],
  shownCount: 0,
  authorizationStatus:  AuthorizationStatus.Unknown,
  error: null,
  isDataLoaded: false
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const shownFilms = sortFilmsByGenre(state.filmsList, action.payload.currentGenre);

      state.currentGenre = action.payload.currentGenre;
      state.shownFilms = shownFilms;
      state.shownCount = shownFilms.length < NUMBER_OF_FILMS ? shownFilms.length : 8;
    })
    .addCase(resetMainScreen, (state) => {
      state.currentGenre = ALL_GENRES;
      state.shownFilms = state.filmsList;
      state.shownCount = state.filmsList.length < NUMBER_OF_FILMS ? state.filmsList.length : NUMBER_OF_FILMS;
    })
    .addCase(getFilmsByGenre, (state) => {
      state.shownFilms = sortFilmsByGenre(state.filmsList, state.currentGenre);
    })
    .addCase(loadFilms, (state, action) => {
      state.filmsList = action.payload;
      state.shownFilms = action.payload;
      state.shownCount = NUMBER_OF_FILMS;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
