import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import pkgINfo from './package.json'
const version = pkgINfo.version
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version)
  },
  resolve: {
    alias: {
      '@': '/src'
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  }
})
