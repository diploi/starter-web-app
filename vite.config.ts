import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  optimizeDeps: {
    // These make the initial load in a dev deployment smoother. They can be safely removed.
    noDiscovery: true,
    include: undefined,
  },
});
