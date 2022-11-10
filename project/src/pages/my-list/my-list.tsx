import { Link } from 'react-router-dom';
import FilmCardFavourite from '../../components/favourite-film-card/favourite-film-card';
import Footer from '../../components/footer/footer';
import { FavouriteFilms } from '../../types/film';

type MyListProps = {
  myList: FavouriteFilms[],
}

function MyList({ myList }: MyListProps): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <a href="#todo" className="user-block__link">Sign out</a>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          { myList.map((film) => <FilmCardFavourite key={ film.id } name={ film.name } previewImage={ film.previewImage }/>) }
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MyList;
