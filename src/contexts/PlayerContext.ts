import { createContext } from 'react';
import Podcast from '../types/podcast';

type stateType = {
    episodesList: Podcast[];
    changeEpisodesList: (episodesList: Podcast[]) => void;

    currentEpisodeIndex: number;

    play: (episode: Podcast) => void;
    handleNext: (shuffle: boolean, repeat: boolean) => void;
    handlePrevious: (shuffle: boolean, repeat: boolean) => void;
}

const PlayerContext = createContext({} as stateType);

export default PlayerContext;