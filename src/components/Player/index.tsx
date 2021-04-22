import Image from 'next/image';
import { useState, useRef, useContext  } from 'react';
import PlayerContext from '../../contexts/PlayerContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import convertDurationToTimeString from '../../utils/convertDurationToTimeString';

import styles from './styles.module.scss';

export default function Player({  }) {
    const {
        episodesList,
        currentEpisodeIndex,
        handleNext,
        handlePrevious
    } = useContext(PlayerContext);
    const currentEpisode = currentEpisodeIndex > -1 ? episodesList[currentEpisodeIndex] : null;

    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePauseOrPlay = (e) => {
        e.preventDefault();

        if (audioRef?.current)
        {
            if (isPlaying) audioRef.current.pause();
            else audioRef.current.play();
        }
    };
        
    const toogleShuffle = (e) => {
        e.preventDefault();
        setShuffle(!shuffle);
    };

    const toogleRepeat = (e) => {
        e.preventDefault();
        setRepeat(!repeat);
    };

    const handleSeek = (e) => {
        if (audioRef.current){
            audioRef.current.currentTime = e;
        }
    };

    return(                
        <div className={styles.container}>
            <header>
                <img  src="/playing.svg" alt="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>


            { currentEpisode
                ? (
                    <div className={styles.currentEpisode}>
                        <Image src={currentEpisode.thumbnail} width={592} height={592} objectFit='cover' />
                        <strong>{currentEpisode.title}</strong>
                        <span>{currentEpisode.members}</span>
                    </div>
                )
                : <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            }

            <footer className={!currentEpisode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(currentTime)}</span>                            
                    <div className={styles.slider}>
                        { currentEpisode ? (
                            <Slider
                                max={currentEpisode.duration}
                                value={currentTime}
                                trackStyle={{ backgroundColor: '#04D361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderWidth: 4, borderColor: '#04D361' }} onChange={e => handleSeek(e)} />
                        ) : (
                            <div className={styles.emptySlider} />
                        )
                        }
                    </div>
                    <span>{ currentEpisode?.durationStr != '0' ? currentEpisode?.durationStr : '00:00'  ?? '00:00' }</span>
                </div>

                { currentEpisode && 
                    <audio
                        ref={audioRef}
                        src={currentEpisode.url}
                        autoPlay
                        style={{ display: 'none' }}
                        onTimeUpdate={(e: any) => { setCurrentTime(e.target.currentTime) }}
                        onPlaying={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}                        
                        onSeeked={(e) => { setCurrentTime(e.timeStamp); }}
                        onChange={(e: any) => e.target.load()}
                        onEnded={(e: any) => { handleNext(shuffle, repeat); e.target.load() }}
                        />
                }

                <div
                    className={styles.buttons}>
                    <button type="button" onClick={toogleShuffle} disabled={!currentEpisode}>
                        { shuffle && <span />}
                        <img src="/shuffle.svg" alt="Embaralhar" />                        
                    </button>
                    
                    <button type="button" disabled={!currentEpisode} onClick={() => handlePrevious(shuffle, repeat)}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>

                    <button
                        type="button"
                        disabled={!currentEpisode}
                        className={styles.playButton}
                        style={{
                            background: isPlaying ? 'var(--purple-800)' : 'var(--purple-400)'
                        }}
                        onClick={handlePauseOrPlay}>
                        {!isPlaying ? <img src="/play.svg" alt="Tocar" /> : <img src="/pause.svg" alt="Tocar" /> }
                    </button>

                    <button type="button" disabled={!currentEpisode} onClick={() => handleNext(shuffle, repeat)}>
                        <img src="/play-next.svg" alt="Tocar próximo" />
                    </button>
                                        
                    <button type="button"  disabled={!currentEpisode} onClick={toogleRepeat}>
                        { repeat && <span />}
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    );
}