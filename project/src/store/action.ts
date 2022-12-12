import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { TypeFilm } from '../types/film';

export const changeGenre = createAction<{ currentGenre: string }>('films/changeGenre');
export const getFilmsByGenre = createAction('main/getFilmsByGenre');
export const resetMainScreen = createAction('main/resetState');
export const loadFilms = createAction<TypeFilm[]>('data/loadFilms');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string | null>('game/setError');
export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');
export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
export const setAvatar = createAction<string | null>('user/avatar');
