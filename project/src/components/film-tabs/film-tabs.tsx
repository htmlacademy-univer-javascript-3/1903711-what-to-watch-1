import {FilmPageTabs} from '../../const';
import FilmTabItem from '../film-tab-item/film-tab-item';

type FilmTabsProps = {
  currentTab: string;
}

function FilmTabs ({currentTab}: FilmTabsProps): JSX.Element {
  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <FilmTabItem currentTab={currentTab} tabType={FilmPageTabs.Overview} />
        <FilmTabItem currentTab={currentTab} tabType={FilmPageTabs.Details} />
        <FilmTabItem currentTab={currentTab} tabType={FilmPageTabs.Reviews} />
      </ul>
    </nav>
  );
}

export default FilmTabs;
