import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { postComment } from '../../store/api-actions';
import { UserComment } from '../../types/comments';
import StarComponent from '../star-component/star-component';

function AddReviewComponent(): JSX.Element {
  const id = Number(useParams().id);
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    rating: 8,
    reviewText: '',
  });

  const fieldChangeHandle = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({...formData, reviewText: evt.target.value});
    if (evt.target.value.length > 50 && evt.target.value.length < 400) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const changeRatingArea = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, rating: parseInt(evt.target.value, 10)});
    if (evt.target.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const onSubmit = (commentData: UserComment) => {
    dispatch(postComment(commentData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit({comment: formData.reviewText, rating: formData.rating, filmId: id.toString()});
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
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
            <button className="add-review__btn" type="submit" disabled={isDisabled}>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewComponent;
