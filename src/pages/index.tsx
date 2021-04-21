import Link from 'next/link';
import PodcastList from '../components/PodcastList';

export default function Home({ episodes }) {
  return (
    <PodcastList episodes={episodes} />
  )
}

export async function getStaticProps() {
  const response = await fetch( process.env.API_URL + 'episodes');
  const episodes = await response.json();

  return {
    props: {
      episodes
    }
  }  
}
