import { TypeFilm } from '../../types/film';
import { Reviews } from '../../types/reviews';
import AddDetails from '../details-component/details-component';
import FilmPageComponent from '../film-component/film-component';
import ReviewsComponent from '../reviews/reviews';


type TabsComponentProps = {
  film?: TypeFilm,
  reviews: Reviews,
  chooseTab: string,
  onUpdateTab: (tab: string) => void
}

function TabsComponent({ film, reviews, chooseTab, onUpdateTab }: TabsComponentProps): JSX.Element {
  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={ `film-nav__item ${ chooseTab === 'Overview' && 'film-nav__item--active' }` }>
            <a href="#todo" className="film-nav__link" onClick={ (evt) => { evt.preventDefault(); onUpdateTab('Overview'); } }>
              Overview
            </a>
          </li>
          <li className={ `film-nav__item ${ chooseTab === 'Details' && 'film-nav__item--active' }` }>
            <a href="#todo" className="film-nav__link" onClick={ (evt) => { evt.preventDefault(); onUpdateTab('Details'); } }>
              Details
            </a>
          </li>
          <li className={ `film-nav__item ${ chooseTab === 'Reviews' && 'film-nav__item--active' }` }>
            <a href="#todo" className="film-nav__link" onClick={ (evt) => { evt.preventDefault(); onUpdateTab('Reviews'); } }>
              Reviews
            </a>
          </li>
        </ul>
      </nav>

      { chooseTab === 'Overview' &&
        <FilmPageComponent
          rating={ film?.rating }
          description={ film?.description }
          scoresCount={ film?.scoresCount }
          director={ film?.director }
          starring={ film?.starring }
        /> }

      { chooseTab === 'Details' &&
        <AddDetails
          director={ film?.director }
          starring={ film?.starring }
          released={ film?.released }
          genre={ film?.genre }
          runTime={ film?.runTime }
        /> }

      { chooseTab === 'Reviews' &&
        <ReviewsComponent reviews={ reviews }/> }

    </div>
  );
}

export default TabsComponent;
