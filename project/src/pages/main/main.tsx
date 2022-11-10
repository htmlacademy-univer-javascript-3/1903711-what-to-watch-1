import Footer from '../../components/footer/footer';
import FilmList from '../../components/film-list/film-list';
import MainComponent from '../../components/main-component/main-component';
import { TypeFilm, TypeGenres } from '../../types/film';

type MainProps = {
    title: string,
    genre: string,
    date: number,
    films: TypeFilm[],
    genres: TypeGenres[]
}

function Main({title, genre, date, films, genres}: MainProps): JSX.Element {
  return (
    <>
      <MainComponent title={ title } genre={ genre } date={ date } />

      <div className="page-content">
        <FilmList films={ films } genres={ genres }/>
        <Footer />
      </div>
    </>
  );
}

export default Main;
