import { Reviews } from '../types/reviews';

export const ReviewsMock:Reviews = [
  {
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the directors funniest and most exquisitely designed films in years.',
    date: 'December 24, 2016',
    id: 1,
    rating: 8.9,
    user: {
      id: 2,
      name: 'Kate Muir'
    }
  },
  {
    comment: 'Andersons films are too precious for some, but for those of us willing to lose ourselves in them, theyre a delight. The Grand Budapest Hotel is no different, except that he has added a hint of gravitas to the mix, improving the recipe.',
    date: 'November 18, 2015',
    id: 3,
    rating: 8.0,
    user: {
      id: 4,
      name: 'Bill Goodykoontz',
    }
  },
  {
    comment: 'I didnt find it amusing, and while I can appreciate the creativity, its an hour and 40 minutes I wish I could take back.',
    date: 'November 18, 2015',
    id: 5,
    rating: 8.0,
    user: {
      id: 6,
      name: 'Amanda Greever',
    }
  },
  {
    comment: 'The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.',
    date: 'December 20, 2016',
    id: 7,
    rating: 7.2,
    user: {
      id: 8,
      name: 'Matthew Lickona',
    }
  },
];
