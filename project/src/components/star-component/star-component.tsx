import { ChangeEvent } from 'react';

type StarProps = {
  n: number;
  changeRatingArea: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function StarComponent({ n, changeRatingArea }: StarProps): JSX.Element {
  return (
    <>
      <input className="rating__input" id={ `star-${ n }` } type="radio" name="rating" value={ n }
        onChange={ changeRatingArea }
      />
      <label className="rating__label" htmlFor={ `star-${ n }` }>Rating { n }</label>
    </>
  );
}

export default StarComponent;
