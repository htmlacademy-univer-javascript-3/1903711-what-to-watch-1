import { useAppDispatch } from '../../hooks';
import { changeFilmTab } from '../../store/film-data/film-data';

type TabProps = {
  currentTab: string,
  tabType: string
}

function FilmTabItem ({currentTab, tabType}: TabProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <li className={`film-nav__item ${currentTab === tabType && 'film-nav__item--active'}`}>
      <a
        href="/"
        className="film-nav__link"
        onClick={
          (evt) => {
            evt.preventDefault();
            dispatch(changeFilmTab(tabType));
          }
        }
      >
        {tabType}
      </a>
    </li>
  );
}

export default FilmTabItem;
