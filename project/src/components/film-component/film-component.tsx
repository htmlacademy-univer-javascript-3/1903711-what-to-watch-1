function ChooseRatingLevel(rating?: number): string {
  if (rating !== undefined) {
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
  }
  return '';
}

type FilmPageProps = {
    rating?: number,
    description?: string,
    scoresCount?: number,
    director?: string,
    starring?: string[]
}

function FilmPageComponent({ rating, description, scoresCount, director, starring }: FilmPageProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{ rating }</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ ChooseRatingLevel(rating) }</span>
          <span className="film-rating__count">{ scoresCount }</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{ description }</p>

        <p className="film-card__director"><strong>Director: { director }</strong></p>

        <p className="film-card__starring"><strong>Starring: { starring?.join(', ') } and other</strong></p>
      </div>
    </>
  );
}

export default FilmPageComponent;
