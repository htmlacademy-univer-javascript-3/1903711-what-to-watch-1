type ReviewProps = {
    rating: number;
    name: string;
    date: string;
    comment: string;
  }

function Review({ rating, name, date, comment }: ReviewProps): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{ comment }</p>

        <footer className="review__details">
          <cite className="review__author">{ name }</cite>
          <time className="review__date" dateTime={ date }>{ date }</time>
        </footer>
      </blockquote>

      <div className="review__rating">{ rating }</div>
    </div>
  );
}

export default Review;
