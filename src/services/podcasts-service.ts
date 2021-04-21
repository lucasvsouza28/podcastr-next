import Podcast from "../types/podcast";

export const getEpisodes = async (): Promise<Podcast[]> => {
    const response = await fetch(process.env.API_URL + 'episodes');
    const episodes = await response.json() as Podcast[];

    return episodes;
};

export const getEpisodeById = async (id: number): Promise<Podcast> => {
    const response = await fetch(process.env.API_URL + 'episodes');
    const episodes = await response.json() as Podcast[];
    const episode = episodes.find(e => e.id === episode);

    return episode;
};