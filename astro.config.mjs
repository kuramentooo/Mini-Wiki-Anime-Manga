import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    outDir: 'dist' // Assurez-vous que le répertoire de sortie est 'dist'
  },
});