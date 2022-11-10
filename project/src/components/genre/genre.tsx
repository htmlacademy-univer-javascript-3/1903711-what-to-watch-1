type Props = {
    nameGenre: string
}

function Genre({ nameGenre }: Props): JSX.Element {
  return (
    <li className="catalog__genres-item">
      <a href="#todo" className="catalog__genres-link">{ nameGenre }</a>
    </li>
  );
}

export default Genre;
