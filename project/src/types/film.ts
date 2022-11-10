export type TypeFilm = {
    id: number;
    name: string;
    posterImage: string;
    previewImage: string;
    backgroundImage: string;
    backgroundColor: string;
    videoLink: string;
    previewVideoLink: string;
    description: string;
    rating: number;
    scoresCount: number;
    director: string;
    starring: string[];
    runTime: number;
    genre: string;
    released: number;
    isFavorite: boolean;
  };

export type TypeGenres = {
    titleGenre: string;
    id: number;
}

export type FavouriteFilms = {
    id: number;
    name: string;
    posterImage: string;
    previewImage: string;
    backgroundImage: string;
    backgroundColor: string;
    videoLink: string;
    previewVideoLink: string;
    description: string;
    rating: number;
    scoresCount: number;
    director: string;
    starring: string[];
    runTime: number;
    genre: string;
    released: number;
    isFavorite: boolean;
};
