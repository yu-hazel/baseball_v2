import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/baseball_v2/",
  plugins: [
    vue(),
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: '내 꿈은 승리요정',
        short_name: '승리요정',
        description: '야구 찐팬을 위한 야구 기록장',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/baseball_v2/',
        scope: '/baseball_v2/',
        icons: [
          {
            src: '/baseball_v2/icon/baseball_icon_512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/baseball_v2/icon/baseball_icon_256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: '/baseball_v2/icon/baseball_icon_192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/baseball_v2/icon/baseball_icon_144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/baseball_v2/icon/baseball_icon_128.png',
            sizes: '128x128',
            type: 'image/png'
          },
        ]
      }
    })
  ],
  assetsInclude: ['**/*.JPG'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  
})