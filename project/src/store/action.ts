import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Comments } from '../types/comments';
import { SimilarFilm, TypeFilm } from '../types/film';

export const changeGenre = createAction<{ currentGenre: string }>('films/changeGenre');
export const getFilmsByGenre = createAction('main/getFilmsByGenre');
export const resetMainScreen = createAction('main/resetState');
export const loadFilms = createAction<TypeFilm[]>('data/loadFilms');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string | null>('game/setError');
export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');
export const redirectToRoute = createAction<string>('app/redirectToRoute');
export const setAvatar = createAction<string | null>('user/avatar');
export const loadFilm = createAction<TypeFilm>('data/loadFilmById');
export const loadComments = createAction<Comments>('data/loadCommentsById');
export const loadSimilar = createAction<SimilarFilm>('data/loadSimilarById');
export const changeFilmTab = createAction<string>('film/changeFilmTab');
