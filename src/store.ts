import { createContext } from 'react';
import Podcast from './types/podcast';
import { getEpisodes  } from './services/podcasts-service';

type stateType = {
    currentEpisode: Podcast | any;
    setCurrentEpisode(episode: Podcast): void;
    handleShuffle(): Promise<Podcast>;
}

export const state: stateType = {
    currentEpisode: null,
    setCurrentEpisode: (episode: Podcast) => {
        if (episode) state.currentEpisode = {...episode};
    },
    handleShuffle: async (): Promise<Podcast> => {
        const episodes = await getEpisodes();

        if (episodes && episodes.length) {
            const nextEpisode = episodes[ (Math.floor(Math.random() * episodes.length)) ];

            return nextEpisode;
        }

        return null;
    }
};

const store = createContext(state);

export default store;