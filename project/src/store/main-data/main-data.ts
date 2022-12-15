import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_NUMBER, ALL_GENRES, NameSpace } from '../../const';
import { changePromoStatusToView, fetchFavouriteFilmsAction, fetchFilmsAction, fetchPromoAction } from '../api-actions';
import { filterFilmsByGenre } from '../../utils/filter-films-by-genre';
import { MainData } from '../../types/main-data';

const initialState: MainData = {
  films: [],
  promo: null,
  isDataLoaded: false,
  currentGenre: ALL_GENRES,
  filteredFilms: [],
  cardCount: 0,
  favoriteFilms: [],
  favoriteCount: 0
};

export const mainData = createSlice({
  name: NameSpace.MainScreen,
  initialState,
  reducers: {
    resetMainScreen: (state) => {
      state.currentGenre = ALL_GENRES;
      state.filteredFilms = state.films;
      state.cardCount = state.films.length < DEFAULT_NUMBER ? state.films.length : DEFAULT_NUMBER;
    },
    changeGenre: (state, action) => {
      const filteredFilms = filterFilmsByGenre(state.films, action.payload.currentGenre);

      state.currentGenre = action.payload.currentGenre;
      state.filteredFilms = filteredFilms;
      state.cardCount = filteredFilms.length < DEFAULT_NUMBER ?
        filteredFilms.length :
        DEFAULT_NUMBER;
    },
    increaseCardCount: (state) => {
      state.cardCount = (state.cardCount + DEFAULT_NUMBER) < state.filteredFilms.length ?
        state.cardCount + DEFAULT_NUMBER :
        state.filteredFilms.length;
    },
    resetCardCount: (state) => {
      state.cardCount = state.filteredFilms.length < DEFAULT_NUMBER ?
        state.filteredFilms.length :
        8;
    },
    setIsDataLoaded: (state, action) => {
      state.isDataLoaded = action.payload;
    },
    setFavouriteCount: (state, action) => {
      state.favoriteCount = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        const films = action.payload;

        state.films = films;
        state.filteredFilms = films;
        state.cardCount = films.length < DEFAULT_NUMBER ? films.length : 8;
        state.isDataLoaded = false;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      })

      .addCase(fetchFavouriteFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFavouriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.favoriteCount = action.payload.length;
        state.isDataLoaded = false;
      })
      .addCase(changePromoStatusToView.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  }
});

export const {
  resetMainScreen,
  changeGenre,
  increaseCardCount,
  setFavouriteCount
} = mainData.actions;
