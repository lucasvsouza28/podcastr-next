import {
    createContext,
    ReactNode,
    useContext,
    useState
} from 'react';
import Podcast from '../types/podcast';

type stateType = {
    episodesList: Podcast[];    
    currentEpisodeIndex: number;
    changeEpisodesList: (episodesList: Podcast[]) => void;
    getCurrentEpisode(): Podcast;

    isPlaying: boolean;
    shuffle: boolean;
    repeat: boolean;

    toogleShuffle: () => void;
    toogleRepeat: () => void;

    changeIsPlaying: (state: boolean) => void;
    tooggleIsPlaying: () => void;

    play: (episode: Podcast) => void;
    handleNext: () => void;
    handlePrevious: () => void;
}

const PlayerContext = createContext({} as stateType);

type PlayerContextProviderProps ={
    children: ReactNode;
};

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodesList, setEpisodesList] = useState([] as Podcast[]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);

    const play = (episode: Podcast) => {    
        setCurrentEpisodeIndex(episodesList.findIndex(e => e.id === episode.id));
        setIsPlaying(true);
    };

    const changeEpisodesList = (episodes: Podcast[]) => {
        setEpisodesList(episodes);
    }

    const getCurrentEpisode = () => {
        if(!episodesList || (!episodesList?.length ?? -1)) return null;

        return  episodesList[currentEpisodeIndex];
    }

    const handleNext = () => {
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

    const handlePrevious = () => {
        let index = -1;

        if (repeat) {
            index = currentEpisodeIndex;
        } else if (shuffle){
            index = Math.floor(Math.random() * episodesList.length);
        } else {
            if (currentEpisodeIndex === 0) index = episodesList.length - 1;
            else index = currentEpisodeIndex - 1;
        }

        setCurrentEpisodeIndex(-1);
        setCurrentEpisodeIndex(index);
    }

    const tooggleIsPlaying = () => {
        setIsPlaying(!isPlaying);
    }

    const changeIsPlaying = (state: boolean) => {
        setIsPlaying(state);
    }

    const toogleShuffle = () => {
        setShuffle(!shuffle);
    }
    const toogleRepeat = () => {
        setRepeat(!repeat);
    }

    return (
        <PlayerContext.Provider value={{
            episodesList,
            currentEpisodeIndex,
            isPlaying,
            shuffle,
            repeat,
            toogleShuffle,
            toogleRepeat,
            getCurrentEpisode,
            changeEpisodesList,
            play,
            changeIsPlaying,
            tooggleIsPlaying,
            handleNext,
            handlePrevious,
        }}>
            {children}
        </PlayerContext.Provider>
    );    
}

export const usePlayer = () => useContext(PlayerContext);

export default PlayerContext;