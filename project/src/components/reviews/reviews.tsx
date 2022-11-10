import Review from '../review/review';
import { Reviews } from '../../types/reviews';

type reviewsProps = {
  reviews: Reviews;
}

function ReviewsComponent({ reviews }: reviewsProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        { reviews.map((review) => (<Review key={ review.id } rating={ review.rating } name={ review.user.name } date={ review.date } comment={ review.comment }/> ))}
      </div>
    </div>
  );
}

export default ReviewsComponent;
