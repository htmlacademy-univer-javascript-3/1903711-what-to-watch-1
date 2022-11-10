import { ChangeEvent, useState } from 'react';
import StarComponent from '../star-component/star-component';

function AddReviewComponent(): JSX.Element {
  const [formData, setFormData] = useState({
    rating: 8,
    reviewText: '',
  });

  const fieldChangeHandle = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({...formData, reviewText: evt.target.value});
  };

  const changeRatingArea = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, rating: parseInt(evt.target.value, 10)});
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {
              [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((i) => (
                <StarComponent key={ String(i) } n={ i } changeRatingArea={ changeRatingArea } />
              ) )
            }
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            onChange={ fieldChangeHandle }
            value={ formData.reviewText }
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewComponent;
