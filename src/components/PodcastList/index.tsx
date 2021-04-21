import Link from 'next/link';
import Image from 'next/image';
import Podcast from "../../types/podcast";
import styles from './styles.module.scss';
import GlobalContext from '../../contexts/global';
import { useRouter } from 'next/router';

type PodcastListProps = {
    episodes: Podcast[];    
    latest: Podcast[];
};

export default function PodcastList ({ episodes, latest }: PodcastListProps ) {
    const router = useRouter();

    const handleClick = (e: any, episode: Podcast, setCurrentEpisode: any) => {
        e.preventDefault();
        
        setCurrentEpisode(episode);
        router.push(`/podcast/${episode.id}`);
    }

    return (    
        <GlobalContext.Consumer>
            {({ setCurrentEpisode }) => (
                <div className={styles.podcastlistContainer}>
                     
                    <section className={styles.latestEpisodes}>
                        <h2>Últimos lançamentos</h2>

                        <ul>
                            { latest.map((episode) => {
                                return (
                                    <li key={episode.id}>
                                        <Image
                                            src={episode.thumbnail}
                                            alt={episode.title}
                                            height={192}
                                            width={192}
                                            objectFit="cover" />
                                        <div className={styles.detail}>
                                            <a onClick={e => handleClick(e, episode, setCurrentEpisode)}>{episode.title}</a>
                                            <p>{episode.members}</p>
                                            <span>{episode.publishedAt}</span>
                                            <span>{episode.durationStr}</span>
                                        </div>                                        
                                        <button type="button" onClick={e => handleClick(e, episode, setCurrentEpisode) }>
                                            <img src="/play-green.svg" alt="Tocar episódio" />
                                        </button>                                        
                                    </li>
                                )}
                            )}
                        </ul>
                    </section>

                    <section className={styles.allEpisodes}>
                        <h2>Todos os episódios</h2>

                        <table cellSpacing={0} cellPadding={0}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Título</th>
                                    <th>Integrantes</th>
                                    <th>Data</th>
                                    <th>Duração</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { episodes.map(episode =>  (
                                    <tr
                                        key={episode.id}
                                        className={styles.item}
                                        onClick={
                                            (e) => {handleClick(e, episode, setCurrentEpisode)}
                                    }>
                                        <td style={{ width: 72 }}>
                                            <Image src={episode.thumbnail} height={120} width={120} alt={episode.title} objectFit="cover" />
                                        </td>
                                        <td>
                                            <Link href={`/podcast/${episode.id}`}>{episode.title}</Link>
                                        </td>
                                        <td>{episode.members}</td>
                                        <td style={{ width: 100 }}>{episode.publishedAt}</td>
                                        <td>{episode.durationStr}</td>
                                        <td>
                                            <button type="button">
                                                <img src="/play-green.svg" alt="Tocar episódio" />
                                            </button>
                                        </td>
                                    </tr>
                            )) }
                            </tbody>
                        </table>
                    </section>
                </div>
            )}
        </GlobalContext.Consumer>
    );
}