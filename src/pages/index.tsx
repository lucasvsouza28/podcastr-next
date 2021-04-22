import PodcastList from '../components/PodcastList';
import {
  getEpisodes
} from '../services/podcasts-service'

export default function Home({ episodes, latest }) {  
  return (
    <PodcastList episodes={episodes} latest={latest} />
  )
}

export async function getStaticProps() {
  const episodes = await getEpisodes();

  return {
    props: {
      episodes: episodes.slice(2, episodes.length),
      latest: episodes.slice(0, 2)
    }
  }  
}
