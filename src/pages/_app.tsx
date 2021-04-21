import { createContext } from 'react';
import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import Player from '../components/Player';
import Header from '../components/Header';
import store,{ state } from '../store';

function MyApp({ Component, pageProps }) {
  return (
    <store.Provider value={state}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <div className={styles.renderBody}>
            <Component {...pageProps} />
          </div>
        </main>
        <Player episode={state.currentEpisode} />
      </div>
    </store.Provider>
    )
}

export default MyApp
