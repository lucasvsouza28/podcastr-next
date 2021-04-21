import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import Player from '../components/Player';
import Header from '../components/Header';
import GlobalContext, { state } from '../contexts/global';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContext.Provider value={state}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <div className={styles.renderBody}>
            <Component {...pageProps} />
          </div>
        </main>
        <Player episode={state.currentEpisode} />
      </div>
    </GlobalContext.Provider>
    )
}

export default MyApp
