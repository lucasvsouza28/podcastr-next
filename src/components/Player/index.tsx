import {
    useState,
    useRef,
    useEffect,
} from 'react';
import Image from 'next/image';
import { usePlayer } from '../../contexts/PlayerContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import convertDurationToTimeString from '../../utils/convertDurationToTimeString';

//import styles from './styles.module.scss';
import styles from './custom-style.module.scss';

export default function Player({  }) {
    const {
        isPlaying,
        shuffle,
        repeat,
        toogleShuffle,
        toogleRepeat,
        getCurrentEpisode,
        handleNext,
        handlePrevious,
        changeIsPlaying,
        tooggleIsPlaying,
    } = usePlayer();

    const currentEpisode = getCurrentEpisode();

    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handleSeek = (amount) => {
        if (audioRef.current){
            audioRef.current.currentTime = amount;
            setCurrentTime(amount);
        }
    };

    return(                
        <div className={styles.container}>
            <header>
                <img
                  src="/playing.svg"
                  alt="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>


            { currentEpisode
                ? (
                    <div className={styles.currentEpisode}>
                        <Image
                            src={currentEpisode.thumbnail}
                            width={592}
                            height={592}
                            objectFit='cover' />
                        <div className={styles.descriptions}>
                            <strong>{currentEpisode.title}</strong>
                            <span>{currentEpisode.members}</span>
                        </div>
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
                                handleStyle={{ borderWidth: 4, borderColor: '#04D361' }}
                                onChange={e => handleSeek(e)} />
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
                        loop={repeat}
                        style={{ display: 'none' }}
                        onLoadedMetadata={() => audioRef.current!.currentTime = 0}
                        onTimeUpdate={(e: any) => { setCurrentTime(Math.floor(e.target.currentTime)) }}
                        onPlaying={() => changeIsPlaying(true)}
                        onPause={() => changeIsPlaying(false)}                        
                        onChange={(e: any) => e.target.load()}
                        onEnded={(e: any) => { handleNext(); e.target.load(); }}
                        />
                }

                <div
                    className={styles.buttons}>
                    <button
                      type="button"
                      onClick={toogleShuffle}
                      disabled={!currentEpisode}>
                        { shuffle && <span /> }
                        <img src="/shuffle.svg" alt="Embaralhar" />                        
                    </button>
                    
                    <button
                      type="button"
                      disabled={!currentEpisode}
                      onClick={handlePrevious}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>

                    <button
                        type="button"
                        disabled={!currentEpisode}
                        className={styles.playButton}
                        style={{
                            background: isPlaying ? 'var(--purple-800)' : 'var(--purple-400)'
                        }}
                        onClick={tooggleIsPlaying}>
                        {!isPlaying ? <img src="/play.svg" alt="Tocar" /> : <img src="/pause.svg" alt="Tocar" /> }
                    </button>

                    <button
                      type="button"
                      disabled={!currentEpisode}
                      onClick={handleNext}>
                        <img src="/play-next.svg" alt="Tocar próximo" />
                    </button>
                                        
                    <button
                      type="button"
                      disabled={!currentEpisode}
                      onClick={toogleRepeat}>
                        { repeat && <span /> }
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    );
}