import { useState } from 'react';
import Player from '../components/Player';
import Header from '../components/Header';
import GlobalContext from '../contexts/PlayerContext';

import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import Podcast from '../types/podcast';

function MyApp({ Component, pageProps }) {
  const [episodesList, setEpisodesList] = useState([] as Podcast[]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  const play = (episode) => {    
    setCurrentEpisodeIndex(episodesList.findIndex(e => e.id === episode.id));
  };

  const changeEpisodesList = (episodes: Podcast[]) => {
    setEpisodesList(episodes);
  }

  const handleNext = (shuffle, repeat) => {
    let index = -1;

    if (repeat) {
      index = currentEpisodeIndex;
    } else if (shuffle){
      index = Math.floor(Math.random() * episodesList.length);
    } else {
      if (currentEpisodeIndex === episodesList.length - 1) index = 0;
      else index = currentEpisodeIndex + 1;
    }

    setCurrentEpisodeIndex(-1);
    setCurrentEpisodeIndex(index);
  }

  const handlePrevious = (shuffle, repeat) => {
    let index = -1;

    if (repeat) {
      index = currentEpisodeIndex;
    } else if (shuffle){
      index = Math.floor(Math.random() * episodesList.length);
    } else {
      if (currentEpisodeIndex === 0) index = episodesList.length-1;
      else index = currentEpisodeIndex - 1;
    }

    setCurrentEpisodeIndex(-1);
    setCurrentEpisodeIndex(index);
  }

  return (
    <GlobalContext.Provider value={{ episodesList, changeEpisodesList, currentEpisodeIndex, play, handleNext, handlePrevious }}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <div className={styles.renderBody}>
            <Component {...pageProps} />
          </div>
        </main>
        <Player />
      </div>
    </GlobalContext.Provider>
    )
}

export default MyApp
