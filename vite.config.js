import { defineConfig, loadEnv } from "vite";

export default defineConfig(({_, mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    build: {
      outDir: 'dist/' + env.VITE_DIFF
    },
  }
})