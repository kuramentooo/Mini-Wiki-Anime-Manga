import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const animeDir = path.join(process.cwd(), 'content/animes');

export function getAllAnimes() {
  if (!fs.existsSync(animeDir)) {
    return [];
  }
  const files = fs.readdirSync(animeDir);
  return files.map(file => {
    const filePath = path.join(animeDir, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return { ...data, slug: file.replace(/\.md$/, '') };
  });
}

export function getAnimeBySlug(slug: string) {
  const filePath = path.join(animeDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  return data;
}
