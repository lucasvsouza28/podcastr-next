import Image from 'next/image';
import { useState, useRef  } from 'react';
import Podcast from '../../types/podcast';
import styles from './styles.module.scss';
import GlobalContext from '../../contexts/global';
import parseTimeStamp from '../../utils/parseTimestamp';

type PlayerProps = {
    episode: Podcast;
};

export default function Player({ episode }: PlayerProps) {
    const [shuffle, setShuffle] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handlePauseOrPlay = (e) => {
        e.preventDefault();

        if (audioRef?.current)
        {
            if (isPlaying) audioRef.current.pause();
            else audioRef.current.play();
        }
    };
    
    const handleRepeat = (e) => {
        e.preventDefault();
        audioRef.current.load();
        audioRef.current.play();
    };
    
    const handleShuffleClick = (e) => {
        e.preventDefault();
        setShuffle(!shuffle);
    };

    return(
        <GlobalContext.Consumer>
            {({ currentEpisode }) => (                
                <div className={styles.container}>
                    <header>
                        <img  src="/playing.svg" alt="Tocando agora" />
                        <strong>Tocando agora</strong>
                    </header>


                    { episode
                        ? <Image className={styles.thumbnail} src={episode.thumbnail} width={300} height={300} objectFit='cover' />
                        : <div className={styles.emptyPlayer}>
                            <strong>Selecione um podcast para ouvir</strong>
                        </div>
                    }

                    <div className={styles.info}>
                        <h4>{episode?.title}</h4>
                        <span>{episode?.members}</span>
                    </div>                    

                    <footer className={styles.empty} style={{ filter: isPlaying ? 'opacity(1)' : 'opacity(0.5)' }}>
                        <div className={styles.progress}>
                            <span>{parseTimeStamp(currentTime)}</span>                            
                            <div className={styles.slider}>
                                <div className={styles.emptySlider} />
                                {episode && currentTime > 0 &&
                                    <div className={styles.innerSlider} style={{
                                        width: `${(currentTime * 100) / episode.duration}%`
                                    }}>
                                        <span />
                                    </div>
                                }
                            </div>
                            <span>{ episode?.durationStr ?? '00:00' }</span>
                        </div>

                        { episode && 
                            <audio
                                ref={audioRef}
                                id="audio"
                                controls
                                style={{ display: 'none' }}
                                onTimeUpdate={(e) => { setCurrentTime(e.target.currentTime) }}
                                onPlaying={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onSeeked={(e) => setCurrentTime(e.target.currentTime)}>
                                <source src={currentEpisode.url} type={currentEpisode.type} />
                            </audio>
                        }

                        <div
                            className={styles.buttons}>
                            <button type="button" onClick={handleShuffleClick}>
                                { shuffle && <span />}
                                <img src="/shuffle.svg" alt="Embaralhar" />                        
                            </button>
                            
                            <button type="button">
                                <img src="/play-previous.svg" alt="Tocar anterior" />
                            </button>

                            <button
                                type="button"
                                className={styles.playButton}
                                style={{
                                    background: isPlaying ? 'var(--purple-800)' : 'var(--purple-400)'
                                }}
                                onClick={handlePauseOrPlay}>
                                {!isPlaying ? <img src="/play.svg" alt="Tocar" /> : <img src="/pause.svg" alt="Tocar" /> }
                            </button>

                            <button type="button">
                                <img src="/play-next.svg" alt="Tocar próximo" />
                            </button>
                                                
                            <button type="button" onClick={handleRepeat}>
                                <img src="/repeat.svg" alt="Repetir" />
                            </button>
                        </div>
                    </footer>
                </div>
            )}

        </GlobalContext.Consumer>
    );
}