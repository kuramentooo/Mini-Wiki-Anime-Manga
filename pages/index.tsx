import { GetStaticProps } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Anime {
  title: string;
  image: string;
  synopsis: string;
  genres: string[];
  annee: number;
  studio: string;
  episodes: string;
  statut: string;
  note?: number;
  mal_link: string;
}

interface HomeProps {
  animes: Anime[];
}

const Home: React.FC<HomeProps> = ({ animes }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">Mini Wiki Anime/Manga</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {animes.map((anime) => (
          <div key={anime.title} className="border p-4 rounded-lg">
            <img src={anime.image} alt={anime.title} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-2xl font-bold mb-2">{anime.title}</h2>
            <p className="mb-2">{anime.synopsis}</p>
            <Link href={`/anime/${anime.title}`}>
              <a className="text-blue-500">Voir plus</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join('fiches'));
  const animes = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('fiches', filename), 'utf-8');
    const { data } = matter(markdownWithMeta);
    return data as Anime;
  });

  return {
    props: {
      animes,
    },
  };
};

export default Home;
