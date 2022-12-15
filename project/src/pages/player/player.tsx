import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlayerFullScreen from '../../components/player-full-screen/player-full-screen';
import PlayerPause from '../../components/player-pause/player-pause';
import PlayerPlay from '../../components/player-play/player-play';
import VideoPlayer from '../../components/video-player/video-player';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmByID } from '../../store/api-actions';
import { getFilm, getIsFilmFoundStatus, getIsFilmLoadingStatus } from '../../store/film-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFound from '../not-found/not-found';

function Player(): JSX.Element {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPlay, setIsPlay] = useState(true);

  dayjs.extend(duration);

  const film = useAppSelector(getFilm);

  const isFilmFoundStatus = useAppSelector(getIsFilmFoundStatus);
  const isFilmLoadingStatus = useAppSelector(getIsFilmLoadingStatus);

  const handleClickExitButton = () => {
    navigate(-1);
  };

  const handleClickPlayButton = () => {
    setIsPlay(true);
  };

  const handleClickPauseButton = () => {
    setIsPlay(false);
  };

  useEffect(() => {
    dispatch(fetchFilmByID(id.toString()));
  }, [id, dispatch]);

  if (isFilmLoadingStatus) {
    return <LoadingScreen />;
  }

  if (!isFilmFoundStatus) {
    return <NotFound />;
  }

  return (
    <div className="player">
      <VideoPlayer isMute={false} isPlay={isPlay} poster={film?.previewImage || ''} src={film?.videoLink || ''} />

      <button type="button" className="player__exit" onClick={ handleClickExitButton }>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="0" max="100"></progress>
            <div className="player__toggler" style={{left: '0%'}}>Toggler</div>
          </div>
          <div className="player__time-value">
            {
              dayjs
                .duration(film?.runTime || 0, 'minutes')
                .format(`${film?.runTime || 0 > 60 ? 'H[:]m[:]ss' : 'm'}`)
            }
          </div>
        </div>

        <div className="player__controls-row">
          {
            isPlay
              ? <PlayerPause onClick={ handleClickPauseButton }/>
              : <PlayerPlay onClick={ handleClickPlayButton }/>
          }
          <div className="player__name">Transpotting</div>

          <PlayerFullScreen />
        </div>
      </div>
    </div>
  );
}

export default Player;
