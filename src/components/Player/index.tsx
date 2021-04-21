import { useState, useRef } from 'react';
import Podcast from '../../types/podcast';
import styles from './styles.module.scss';
import store from '../../store';

type PlayerProp = {
    episode: Podcast;
};



export default function Player({ episode }) {
    const [shuffle, setShuffle] = useState(false);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [currentTimeInt, setCurrentTimeInt] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handlePauseOrPlay = (e) => {
        e.preventDefault();
        
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();
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
    
    const parseTimeStamp = (txt) => {
        if (!txt) return txt;
    
        const sec_num = parseInt(txt, 10);
        const hours   = Math.floor(sec_num / 3600);
        const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        const seconds = sec_num - (hours * 3600) - (minutes * 60);
        
        function padleft(txt) {
            return txt < 10 ? `0${txt}` : txt;
        }
    
        return padleft(hours) + ':' + padleft(minutes) + ':' + padleft(seconds);
    };

    return(
        <store.Consumer>
            {({  }) => (
                <div className={styles.container}>
                    <header>
                        <img  src="/playing.svg" alt="Tocando agora" />
                        <strong>Tocando agora</strong>
                    </header>

                    <div
                        className={styles.emptyPlayer}
                        style={{
                            backgroundImage: episode ? `url('${episode.thumbnail}')` : null,
                            backgroundSize: 'cover',
                            backgroundClip: 'padding-box'
                        }}>
                        { episode ? <strong>{episode.title}</strong> : <strong>Selecione um podcast para ouvir</strong> }                
                    </div>

                    <footer className={styles.empty}>
                        <div className={styles.progress}>
                            <span>{parseTimeStamp(currentTime)}</span>                            
                            <div className={styles.slider}>
                                <div className={styles.emptySlider} />
                                {episode && currentTimeInt > 0 &&
                                    <div className={styles.innerSlider} style={{
                                        width: (episode.file.duration / currentTimeInt) + '%'
                                    }}>
                                        <span style={{
                                            left: (episode.file.duration / currentTimeInt) + '%'
                                        }} />
                                    </div>
                                }
                            </div>
                            <span>{ parseTimeStamp(episode?.file.duration) ?? '00:00' }</span>
                        </div>

                        { episode && 
                            <audio
                                ref={audioRef}
                                id="audio"
                                controls
                                style={{ display: 'none' }}
                                onTimeUpdate={(e) => {
                                    setCurrentTimeInt(e.timeStamp)
                                    setCurrentTime(e.timeStamp.toLocaleString())                                    
                                }}
                                onPlaying={(e) => setIsPlaying(true)}
                                onPause={(e) => setIsPlaying(false)}>
                                <source src={episode.file.url} type={episode.file.type} />
                            </audio>
                        }

                        <div className={styles.buttons}>
                            <button type="button" onClick={handleShuffleClick}>
                                { shuffle && <span />}
                                <img src="/shuffle.svg" alt="Embaralhar" />                        
                            </button>
                            
                            <button type="button">
                                <img src="/play-previous.svg" alt="Tocar anterior" />
                            </button>

                            <button type="button" className={styles.playButton} onClick={handlePauseOrPlay}>
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

        </store.Consumer>
    );
}