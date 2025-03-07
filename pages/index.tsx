import { GetStaticProps } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { useState } from 'react';

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
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  const handleAnimeClick = (anime: Anime) => {
    setSelectedAnime(anime);
  };

  const handleCloseModal = () => {
    setSelectedAnime(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white p-4 shadow-md">
        <h1 className="text-4xl font-bold text-center">Mini Wiki Anime/Manga</h1>
      </header>
      <main className="flex-grow p-8 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {animes.map((anime) => (
            <div
              key={anime.title}
              className="border p-4 rounded-lg cursor-pointer bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleAnimeClick(anime)}
            >
              <img src={anime.image} alt={anime.title} className="w-full h-48 object-cover mb-4 rounded" />
              <h2 className="text-2xl font-bold mb-2">{anime.title}</h2>
              <p className="mb-2 text-gray-700">{anime.synopsis}</p>
            </div>
          ))}
        </div>

        {selectedAnime && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-lg">
              <button className="mb-4 text-red-500" onClick={handleCloseModal}>
                Fermer
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedAnime.title}</h2>
              <img src={selectedAnime.image} alt={selectedAnime.title} className="w-full h-48 object-cover mb-4 rounded" />
              <p className="mb-4">{selectedAnime.synopsis}</p>
              <p><strong>Genres:</strong> {selectedAnime.genres.join(', ')}</p>
              <p><strong>Studio:</strong> {selectedAnime.studio}</p>
              <p><strong>Année de sortie:</strong> {selectedAnime.annee}</p>
              <p><strong>Nombre d’épisodes:</strong> {selectedAnime.episodes}</p>
              <p><strong>Statut:</strong> {selectedAnime.statut}</p>
              {selectedAnime.note && <p><strong>Note:</strong> ⭐ {selectedAnime.note}</p>}
              <a href={selectedAnime.mal_link} className="text-primary" target="_blank" rel="noopener noreferrer">
                Voir sur MyAnimeList
              </a>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-primary text-white p-4 text-center shadow-md">
        <p>© 2023 Mini Wiki Anime/Manga</p>
        <p>
          <a href="https://github.com/kuramentooo" className="text-white underline" target="_blank" rel="noopener noreferrer">
            GitHub: kuramentooo
          </a>
        </p>
      </footer>
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
