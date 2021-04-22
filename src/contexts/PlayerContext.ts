import { createContext } from 'react';
import Podcast from '../types/podcast';

type stateType = {
    episodesList: Podcast[];    
    currentEpisodeIndex: number;
    changeEpisodesList: (episodesList: Podcast[]) => void;
    getCurrentEpisode(): Podcast;

    isPlaying: boolean;
    changeIsPlaying: (state: boolean) => void;
    tooggleIsPlaying: () => void;

    play: (episode: Podcast) => void;
    handleNext: (shuffle: boolean, repeat: boolean) => void;
    handlePrevious: (shuffle: boolean, repeat: boolean) => void;
}

const PlayerContext = createContext({} as stateType);

export default PlayerContext;