import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.tsx?$/, // This ensures that .tsx files in the src directory are processed
    exclude: [], // You can specify files or folders here to exclude from processing if needed
  },
});
