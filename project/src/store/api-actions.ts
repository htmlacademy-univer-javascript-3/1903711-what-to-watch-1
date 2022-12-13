import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { SimilarFilm, TypeFilm } from '../types/film.js';
import { loadComments, loadFilm, loadFilms, loadSimilar, redirectToRoute, requireAuthorization, setAvatar, setDataLoadedStatus } from './action';
import { saveToken, dropToken } from '../services/token';
import { ApiRoute, AppRoute, AuthorizationStatus } from '../const';
import { AuthData, UserData } from '../types/data';
import { processErrorHandle } from '../services/process-error-handle';
import { Comments, UserComment } from '../types/comments.js';

export const fetchFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<TypeFilm[]>(ApiRoute.Films);
      dispatch(setDataLoadedStatus(true));
      dispatch(loadFilms(data));
      dispatch(setDataLoadedStatus(false));
    } catch {
      processErrorHandle('Не удалось получить список фильмов');
      throw new Error();
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(ApiRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token, avatarUrl}} = await api.post<UserData>(ApiRoute.Login, {email, password});
      saveToken(token);
      dispatch(setAvatar(avatarUrl));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch {
      processErrorHandle('Не выполнить вход');
      throw new Error();
    }
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
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setAvatar(null));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const fetchFilmByID = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilmById',
  async (filmId: string, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<TypeFilm>(`${ApiRoute.Films}/${filmId}`);
      dispatch(loadFilm(data));
    } catch {
      processErrorHandle('Не удалось загрузить фильм');
      throw new Error();
    }
  },
);

export const fetchCommentsByID = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCommentsById',
  async (filmId: string, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Comments>(`${ApiRoute.Comments}/${filmId}`);
      dispatch(loadComments(data));
    } catch {
      processErrorHandle('Не удалось загрузить комментарии к фильму');
      throw new Error();
    }
  },
);

export const fetchSimilarByID = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarById',
  async (filmId: string, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<SimilarFilm>(`${ApiRoute.Films}/${filmId}${ApiRoute.Similar}`);
      dispatch(loadSimilar(data));
    } catch {
      processErrorHandle('Не удалось загрузить похожие фильмы');
      throw new Error();
    }
  },
);

export const postComment = createAsyncThunk<void, UserComment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postCommentById',
  async ({comment, rating, filmId}, {dispatch, extra: api}) => {
    try {
      dispatch(setDataLoadedStatus(true));
      await api.post<UserComment>(`${ApiRoute.Comments}/${filmId}`, {comment, rating});
      dispatch(redirectToRoute(`${ApiRoute.Films}/${filmId}`));
      dispatch(setDataLoadedStatus(false));
    } catch {
      processErrorHandle('Не удалось отправить комментарий');
      throw new Error();
    }
  },
);
