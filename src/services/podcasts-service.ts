import Podcast from "../types/podcast";
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import axios from 'axios';
import convertDurationToTimeString from '../utils/convertDurationToTimeString';

const api = axios.create({
    baseURL: process.env.API_URL
});

const parseEpisodes = (episodes: []): Podcast[] => {
    return episodes.map((e: any) => {
        return {
            id: e.id,
            title: e.title,
            description: e.description,
            members: e.members,
            thumbnail: e.thumbnail,            
            publishedAt: format(parseISO(e.published_at), 'd MMM yy', { locale: ptBR }),
            url: e.file.url,
            type: e.file.type,
            duration: e.file.duration,
            durationStr: convertDurationToTimeString(+e.file.duration)
        }
    });
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

    const episodes = parseEpisodes(data);

    return episodes;
};