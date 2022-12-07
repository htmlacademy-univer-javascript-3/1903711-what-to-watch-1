import Footer from '../../components/footer/footer';
import FilmList from '../../components/film-list/film-list';
import MainComponent from '../../components/main-component/main-component';

type MainProps = {
    title: string,
    genre: string,
    date: number,
}

function Main({title, genre, date}: MainProps): JSX.Element {
  return (
    <>
      <MainComponent title={ title } genre={ genre } date={ date } />

      <div className="page-content">
        <FilmList />
        <Footer />
      </div>
    </>
  );
}

export default Main;
