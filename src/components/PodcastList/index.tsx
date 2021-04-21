import Link from 'next/link';
import Podcast from "../../types/podcast";
import styles from './styles.module.scss';
import store from '../../store';
import { useRouter } from 'next/router';

type PodcastListProps = {
    episodes: Podcast[];    
};

const handleClick = (e: any, episode: Podcast, router: any, setCurrentEpisode: any) => {
    e.preventDefault();
    
    setCurrentEpisode(episode);
    router.push(`/podcast/${episode.id}`);
}

export default function PodcastList ({ episodes }: PodcastListProps ) {
    const router = useRouter();

    return (    
        <store.Consumer>
            {({ setCurrentEpisode }) => (
                <div className={styles.container}>
                     {
                        episodes.map(episode =>  (
                            <div
                                key={episode.id}
                                className={styles.item}
                                style={{ backgroundImage: `url('${episode.thumbnail}'` }}
                                onClick={
                                    (e) => {handleClick(e, episode, router, setCurrentEpisode)}
                                } ></div>
                        ))
                     }
                </div>
            )}
        </store.Consumer>
    );
}