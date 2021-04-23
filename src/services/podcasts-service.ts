import Podcast from "../types/podcast";
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import axios from 'axios';
import convertDurationToTimeString from '../utils/convertDurationToTimeString';

const api = axios.create({
    baseURL: process.env.API_URL
});

const parseEpisode = (episode): Podcast => {
    
    return {
        id: episode.id,
        title: episode.title,
        description: episode.description,
        members: episode.members,
        thumbnail: episode.thumbnail,            
        publishedAt: format(parseISO(episode.published_at), 'dd MMM yy', { locale: ptBR }),
        url: episode.file.url,
        type: episode.file.type,
        duration: episode.file.duration,
        durationStr: convertDurationToTimeString(+episode.file.duration)
    }
};

export const getEpisodes = async (): Promise<Podcast[]> => {
    const response = await api.get('episodes', {
        params: {
            _limit: '12',
            _sort: 'published_at',
            _order: 'desc',
        }
    });

    const { data } = response;

    const episodes = data.map(parseEpisode);

    return episodes;
};

export const getEpisodeById = async (id: string) => {
    const response = await api.get(`episodes/${id}`);

    const { data } = response;

    const episode = parseEpisode(data);

    return episode;
}