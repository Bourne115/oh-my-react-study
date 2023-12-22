import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { vitePluginForArco } from '@arco-plugins/vite-react'

import pkgINfo from './package.json'
const version = pkgINfo.version

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginForArco()],
  define: {
    __APP_VERSION__: JSON.stringify(version)
  },
  resolve: {
    alias: {
      '@': '/src'
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  server: {
    port: 3000,
    proxy: {
      '^/gateway': {
        target: 'https://testobworkwx.hnlshm.com/',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', function (proxyReq) {
            proxyReq.setHeader('Origin', 'http://localhost')
            proxyReq.setHeader('Referer', 'http://localhost')
            // console.log('getHeaders', proxyReq.getHeaders())
            // proxyReq.pipe(req)
          })
        }
      }
    },
  }
})
