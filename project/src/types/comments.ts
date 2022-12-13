export type Comments = {
    comment: string
    date: string
    id: number
    rating: number
    user: {
      id: number
      name: string
}}[];

export type UserComment = {
    filmId: string,
    rating: number,
    comment: string
};
