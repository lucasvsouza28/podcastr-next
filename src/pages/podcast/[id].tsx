import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    GetStaticProps,
    GetStaticPaths,
} from 'next';
import Podcast from '../../types/podcast';
import PlayerContext from '../../contexts/PlayerContext';
import {
    getEpisodes
} from '../../services/podcasts-service';
import styles from './styles.module.scss';

type PodcastProps = {
    episode: Podcast;
}

export default function PodcastRoute({ episode }: PodcastProps){
    const {
        play,
        isPlaying,
        episodesList,
        changeEpisodesList,
        changeIsPlaying,
        getCurrentEpisode
    } = useContext(PlayerContext);

    if (!episodesList.length){
        changeEpisodesList([episode]);
    }

    const currentEpisode = getCurrentEpisode();

    const handlePlayOrPause = () => {
        if (!isPlaying) {
            play(episode);
        } else {
            changeIsPlaying(false);
        }
    }
    
    return (
        <div className={styles.container}>

            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        <img src='/arrow-left.svg' alt="Voltar" />
                    </button>
                </Link>

                <Image className={styles.headerImage} src={episode.thumbnail} width={700} height={160} objectFit="cover" />

                <button type="button" onClick={handlePlayOrPause}>
                    { isPlaying && currentEpisode?.id === episode.id ? <img src="/pause.svg" /> : <img src="/play.svg" /> }
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationStr}</span>
            </header>

            <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
        </div>
        
    );    
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params;
    let episode: Podcast | null = null;


    if (id) {
        const episodes = await getEpisodes();        
        episode = episodes.find(e => e.id === id);
    }

    return {
        props: {
            episode,
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const episodes = await getEpisodes();

    return {        
        paths: episodes.map(e => {
            return {
                params: {
                id: e.id
                }
            }
        }),
        fallback: 'blocking'
    };
}
