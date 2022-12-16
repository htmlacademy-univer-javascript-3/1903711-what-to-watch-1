import { ALL_GENRES, AuthorizationStatus } from '../const';
import Film from '../types/film';
import { IDocumentFullscreen, IElementFullScreen } from '../types/full-screen-types';

export const getAllGenres = (films: Film[]) => (
  [...new Set([ALL_GENRES, ...films.map((film) => film.genre)])]
);


export interface CombinedElement extends HTMLElement, IElementFullScreen {}
export interface CombinedDocument extends Document, IDocumentFullscreen {}

export function requestFullScreen(element: CombinedElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
  else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

export function exitFullScreen() {
  const doc = document as CombinedDocument;
  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  }
  else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen();
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen();
  }
}

export function checkFullScreen(){
  const doc = document as CombinedDocument;
  return doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.webkitFullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement;
}

export const filterSimilar = (films: Film[], currentId: number | undefined) => {
  const result = films.filter((film) => (
    film.id !== currentId
  ));
  if (result.length > 4) {
    return result.slice(0, 4);
  }
  return result;
};

export const filterFilmsByGenre = (films: Film[], genre: string) => {
  if(genre === ALL_GENRES) {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};

export const convertTime = (timeInMinutes: number): string => {
  const hours = parseInt(String((timeInMinutes) / 60), 10);
  const minutes = timeInMinutes - hours * 60;

  const diffHours = `${hours.toString()}h`;
  const diffMinutes = `${minutes.toString().padStart(2,'0')}m`;

  if (hours === 0) {
    return diffMinutes;
  }

  return `${diffHours} ${diffMinutes}`;
};

export const convertRates = (rating: number): string => {
  if (rating >= 0 && rating < 3) {
    return 'Bad';
  }
  if (rating >= 3 && rating < 5) {
    return 'Normal';
  }
  if (rating >= 5 && rating < 8) {
    return 'Good';
  }
  if (rating >= 8 && rating < 10) {
    return 'Very good';
  }
  if (rating === 10) {
    return 'Awesome';
  }
  return 'None';
};

export const convertDate = (date: string, isShortForm: boolean): string => {
  const dateFormat = new Date(date);

  if (isShortForm) {
    return (
      `${dateFormat.getFullYear()}-
        ${dateFormat.getMonth().toString().padStart(2, '0')}-
        ${dateFormat.getDate().toString().padStart(2, '0')}`
    );
  }

  return (
    `${dateFormat.toLocaleString(
      'eng',
      { month: 'long' })} ${dateFormat.getDate()}, ${dateFormat.getFullYear()}`
  );
};

export const isCheckedAuth = (authorizationStatus: string): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;
