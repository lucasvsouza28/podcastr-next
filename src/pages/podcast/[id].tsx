import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import Podcast from '../../types/podcast';
import {
    getEpisodes
} from '../../services/podcasts-service';
import store from '../../store';

type PodcastProps = {
    previousEpisode: Podcast;
    episode: Podcast;
    nextEpisode: Podcast;
}

export default function PodcastRoute({ episode, previousEpisode, nextEpisode }: PodcastProps){
    const router = useRouter();

    const handleNavigate = (e: any, episode: Podcast, setCurrentEpisode: any) => {
        e.preventDefault();
    
        setCurrentEpisode(episode);
        router.push(`/podcast/${episode.id}`);        
    }

    const renderArrow = (episode: Podcast, style: any) => {
        if (episode) {
            return (
                <store.Consumer>
                    {({ setCurrentEpisode })=> (
                        <div
                            className={style}
                            onClick={e => handleNavigate(e, episode, setCurrentEpisode)}>
                            <img  src="/arrow-left.svg" />
                        </div>
                    )}
                </store.Consumer>
            );
        }
            
        return null;    
    }
    
    return (
        <div className={styles.container}>            
            { renderArrow(previousEpisode, styles.arrowLeft) }
            { renderArrow(nextEpisode, styles.arrowRight) }

            <h1>{episode.title}</h1>

            <p dangerouslySetInnerHTML={{ __html: episode.description }}></p>
        </div>
        
    );    
}

export async function getStaticProps(context) {
    const { id } = context.params;
    let episode: Podcast | null = null;
    let previousEpisode: Podcast | null = null;
    let nextEpisode: Podcast | null = null;


    if (id) {
        const episodes = await getEpisodes();
        
        const episodeIndex = episodes.findIndex(e => e.id === id);
        episode = episodes[episodeIndex];

        if (episodeIndex > 0) previousEpisode = episodes[episodeIndex - 1];
        if (episodeIndex >= 0 && episodeIndex < episodes.length - 1) nextEpisode = episodes[episodeIndex + 1];
    }

    return {
        props: {
            episode,
            previousEpisode,
            nextEpisode
        }
    }
}

export async function getStaticPaths({  }) {
    const episodes = await getEpisodes();

    return {
        paths: episodes.map(e => {
            return {
                params: {
                id: e.id
                }
            }
        }),
        fallback: false
    };
}
