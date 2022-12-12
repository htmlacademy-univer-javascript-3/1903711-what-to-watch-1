import { Link } from 'react-router-dom';
import FilmCardFavourite from '../../components/favourite-film-card/favourite-film-card';
import Footer from '../../components/footer/footer';
import UserBlock from '../../components/user-block/user-block';
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
        <UserBlock />
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
