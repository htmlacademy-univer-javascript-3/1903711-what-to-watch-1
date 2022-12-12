import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { TypeFilm } from '../types/film';

export const changeGenre = createAction<{ currentGenre: string }>('films/changeGenre');
export const getFilmsByGenre = createAction('main/getFilmsByGenre');
export const resetMainScreen = createAction('main/resetState');
export const loadFilms = createAction<TypeFilm[]>('data/loadFilms');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string | null>('game/setError');
export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');
