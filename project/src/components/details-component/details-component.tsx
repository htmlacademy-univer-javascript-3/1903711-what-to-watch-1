type AddDetailsProps = {
  director?: string;
  starring?: string[];
  genre?: string;
  released?: number;
  runTime?: number;
}

function convertTime(timeInMinutes: number): string {
  const hours = parseInt(String((timeInMinutes) / 60), 10);
  const minutes = timeInMinutes - hours * 60;
  const parseHours = `${hours.toString()}h`;
  const parseMinutes = `${minutes.toString().padStart(2,'0')}m`;

  if (hours === 0) { return parseMinutes; }
  return `${parseHours} ${parseMinutes}`;
}

function AddDetails({ director, starring, genre, released, runTime }: AddDetailsProps): JSX.Element {
  if (starring !== undefined && runTime !== undefined) {
    return (
      <div className="film-card__text film-card__row">
        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Director</strong>
            <span className="film-card__details-value">{ director }</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Starring</strong>
            <span className="film-card__details-value">
              {starring.map((star) => <>{ star }<br /></>)}
            </span>
          </p>
        </div>

        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Run Time</strong>
            <span className="film-card__details-value">{ convertTime(runTime) }</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Genre</strong>
            <span className="film-card__details-value">{ genre }</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Released</strong>
            <span className="film-card__details-value">{ released }</span>
          </p>
        </div>
      </div>
    );
  }

  return (<div />);
}

export default AddDetails;
