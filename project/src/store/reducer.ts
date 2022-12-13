import { createReducer } from '@reduxjs/toolkit';
import { ALL_GENRES, AuthorizationStatus, NUMBER_OF_FILMS } from '../const';
import { changeGenre, resetMainScreen, loadFilms, requireAuthorization, getFilmsByGenre, setError, setDataLoadedStatus, setAvatar, loadSimilar, loadComments, loadFilm, changeFilmTab } from './action';
import { SimilarFilm, TypeFilm } from '../types/film';
import { Comments } from '../types/comments';

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
  isDataLoaded: boolean,
  avatar: string | null
  comments: Comments,
  similar: SimilarFilm,
  film: TypeFilm | null,
  filmPageTab: string
}

const initialState: InitialState = {
  filmsList: [],
  currentGenre: ALL_GENRES,
  shownFilms: [],
  shownCount: 0,
  authorizationStatus:  AuthorizationStatus.Unknown,
  error: null,
  isDataLoaded: false,
  avatar: null,
  comments: [],
  similar: [],
  film: null,
  filmPageTab: 'Overview'
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const shownFilms = sortFilmsByGenre(state.filmsList, action.payload.currentGenre);

      state.currentGenre = action.payload.currentGenre;
      state.shownFilms = shownFilms;
      state.shownCount = shownFilms.length < NUMBER_OF_FILMS ? shownFilms.length : NUMBER_OF_FILMS;
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
    .addCase(changeFilmTab, (state, action) => {
      state.filmPageTab = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setAvatar, (state, action) => {
      state.avatar = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(loadFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadSimilar, (state, action) => {
      state.similar = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
