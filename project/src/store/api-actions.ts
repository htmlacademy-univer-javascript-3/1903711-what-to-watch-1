import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { redirectToRoute } from './action';
import { dropToken } from '../services/token';
import Films from '../types/films';
import {ApiRoute, AppRoute, TIMEOUT_SHOW_ERROR} from '../const';
import {AuthData} from '../types/auth-data';
import { UserData } from '../types/user-data';
import { store } from './index';
import Similar from '../types/similar';
import Film from '../types/film';
import { Comments } from '../types/comments';
import { UserComment } from '../types/user-comment';
import Promo from '../types/promo';
import { setError } from './app-process/app-process';
import { FilmStatus } from '../types/film-status';
import Favorite from '../types/favorite';
import { dropAvatarURL } from '../services/avatar';

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(ApiRoute.Films);

    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Promo>(ApiRoute.Promo);

    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(ApiRoute.Login);
  },
);

export const loginAction = createAsyncThunk<{token: string, avatarUrl: string, userId: number}, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token, avatarUrl, id}} = await api.post<UserData>(ApiRoute.Login, {email, password});

    return {token: token, avatarUrl: avatarUrl, userId: id};
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dropAvatarURL();
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const fetchFilmByID = createAsyncThunk<Film | null, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilmById',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`${ApiRoute.Films}/${filmId}`);

    return data;
  },
);

export const fetchCommentsByID = createAsyncThunk<Comments, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCommentsById',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Comments>(`${ApiRoute.Comments}/${filmId}`);

    return data;
  },
);

export const fetchSimilarByID = createAsyncThunk<Similar, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarById',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Similar>(`${ApiRoute.Films}/${filmId}${ApiRoute.Similar}`);

    return data;
  },
);

export const postComment = createAsyncThunk<void, UserComment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postCommentById',
  async ({comment, rating, filmId}, {dispatch, extra: api}) => {
    await api.post<UserComment>(`${ApiRoute.Comments}/${filmId}`, {comment, rating});
    dispatch(redirectToRoute(`${ApiRoute.Films}/${filmId}`));
  },
);

export const changeFilmStatusToView = createAsyncThunk<Film, FilmStatus, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/changeFilmStatusToView',
  async ({filmId: id, status: isFavorite}, { dispatch, extra: api}) => {
    const {data} = await api.post<Film>(`${ApiRoute.Favorite}/${id}/${isFavorite}`);

    return data;
  },
);

export const changePromoStatusToView = createAsyncThunk<Film, FilmStatus, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/changePromoStatusToView',
  async ({filmId: id, status: isFavorite}, { dispatch, extra: api}) => {
    const {data} = await api.post<Film>(`${ApiRoute.Favorite}/${id}/${isFavorite}`);

    return data;
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk<Favorite, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteFilmsAction',
  async (_arg, { dispatch, extra: api}) => {
    const {data} = await api.get<Favorite>(ApiRoute.Favorite);

    return data;
  },
);
