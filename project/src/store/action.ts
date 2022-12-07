import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction<{ currentGenre: string }>('films/changeGenre');
export const getFilmsByGenre = createAction('main/getFilmsByGenre');
export const resetMainScreen = createAction('main/resetState');
